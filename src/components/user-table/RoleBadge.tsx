import { Role } from "@/lib/types";
import { cn } from "@/lib/utils";


interface RoleBadgeProps {
    role: Role;
    onClick?: () => void;
    className?: string;
  }
  
  const RoleBadge = ({ role, onClick, className }: RoleBadgeProps) => {
    return (
      <span
        onClick={onClick}
        className={cn(
          `role-badge role-badge-${role}`,
          onClick && "cursor-pointer",
          className
        )}
      >
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    );
  };
  
  export default RoleBadge;