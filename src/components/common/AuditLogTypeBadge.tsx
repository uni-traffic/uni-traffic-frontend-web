import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export const AuditLogTypeBadge = ({ status, className }: StatusBadgeProps) => {
  const getStatusStyles = (): string => {
    switch (status) {
      case "DELETE":
        return "bg-red-100 text-red-600";
      case "UPDATE":
        return "bg-blue-100 text-blue-600";
      case "CREATE":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <span
      className={cn(
        "px-2 py-0.5 rounded-full text-xs font-medium uppercase",
        getStatusStyles(),
        className
      )}
    >
      {status}
    </span>
  );
};
