import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export const VehicleApplicationStatusBadge = ({ status, className }: StatusBadgeProps) => {
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
        return "APPROVED";
      case "PENDING_FOR_STICKER":
        return "PENDING STICKER";
      case "PENDING_FOR_PAYMENT":
        return "PENDING PAYMENT";
      case "PENDING_FOR_SECURITY_APPROVAL":
        return "PENDING APPROVAL";
      case "REJECTED":
        return "REJECTED";
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
