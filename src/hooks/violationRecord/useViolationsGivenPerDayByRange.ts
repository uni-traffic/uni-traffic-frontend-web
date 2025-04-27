import { getViolationsGivenPerDayByRange } from "@/api/request/violationRecord/getViolationsGivenPerDayByRange";
import { useQuery } from "@tanstack/react-query";

export const useViolationsGivenPerDayByRange = ({
  startDate,
  endDate
}: {
  startDate: string;
  endDate: string;
}) => {
  return useQuery({
    queryKey: ["violationsPerDay", startDate, endDate],
    queryFn: () => getViolationsGivenPerDayByRange({ startDate, endDate }),
    enabled: !!startDate && !!endDate,
    staleTime: 60 * 1000
  });
};
