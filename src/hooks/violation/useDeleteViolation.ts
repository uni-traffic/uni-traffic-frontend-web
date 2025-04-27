import { deleteViolation } from "@/api/request/violation/deleteViolation";
import { useMutation } from "@tanstack/react-query";

export const useDeleteViolation = () => {
  return useMutation({
    mutationFn: (id: string) => deleteViolation(id)
  });
};
