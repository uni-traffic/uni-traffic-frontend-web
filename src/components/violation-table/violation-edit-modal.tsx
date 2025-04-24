"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { Violation } from "@/lib/types";

interface ViolationEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  violation: Violation | null;
}

const ViolationEditModal = ({
  isOpen,
  onClose,
  violation,
}: ViolationEditModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-left">Edit Violation</DialogTitle>
        </DialogHeader>

        {violation ? (
          <div className="text-sm space-y-4 mt-4">
            <div className="flex flex-col gap-1">
              <label className="font-medium">Violation</label>
              <Input
                value={violation.violationName|| ""}
                readOnly
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium">Category</label>
              <Input
                value={violation.category || ""}
                readOnly
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium">Penalty</label>
              <Input
                value={`PHP ${violation.penalty || "0.00"}`}
                readOnly
              />
            </div>
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
          <Button type="button">Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViolationEditModal;
