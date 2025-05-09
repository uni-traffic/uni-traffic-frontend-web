import { getViolationPaymentsByRange } from "@/api/request/violationRecord/getViolationPaymentsByRange";
import { useQuery } from "@tanstack/react-query";

export const useViolationPaymentsByRange = ({
  startDate,
  endDate
}: {
  startDate: string;
  endDate: string;
}) => {
  return useQuery({
    queryKey: ["violationPayments", startDate, endDate],
    queryFn: () => getViolationPaymentsByRange({ startDate, endDate }),
    enabled: !!startDate && !!endDate,
    placeholderData: (prev) => prev
  });
};
