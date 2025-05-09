import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export const ViolationRecordStatusBadge = ({ status, className }: StatusBadgeProps) => {
  const getStatusStyles = (): string => {
    switch (status) {
      case "UNPAID":
        return "bg-red-500";
      case "PAID":
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
      {status}
    </span>
  );
};
