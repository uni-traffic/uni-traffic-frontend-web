import { logout } from "@/api/request/auth/logout";
import {
  type UseMutationOptions,
  type UseMutationResult,
  useMutation
} from "@tanstack/react-query";

export const useLogOut = (
  options?: UseMutationOptions<{ message: string }, Error, null>
): UseMutationResult<{ message: string }, Error, null> => {
  return useMutation({
    mutationFn: logout,
    ...options
  });
};
