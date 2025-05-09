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
import { useCreateViolation } from "@/hooks/violation/useCreateViolation";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

interface ViolationCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ViolationCreateModal = ({ isOpen, onClose }: ViolationCreateModalProps) => {
  const queryClient = useQueryClient();
  const [violationName, setViolationName] = useState("");
  const [penaltyInput, setPenaltyInput] = useState("");
  const [category, setCategory] = useState("");

  const { mutate: createViolation, isPending } = useCreateViolation();

  const validateInputs = () => {
    const errors = [];

    if (!category.trim()) {
      errors.push("Category cannot be empty");
    }

    if (!violationName.trim()) {
      errors.push("Violation name cannot be empty");
    }

    const penalty = Number(penaltyInput);
    if (Number.isNaN(penalty)) {
      errors.push("Penalty must be a valid number");
    } else if (penalty < 0) {
      errors.push("Penalty must be a non-negative number");
    }

    return errors;
  };

  const save = () => {
    const validationErrors = validateInputs();

    if (validationErrors.length > 0) {
      for (const error of validationErrors) {
        toast.error(error);
      }
      return;
    }

    createViolation(
      {
        category: category.trim(),
        violationName: violationName.trim(),
        penalty: Number(penaltyInput)
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["violations"] });
          toast.success("Violation created successfully");
          onClose();
          setViolationName("");
          setPenaltyInput("");
          setCategory("");
        },
        onError: (error) => {
          onClose();
          toast.error(`Violation creation failed: ${error.message ?? ""}`);
        }
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-left">Create Violation</DialogTitle>
        </DialogHeader>

        <div className="text-sm space-y-4 mt-4">
          <div className="flex flex-col gap-1">
            <label className="font-medium">Violation</label>
            <Textarea
              value={violationName}
              onChange={(e) => setViolationName(e.target.value)}
              placeholder="Enter violation description"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium">Category</label>
            <Input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter category"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium">Penalty</label>
            <Input
              type="number"
              min="0"
              step={1}
              value={penaltyInput}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "" || /^\d+$/.test(val)) {
                  setPenaltyInput(val);
                }
              }}
              placeholder="Enter penalty amount"
            />
          </div>
        </div>

        <DialogFooter className="sm:justify-right gap-2 mt-6">
          <Button variant="outline" type="button" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button type="button" onClick={save} disabled={isPending}>
            Create Violation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
