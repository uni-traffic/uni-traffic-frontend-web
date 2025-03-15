"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Receipt } from "@/components/violation-table/violation-receipt";
import type { ViolationRecord } from "@/lib/types";

interface ViolationPaymentModalProps {
  violation: ViolationRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ViolationReceiptModal = ({
  isOpen,
  onClose,
  violation
}: ViolationPaymentModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" aria-describedby={undefined}>
        <DialogTitle />
        <Receipt violation={violation} />
      </DialogContent>
    </Dialog>
  );
};
