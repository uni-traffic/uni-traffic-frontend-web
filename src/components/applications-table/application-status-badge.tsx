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
      case "PENDING_FOR_STICKER":
        return "bg-yellow-400";
      case "PENDING_FOR_PAYMENT":
        return "bg-yellow-400";
      case "DENIED":
        return "bg-red-600";
      default:
        return "bg-gray-100";
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

const getFormattedStatus = (rawStatus: string): string => {
  let status: string;

  switch (rawStatus) {
    case "APPROVED":
      status = "Approved";
      break;
    case "PENDING_FOR_STICKER":
      status = "Pending for Sticker";
      break;
    case "PENDING_FOR_PAYMENT":
      status = "Pending for Payment";
      break;
    case "PENDING_FOR_SECURITY_APPROVAL":
      status = "For Security Approval";
      break;
    case "REJECTED":
      status = "Rejected";
      break;
    default:
      status = "Unknown";
  }

  return status;
};
