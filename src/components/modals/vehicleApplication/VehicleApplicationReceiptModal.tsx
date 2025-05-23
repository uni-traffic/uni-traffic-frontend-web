"use client";

import { StickerApplicationReceipt } from "@/components/common/VehicleApplicationPaymentReceipt";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { StickerApplicationPayment } from "@/lib/types";

interface ViolationPaymentModalProps {
  stickerApplicationPayment: StickerApplicationPayment | null;
  isOpen: boolean;
  onClose: () => void;
}

export const VehicleApplicationReceiptModal = ({
  isOpen,
  onClose,
  stickerApplicationPayment
}: ViolationPaymentModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" aria-describedby={undefined}>
        <DialogTitle />
        <StickerApplicationReceipt stickerApplicationPayment={stickerApplicationPayment} />
      </DialogContent>
    </Dialog>
  );
};
