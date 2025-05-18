import { payViolationRecord } from "@/api/request/violationRecord/payViolationRecord";
import type { ViolationRecordPayment } from "@/lib/types";
import {
  type UseMutationOptions,
  type UseMutationResult,
  useMutation
} from "@tanstack/react-query";

type Payload = {
  violationRecordId: string;
  cashTendered: number;
};

export const usePayViolationRecord = (
  options?: UseMutationOptions<ViolationRecordPayment, Error, Payload>
): UseMutationResult<ViolationRecordPayment, Error, Payload> => {
  return useMutation({
    mutationFn: payViolationRecord,
    ...options
  });
};
