import { getTotalUniqueSignInsByRange } from "@/api/request/userSignInActivity/getTotalUniqueSignInsByRange";
import { useQuery } from "@tanstack/react-query";

export const useTotalUniqueSignInsByRange = ({
  startDate,
  endDate,
  type
}: {
  startDate: string;
  endDate: string;
  type: "YEAR" | "MONTH" | "DAY";
}) => {
  return useQuery({
    queryKey: ["totalUniqueSignIns", startDate, endDate, type],
    queryFn: () => getTotalUniqueSignInsByRange({ startDate, endDate, type }),
    enabled: !!startDate && !!endDate && !!type,
    placeholderData: (prev) => prev
  });
};
