import { useVehicleApplicationAddPayment } from "@/hooks/vehicleApplication/useVehicleApplicationAddPayment";
import type { StickerApplicationPayment, VehicleApplication } from "@/lib/types";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Input } from "../../ui/input";

interface ApplicationPaymentModalProps {
  application: VehicleApplication | null;
  isOpen: boolean;
  onClose: () => void;
  handleViewReceipt: (payment: StickerApplicationPayment | null) => void;
}

export const VehicleApplicationPaymentModal = ({
  application,
  isOpen,
  onClose,
  handleViewReceipt
}: ApplicationPaymentModalProps) => {
  const [amount, setAmount] = useState<number>(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { mutate: addPayment, isPending } = useVehicleApplicationAddPayment();

  const applicationPrice = 300;

  useEffect(() => {
    if (isOpen) {
      setAmount(0);
      setShowConfirmation(false);
      setShowReceipt(false);
    }
  }, [isOpen]);

  const submitPayment = async () => {
    if (!application || !amount) {
      setError("No application or amount specified");
      return;
    }

    const paymentAmount = amount;
    if (Number.isNaN(paymentAmount) || paymentAmount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    addPayment(
      {
        vehicleApplicationId: application.id,
        cashTendered: amount,
        amountDue: applicationPrice
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: ["vehicleApplications"] });
          toast.success("Application has been approved");
          handleViewReceipt(data);
          onClose();
        },
        onError: () => {
          toast.error("Error adding payment");
        }
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-center">
            {showReceipt ? "Payment Receipt" : showConfirmation ? "" : "Add Payment"}
          </DialogTitle>
        </DialogHeader>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        {isPending ? (
          <div className="flex flex-col space-y-3 justify-center items-center w-full h-[15rem]">
            <strong className="text-md">Processing Payment</strong>
            <Loader className="h-1/8 w-1/8 animate-spin duration-1000 text-theme" />
          </div>
        ) : (
          <>
            <div className="text-sm space-y-4 mt-4">
              <div className="flex justify-between">
                <strong>Reference No.:</strong>
                <strong>{application?.id}</strong>
              </div>
              <div className="flex justify-between">
                <strong>Date/Time:</strong>
                <span>
                  {application
                    ? format(new Date(application.createdAt), "MMMM dd, yyyy hh:mm a")
                    : "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <strong>Amount Due:</strong>
                <span>PHP {applicationPrice.toFixed(2)}</span>
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
                disabled={isPending || amount < applicationPrice}
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
