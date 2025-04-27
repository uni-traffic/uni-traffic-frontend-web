import { getViolationRecordTotals } from "@/api/request/violationRecord/getViolationRecordTotals";
import { useQuery } from "@tanstack/react-query";

export const useViolationRecordTotals = () => {
  return useQuery({
    queryKey: ["violationRecordTotals"],
    queryFn: getViolationRecordTotals,
    staleTime: 60 * 1000
  });
};
