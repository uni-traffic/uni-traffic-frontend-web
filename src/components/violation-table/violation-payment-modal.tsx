"use client";

import api from "@/api/axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { ViolationRecord, ViolationRecordPayment } from "@/lib/types";
import type { AxiosError } from "axios";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Loader } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Receipt } from "./violation-receipt";

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
  onUpdateViolation
}: ViolationPaymentModalProps) => {
  const [amount, setAmount] = useState<number>(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [payment, setPayment] = useState<ViolationRecordPayment | null>(null);
  const [isProcessing, setProcessing] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setAmount(0);
      setShowConfirmation(false);
      setShowReceipt(false);
    }
  }, [isOpen]);

  const submitPayment = async () => {
    console.log(violation?.id);
    console.log(amount);
    if (!violation || !amount) return;

    const violationPenalty = violation?.violation?.penalty || 0;
    const paymentAmount = amount;
    if (Number.isNaN(paymentAmount) || paymentAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    setProcessing(true);

    try {
      const response = await api.post("/payment/violation", {
        violationRecordId: violation!.id,
        amountPaid: amount
      });
      if (response.status !== 200) return;

      console.log(response.data);

      onUpdateViolation(violation.id, {
        status: "PAID",
        violation: violation.violation,
        payment: response.data
      });

      setPayment(response.data);
      setShowReceipt(true);
    } catch (err) {
      const error = err as AxiosError;

      console.log(error);
    } finally {
      setProcessing(false);
    }
  };

  const handlePrintReceipt = () => {
    if (receiptRef.current) {
      html2canvas(receiptRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = canvas.width * 0.75; // Adjust width (e.g., 75% of the original)
        const imgHeight = canvas.height * 0.75; // Adjust height (e.g., 75% of the original)

        const doc = new jsPDF();
        doc.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight); // Add image with specified width and height
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
            {showReceipt ? "Payment Receipt" : showConfirmation ? "" : "Add Payment"}
          </DialogTitle>
        </DialogHeader>

        {showReceipt ? (
          <>
            <div ref={receiptRef}>
              <Receipt violation={{ ...violation, status: "PAID", payment: payment }} />
            </div>
          </>
        ) : showConfirmation ? (
          <>
            <div className="flex flex-col space-y-3 justify-center items-center w-full h-[15rem]">
              <strong className="text-md">Processing Payment</strong>
              <Loader className="h-1/8 w-1/8 animate-spin duration-1000 text-theme" />
            </div>
          </>
        ) : (
          <>
            <div className="text-sm space-y-4 mt-4">
              <div className="flex justify-between">
                <strong>Violation ID:</strong>
                <strong>{violation?.id}</strong>
              </div>
              <div className="flex justify-between">
                <strong>Date/Time:</strong>
                <span>{new Date().toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <strong>Amount Due:</strong>
                <span>PHP {violation?.violation?.penalty.toFixed(2)}</span>
              </div>
              <div className="">
                <strong>Cash Tendered:</strong>
              </div>
            </div>

            <Input
              type="number"
              placeholder="PHP 0.00"
              onChange={(e) => setAmount(Number(e.target.value))}
            />

            <DialogFooter className="sm:justify-center gap-2 mt-4">
              <Button type="button" onClick={submitPayment} disabled={!amount} className="w-full">
                Confirm Payment
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViolationPaymentModal;
