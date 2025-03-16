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
import { format } from "date-fns";
import { Loader } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
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
  const [isPaymentEqualAmount, setIsPaymentEqualAmount] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);
  const violationPenalty = violation?.violation?.penalty || 0;

  useEffect(() => {
    if (isOpen) {
      setAmount(0);
      setShowConfirmation(false);
      setShowReceipt(false);
    }
  }, [isOpen]);

  useEffect(() => {
    setIsPaymentEqualAmount(violationPenalty === amount);
  }, [amount, violationPenalty]);

  const submitPayment = async () => {
    if (!violation || !amount) return;

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

      onUpdateViolation(violation.id, {
        status: "PAID",
        violation: violation.violation,
        payment: response.data
      });

      setPayment(response.data);
      setShowReceipt(true);
    } catch (err) {
      const axiosError = err as AxiosError;
      const { message } = axiosError.response?.data as { message?: string };

      toast.error(
        `${axiosError.status}: ${message || "Failed to process payment. Please try again later."}`
      );
    } finally {
      setProcessing(false);
    }
  };

  if (!violation) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" aria-describedby={undefined}>
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
        ) : isProcessing ? (
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
                <span>{format(new Date(violation.date), "MMMM dd, yyyy hh:mm a")}</span>
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
              <Button
                type="button"
                onClick={submitPayment}
                disabled={!isPaymentEqualAmount}
                className="w-full"
              >
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
