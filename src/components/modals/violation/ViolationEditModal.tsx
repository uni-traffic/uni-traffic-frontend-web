"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateViolation } from "@/hooks/violation/useUpdateViolation";
import type { Violation } from "@/lib/types";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ViolationEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  violation: Violation | null;
}

export const ViolationEditModal = ({ isOpen, onClose, violation }: ViolationEditModalProps) => {
  const queryClient = useQueryClient();
  const [violationName, setViolationName] = useState(violation?.violationName ?? "");
  const [penaltyInput, setPenaltyInput] = useState<string>(violation?.penalty.toString() ?? "0");
  const [category, setCategory] = useState(violation?.category ?? "");

  const getPenaltyValue = () => Number(penaltyInput.replace(/^0+(?=\d)/, ""));

  const { mutate: updateViolation, isPending } = useUpdateViolation();

  const save = () => {
    if (!violation || !violation.id) return;

    const newPenalty = getPenaltyValue();
    if (newPenalty < 0) {
      toast.error("Penalty cannot be negative");
      return;
    }

    const updates = {
      id: violation.id,
      ...(violation.violationName !== violationName && violationName && { violationName }),
      ...(violation.category !== category && category && { category }),
      ...(newPenalty !== violation.penalty && { penalty: newPenalty })
    };

    if (Object.keys(updates).length === 1) {
      toast.info("No changes detected.");
      return;
    }

    updateViolation(updates, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["violations"] });
        onClose();
        toast.success("Violation updated successfully");
      },
      onError: (error) => toast.error(`Violation update failed: ${error.message ?? ""}`)
    });
  };

  useEffect(() => {
    setCategory(violation?.category ?? "");
    setPenaltyInput(violation?.penalty.toString() ?? "0");
    setViolationName(violation?.violationName ?? "");
  }, [violation]);

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
              <Textarea value={violationName} onChange={(e) => setViolationName(e.target.value)} />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium">Category</label>
              <Input value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium">Penalty</label>
              <Input
                type="number"
                step={1}
                value={penaltyInput}
                onChange={(e) => {
                  const val = e.target.value;
                  const sanitized = val.replace(/^0+(?=\d)/, "");
                  setPenaltyInput(sanitized);
                }}
              />
            </div>
          </div>
        ) : (
          <div className="text-center text-sm text-gray-500 py-8">No violation selected.</div>
        )}

        <DialogFooter className="sm:justify-right gap-2 mt-6">
          <Button variant="outline" type="button" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button type="button" onClick={save} disabled={isPending}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
