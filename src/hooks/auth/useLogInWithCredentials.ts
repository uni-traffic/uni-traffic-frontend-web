import { logInWithCredentials } from "@/api/request/auth/logInWithCredentials";
import type { UserLoginResponse } from "@/lib/types";
import {
  type UseMutationOptions,
  type UseMutationResult,
  useMutation
} from "@tanstack/react-query";

type Payload = {
  username: string;
  password: string;
};

export const useLogInWithCredentials = (
  options?: UseMutationOptions<UserLoginResponse, Error, Payload>
): UseMutationResult<UserLoginResponse, Error, Payload> => {
  return useMutation({
    mutationFn: logInWithCredentials,
    ...options
  });
};
