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
import { Loader2 } from "lucide-react";
import api from "@/api/axios";
import type { ViolationRecord } from "@/lib/types";

interface ViolationPaymentModalProps {
  violation: ViolationRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateViolation: (id: string, status: string) => void;
}

const ViolationPaymentModal = ({
  violation,
  isOpen,
  onClose,
  onUpdateViolation,
}: ViolationPaymentModalProps) => {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!violation || !amount) return;
    setIsLoading(true);

    try {
      await api.post("/payment/process", {
        violationId: violation.id,
        amount: parseFloat(amount),
      });
      onUpdateViolation(violation.id, "PAID");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  if (!violation) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Add Payment</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 text-sm">
          <p><strong>Payment for:</strong> {violation.user?.firstName} {violation.user?.lastName}</p>
          <p><strong>Violation ID:</strong> {violation.violation?.id}</p>
          <p><strong>{violation.violation?.violationName}</strong></p>
          <p><strong>Balance:</strong> NULL</p>
        </div>

        <div className="space-y-2">
          <label className="font-medium">Input amount</label>
          <Input
            type="text"
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
            {isLoading ? (
              <div className="flex">
                <Loader2 className="animate-spin" /> Processing...
              </div>
            ) : (
              "Confirm Payment"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViolationPaymentModal;
