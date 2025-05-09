import { updateUserRole } from "@/api/request/user/updateUserRole";
import type { User } from "@/lib/types";
import { type UseMutationOptions, useMutation } from "@tanstack/react-query";

type Payload = {
  userId: string;
  role: string;
};

export const useUpdateUserRole = (options?: UseMutationOptions<User, Error, Payload>) => {
  return useMutation({
    mutationFn: updateUserRole,
    ...options
  });
};
