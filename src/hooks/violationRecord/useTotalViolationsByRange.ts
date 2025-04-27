import { getTotalViolationsByRange } from "@/api/request/violationRecord/getTotalViolationsByRange";
import { useQuery } from "@tanstack/react-query";

export const useTotalViolationsByRange = ({
  startDate,
  endDate,
  type
}: {
  startDate: string;
  endDate: string;
  type: "YEAR" | "MONTH" | "DAY";
}) => {
  return useQuery({
    queryKey: ["totalViolationsByRange", startDate, endDate, type],
    queryFn: () => getTotalViolationsByRange({ startDate, endDate, type }),
    enabled: !!startDate && !!endDate && !!type,
    staleTime: 60 * 1000
  });
};
