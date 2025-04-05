"use client";

import { StickerApplicationReceipt } from "@/components/cashier/application-payment-receipt";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { StickerApplicationPayment } from "@/lib/types";

interface ViolationPaymentModalProps {
  stickerApplicationPayment: StickerApplicationPayment | null;
  isOpen: boolean;
  onClose: () => void;
}

export const StickerApplicationReceiptModal = ({
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
