import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export const ApplicationStatusBadge = ({ status, className }: StatusBadgeProps) => {
  const getStatusStyles = (): string => {
    switch (status) {
      case "APPROVED":
        return "bg-green-500";
      case "PENDING_FOR_STICKER":
        return "bg-blue-600";
      case "PENDING_FOR_PAYMENT":
        return "bg-violet-500";
      case "PENDING_FOR_SECURITY_APPROVAL":
        return "bg-yellow-400";
      case "REJECTED":
        return "bg-red-600";
      default:
        return "bg-gray-100";
    }
  };

  const getFormattedStatus = (rawStatus: string): string => {
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

  return (
    <span
      className={cn(
        "px-2 py-0.5 rounded-full text-xs text-white font-sm uppercase",
        getStatusStyles(),
        className
      )}
    >
      {getFormattedStatus(status)}
    </span>
  );
};
