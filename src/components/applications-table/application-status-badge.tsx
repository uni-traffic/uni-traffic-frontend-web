import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export const ApplicationStatusBadge = ({ status, className }: StatusBadgeProps) => {
  const getStatusStyles = (): string => {
    switch (status) {
      case "FOR CLEARANCE":
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
      {status}
    </span>
  );
};
