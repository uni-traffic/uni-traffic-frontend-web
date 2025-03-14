"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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

    onClose();
  };

  if (!violation) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Add Payment</DialogTitle>
        </DialogHeader>

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
          <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit} disabled={!amount} className="w-full sm:w-auto">
            Confirm Payment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViolationPaymentModal;
