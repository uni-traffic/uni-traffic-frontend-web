import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAssignSticker } from "@/hooks/vehicleApplication/useAssignSticker";
import type { VehicleApplication } from "@/lib/types";
import { useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ViolationPaymentModalProps {
  application: VehicleApplication | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AssignStickerModal = ({
  application,
  isOpen,
  onClose
}: ViolationPaymentModalProps) => {
  const queryClient = useQueryClient();
  const [sticker, setSticker] = useState("");
  const [confirmSticker, setConfirmSticker] = useState("");
  const { mutate, isPending } = useAssignSticker();

  const handleSubmit = () => {
    if (!sticker || sticker.trim() === "") {
      toast.error("Please provide a sticker.");
      return;
    }

    if (!confirmSticker || confirmSticker !== sticker) {
      toast.error("The confirmation sticker does not match. Please try again.");
      return;
    }

    if (!application?.id) {
      toast.error("Cannot find application id");
      return;
    }

    mutate(
      {
        vehicleApplicationId: application?.id,
        stickerNumber: sticker
      },
      {
        onSuccess: () => {
          toast.success("Sticker assigned successfully!");
          queryClient.invalidateQueries({ queryKey: ["vehicleApplications"] });
          onClose();
        },
        onError: (error) => {
          toast.error(error.message);
        }
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" aria-describedby={undefined}>
        <DialogTitle>Assign Sticker</DialogTitle>
        {isPending ? (
          <div className="flex flex-col space-y-3 justify-center items-center w-full h-[15rem]">
            <strong className="text-md">Processing Payment</strong>
            <Loader className="h-1/8 w-1/8 animate-spin duration-1000 text-theme" />
          </div>
        ) : (
          <>
            <div className="text-sm space-y-4 mt-4">
              <div className="flex justify-between">
                <strong>Reference No.</strong>
                <span>{application?.id}</span>
              </div>
              <div className="flex justify-between">
                <strong>License Plate</strong>
                <span>{application?.vehicle.licensePlate}</span>
              </div>
              <div className="flex flex-col gap-2">
                <strong>Sticker Number</strong>
                <Input
                  type="text"
                  placeholder="Sticker"
                  onChange={(e) => setSticker(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <strong>Confirm Sticker</strong>
                <span>
                  <Input
                    type="text"
                    placeholder="Confirm Sticker"
                    onChange={(e) => setConfirmSticker(e.target.value)}
                  />
                </span>
              </div>
            </div>

            <DialogFooter className="sm:justify-center gap-2 mt-4">
              <Button type="button" onClick={handleSubmit} disabled={isPending} className="w-full">
                Save
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
