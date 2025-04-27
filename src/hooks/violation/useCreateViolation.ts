import { createViolation } from "@/api/request/violation/createViolation";
import { useMutation } from "@tanstack/react-query";

export const useCreateViolation = () => {
  return useMutation({
    mutationFn: ({
      category,
      violationName,
      penalty
    }: {
      category: string;
      violationName: string;
      penalty: number;
    }) => createViolation({ category, violationName, penalty })
  });
};
