import type { ViolationRecord, ViolationRecordAuditLog } from "@/lib/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sortViolationRecordAuditLogsByDate = (
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

export const softViolationRecordByDate = (
  auditLogs: ViolationRecord[],
  ascending = false
): ViolationRecord[] => {
  return auditLogs.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    if (ascending) {
      return dateA.getTime() - dateB.getTime();
    }

    return dateB.getTime() - dateA.getTime();
  });
};

export const getFirstDayOfCurrentMonth = (): string =>
  formatDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1));

export const getLastDayOfCurrentMonth = (): string =>
  formatDate(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0));

export const formatDate = (date: Date): string =>
  `${date.getFullYear()}-${`${date.getMonth() + 1}`.padStart(2, "0")}-${`${date.getDate()}`.padStart(2, "0")}`;
