import type { IVehicleApplicationDTO, IVehicleApplicationPaymentDTO } from "@/lib/mockdata";
import { format } from "date-fns";
import { Loader } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Receipt } from "./application-payment-receipt";

interface ApplicationPaymentModalProps {
  application: IVehicleApplicationDTO | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateApplication: (id: string, updates: Partial<IVehicleApplicationDTO>) => void;
}

const ApplicationPaymentModal = ({
  application,
  isOpen,
  onClose,
  onUpdateApplication
}: ApplicationPaymentModalProps) => {
  const [amount, setAmount] = useState<number>(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [payment, setPayment] = useState<IVehicleApplicationPaymentDTO | null>(null);
  const [isPaymentEqualAmount, setIsPaymentEqualAmount] = useState(false);
  const [isProcessing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const applicationPrice = 350;
  const receiptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setAmount(0);
      setShowConfirmation(false);
      setShowReceipt(false);
    }
  }, [isOpen]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setIsPaymentEqualAmount(applicationPrice === amount);
  }, [amount, applicationPrice]);

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

    setProcessing(true);

    try {
      const mockPayment: IVehicleApplicationPaymentDTO = {
        id: application.id,
        amountPaid: paymentAmount,
        amountDue: applicationPrice,
        timePaid: new Date(),
        change: paymentAmount - applicationPrice,
        cashier: null
      };

      onUpdateApplication(application.id, {
        status: "APPROVED",
        payment: mockPayment
      });

      setPayment(mockPayment);
      console.log("payment set:", mockPayment);
      setShowReceipt(true);
    } catch (err) {
      setError("Failed to process payment. Please try again.");
      console.error(err);
    } finally {
      setProcessing(false);
    }
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

        {showReceipt ? (
          <div ref={receiptRef}>
            <Receipt application={application} />
            {/* <Receipt application={{...application, status:"APPROVED", payment: payment}} />  */}
          </div>
        ) : isProcessing ? (
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

export default ApplicationPaymentModal;
