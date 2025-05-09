"use client";
import { ViolationRecordReceipt } from "@/components/common/ViolationRecordReceipt";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { ViolationRecord } from "@/lib/types";

interface ViolationPaymentModalProps {
  violation: ViolationRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ViolationRecordReceiptModal = ({
  isOpen,
  onClose,
  violation
}: ViolationPaymentModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" aria-describedby={undefined}>
        <DialogTitle />
        <ViolationRecordReceipt violation={violation} />
      </DialogContent>
    </Dialog>
  );
};
