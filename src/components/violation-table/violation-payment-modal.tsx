"use client";

import { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Receipt from "./violation-receipt";
import type { ViolationRecord } from "@/lib/types";

interface ViolationPaymentModalProps {
  violation: ViolationRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateViolation: (id: string, updates: Partial<ViolationRecord>) => void;
}

const ViolationPaymentModal = ({
  violation,
  isOpen,
  onClose,
  onUpdateViolation,
}: ViolationPaymentModalProps) => {
  const [amount, setAmount] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [paidAmount, setPaidAmount] = useState(0);
  const [referenceNo, setReferenceNo] = useState(`REF-${Date.now()}`);
  const receiptRef = useRef<HTMLDivElement>(null);  

  useEffect(() => {
    if (isOpen) {
      setAmount("");
      setShowConfirmation(false);
      setShowReceipt(false);
      setPaidAmount(0);
      setReferenceNo(`referenceNo`);
    }
  }, [isOpen, violation]);
  const handleSubmit = () => {
    if (!violation || !amount) return;
    
    const paymentAmount = parseFloat(amount);
    if (isNaN(paymentAmount) || paymentAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    const currentPenalty = violation.violation?.penalty || 0;

    if (paymentAmount > currentPenalty) {
      alert("Payment cannot exceed the penalty amount.");
      return;
    }

    const remainingBalance = currentPenalty - paymentAmount;
    const newStatus = remainingBalance === 0 ? "Resolved" : "Pending";

    onUpdateViolation(violation.id, {
      status: newStatus,
      violation: {
        ...violation.violation,
        id: violation.violation?.id || "",
        penalty: remainingBalance,
        category: violation.violation?.category || "",
        violationName: violation.violation?.violationName || "",
      },
    });

    setPaidAmount(paymentAmount);
    setShowConfirmation(true);
  };

  const handlePrintReceipt = () => {
    if (receiptRef.current) {
      html2canvas(receiptRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = canvas.width * 0.75;  // Adjust width (e.g., 75% of the original)
        const imgHeight = canvas.height * 0.75;  // Adjust height (e.g., 75% of the original)
      
        const doc = new jsPDF();
        doc.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);  // Add image with specified width and height
        doc.autoPrint();  
        doc.output("dataurlnewwindow");  
      });
    }
  };

  if (!violation) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {showReceipt ? "Payment Receipt" : showConfirmation ? "Payment Added" : "Add Payment"}
          </DialogTitle>
        </DialogHeader>

        {showReceipt ? (
          <>
          <div ref={receiptRef}> 
              <Receipt
                violation={violation}
                paidAmount={paidAmount}
                referenceNo={referenceNo}
              />
          </div>
          <DialogFooter className="sm:justify-center gap-2 mt-4">
            <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto">
              Close
            </Button>
              <Button type="button" onClick={handlePrintReceipt} className="w-full sm:w-auto">
              Print Receipt
            </Button>
          </DialogFooter>
          </>
        ) : showConfirmation ? (
          <>
            <div className="space-y-3 text-sm text-center">
              <p>Payment for {violation.user?.firstName} {violation.user?.lastName}</p>
              <p>Violation ID: {violation.violation?.id}</p>
              <p>{violation.violation?.category}</p>
              <p>{new Date().toLocaleString()}</p>
            </div>

            <div className="text-sm space-y-3">
              <div className="bg-green-200 text-green-800 p-2 rounded-md text-center">
                <strong>Amount Added:</strong> PHP {paidAmount.toLocaleString()}
              </div>
              <div className="bg-red-200 text-red-800 p-2 rounded-md text-center">
                <strong>Remaining Balance:</strong> PHP {violation.violation?.penalty.toLocaleString()}
              </div>
            </div>

            <DialogFooter className="sm:justify-center gap-2 mt-4">
              <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto">
                Close
              </Button>
              <Button type="button" onClick={() => setShowReceipt(true)} className="w-full sm:w-auto">
                Get Receipt
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <div className="space-y-3 text-sm">
              <p>Payment for: {violation.user?.firstName} {violation.user?.lastName}</p>
              <p>Violation ID: {violation.violation?.id}</p>
              <p>Violation Category: {violation.violation?.category}</p>
              <p>Balance: PHP {violation.violation?.penalty.toLocaleString()}</p>
            </div>

            <div className="space-y-2">
              <label className="font-medium">Input amount</label>
              <Input
                type="number"
                placeholder="PHP 0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <DialogFooter className="sm:justify-center gap-2 mt-4">
              <Button type="button" onClick={handleSubmit} disabled={!amount} className="w-full sm:w-auto">
                Confirm Payment
              </Button>
            </DialogFooter>
          </>
        ) }
      </DialogContent>
    </Dialog>
  );
};

export default ViolationPaymentModal;
