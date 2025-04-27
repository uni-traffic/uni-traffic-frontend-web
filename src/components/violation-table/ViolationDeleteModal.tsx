"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { useDeleteViolation } from "@/hooks/violation/useDeleteViolation";
import type { Violation } from "@/lib/types";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface ViolationDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  violation: Violation | null;
}

const ViolationDeleteModal = ({ isOpen, onClose, violation }: ViolationDeleteModalProps) => {
  const queryClient = useQueryClient();
  const { mutate: deleteViolation, isPending } = useDeleteViolation();

  const handleDelete = () => {
    if (!violation?.id) {
      toast.error("Violation does not exist!");
      return;
    }

    deleteViolation(violation?.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["violations"] });
        toast.success("Violation updated successfully");
      },
      onError: (error) => toast.error(error.message ?? "Violation update failed")
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-left">Delete Violation</DialogTitle>
        </DialogHeader>

        {violation ? (
          <div className="text-sm text-gray-700 mt-4">
            Are you sure you want to delete the violation{" "}
            <span className="font-semibold">{violation.id}</span>? <br />
            This action cannot be undone.
          </div>
        ) : (
          <div className="text-center text-sm text-gray-500 py-8">No violation selected.</div>
        )}

        <DialogFooter className="sm:justify-right gap-2 mt-6">
          <Button variant="outline" type="button" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button variant="destructive" type="button" onClick={handleDelete} disabled={isPending}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViolationDeleteModal;
