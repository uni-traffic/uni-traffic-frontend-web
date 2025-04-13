import { getUserSignInActivityByRange } from "@/api/request/user/getSignInActivityByRange";
import { useQuery } from "@tanstack/react-query";

export const useUserSignInActivityByRange = ({
  startDate,
  endDate
}: {
  startDate: string;
  endDate: string;
}) => {
  return useQuery({
    queryKey: ["userSignInActivity", startDate, endDate],
    queryFn: () => getUserSignInActivityByRange({ startDate, endDate }),
    enabled: !!startDate && !!endDate,
    staleTime: 60 * 1000
  });
};
