import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export const ApplicationStatusBadge = ({ status, className }: StatusBadgeProps) => {
  const getStatusStyles = (): string => {
    switch (status) {
      case "PENDING_FOR_SECURITY_APPROVAL":
        return "bg-yellow-400";
      case "REJECTED":
        return "bg-red-600";
      case "APPROVED":
        return "bg-green-500";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <span
      className={cn(
        "px-2 py-0.5 rounded-full text-xs text-white font-medium uppercase",
        getStatusStyles(),
        className
      )}
    >
      {getFormattedStatus(status)}
    </span>
  );
};

const getFormattedStatus = (rawStatus: string): string => {
  let status: string;

  switch (rawStatus) {
    case "APPROVED":
      status = "Approved";
      break;
    case "PENDING_FOR_STICKER":
      status = "Waiting for Sticker";
      break;
    case "PENDING_FOR_PAYMENT":
      status = "Waiting for Payment";
      break;
    case "PENDING_FOR_SECURITY_APPROVAL":
      status = "For Security Approval";
      break;
    case "DENIED":
      status = "Denied";
      break;
    default:
      status = "Unknown";
  }

  return status;
};
