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

export const getStatusStyles = (status: string): string => {
  switch (status) {
    case "APPROVED":
      return "#34d399"; // Lighter green
    case "PENDING_FOR_STICKER":
      return "#60a5fa"; // Lighter blue
    case "PENDING_FOR_PAYMENT":
      return "#a78bfa"; // Lighter violet
    case "PENDING_FOR_SECURITY_APPROVAL":
      return "#fbbf24"; // Yellow (unchanged)
    case "REJECTED":
      return "#f87171"; // Lighter red
    default:
      return "#f3f4f6"; // bg-gray-100 (unchanged)
  }
};

export const getFormattedStatus = (rawStatus: string): string => {
  switch (rawStatus) {
    case "APPROVED":
      return "Approved";
    case "PENDING_FOR_STICKER":
      return "Pending for Sticker";
    case "PENDING_FOR_PAYMENT":
      return "Pending for Payment";
    case "PENDING_FOR_SECURITY_APPROVAL":
      return "For Security Approval";
    case "REJECTED":
      return "Rejected";
    default:
      return "Unknown";
  }
};

export const formatNumber = (number: number): string => {
  const formattedNumber = number.toFixed(2);

  return formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const getDateForRange = (value: string) => {
  const today = new Date();

  switch (value) {
    case "7d":
      today.setDate(today.getDate() - 7);
      break;
    case "30d":
      today.setDate(today.getDate() - 30);
      break;
    case "6m":
      today.setMonth(today.getMonth() - 6);
      break;
    case "1y":
      today.setFullYear(today.getFullYear() - 1);
      break;
  }

  return today;
};
