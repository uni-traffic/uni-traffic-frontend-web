"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Violation } from "@/lib/types";

interface ViolationDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  violation: Violation | null;
}

const ViolationDeleteModal = ({
  isOpen,
  onClose,
  violation,
}: ViolationDeleteModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-left">Delete Violation</DialogTitle>
        </DialogHeader>

        {violation ? (
          <div className="text-sm text-gray-700 mt-4">
            Are you sure you want to delete the violation{" "}
            <span className="font-semibold">{violation.id}</span>? <br/>This action cannot be undone.
          </div>
        ) : (
          <div className="text-center text-sm text-gray-500 py-8">
            No violation selected.
          </div>
        )}

        <DialogFooter className="sm:justify-right gap-2 mt-6">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" type="button" >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViolationDeleteModal;
