import { updateViolation } from "@/api/request/violation/updateViolation";
import { useMutation } from "@tanstack/react-query";

export const useUpdateViolation = () => {
  return useMutation({
    mutationFn: ({
      id,
      category,
      violationName,
      penalty
    }: {
      id: string;
      category?: string;
      violationName?: string;
      penalty?: number;
    }) => updateViolation({ id, category, violationName, penalty })
  });
};
