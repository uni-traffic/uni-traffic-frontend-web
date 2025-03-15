import type { ViolationRecordAuditLog } from "@/lib/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sortViolationRecordsByDate = (
  auditLogs: ViolationRecordAuditLog[],
  ascending = false
): ViolationRecordAuditLog[] => {
  return auditLogs.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    if (ascending) {
      return dateA.getTime() - dateB.getTime();
    }

    return dateB.getTime() - dateA.getTime();
  });
};
