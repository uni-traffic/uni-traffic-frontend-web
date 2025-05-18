"use client";
import { ViolationRecordReceipt } from "@/components/common/ViolationRecordReceipt";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { usePayViolationRecord } from "@/hooks/violationRecord/usePayViolationRecord";
import type { ViolationRecord, ViolationRecordPayment } from "@/lib/types";
import { useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface ViolationPaymentModalProps {
  violation: ViolationRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ViolationRecordPaymentModal = ({
  violation,
  isOpen,
  onClose
}: ViolationPaymentModalProps) => {
  const queryClient = useQueryClient();
  const [amount, setAmount] = useState<number>(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [payment, setPayment] = useState<ViolationRecordPayment | null>(null);
  const receiptRef = useRef<HTMLDivElement>(null);
  const violationPenalty = violation?.violation?.penalty || 0;

  const { mutate: payViolationRecord, isPending: isProcessing } = usePayViolationRecord();

  useEffect(() => {
    if (isOpen) {
      setAmount(0);
      setShowConfirmation(false);
      setShowReceipt(false);
    }
  }, [isOpen]);

  const submitPayment = async () => {
    if (!violation || !amount) return;

    const paymentAmount = amount;
    if (Number.isNaN(paymentAmount) || paymentAmount < violationPenalty) {
      alert("Please enter a valid amount.");
      return;
    }

    payViolationRecord(
      {
        violationRecordId: violation.id,
        cashTendered: amount
      },
      {
        onSuccess: (data) => {
          const queryKeys = [
            "violationRecords",
            "totalViolationsByRange",
            "violationPayments",
            "violationRecordTotals",
            "violationsPerDay"
          ];
          for (const key of queryKeys) {
            queryClient.invalidateQueries({ queryKey: [key] });
          }

          setPayment(data);
          setShowReceipt(true);
          toast.success("Payment successful");
        },
        onError: (error) => {
          toast.error(`Failed to process payment: ${error.message || "Please try again later."}`);
        }
      }
    );
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
              <ViolationRecordReceipt
                violation={{ ...violation, status: "PAID", payment: payment }}
              />
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
                disabled={amount < violationPenalty}
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
