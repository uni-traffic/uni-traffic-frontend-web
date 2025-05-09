import { getCurrentUser } from "@/api/request/user/getCurrentUser";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser
  });
};
