import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: boolean;
  className?: string;
}

export const ViolationStatusBadge = ({ status, className }: StatusBadgeProps) => {
  return (
    <span
      className={cn(
        "px-2 py-0.5 rounded-full text-xs text-white font-sm uppercase",
        status ? "bg-red-600" : "bg-green-500",
        className
      )}
    >
      {status ? "DELETED" : "ACTIVE"}
    </span>
  );
};
