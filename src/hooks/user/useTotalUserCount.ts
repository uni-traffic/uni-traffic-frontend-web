import { getTotalUserCount } from "@/api/request/user/getTotalUserCount";
import { useQuery } from "@tanstack/react-query";

export const useTotalUserCount = (type?: "ALL" | "MANAGEMENT" | "APP_USERS") => {
  return useQuery({
    queryKey: ["totalUserCount", type],
    queryFn: () => getTotalUserCount({ type }),
    staleTime: 60 * 1000
  });
};
