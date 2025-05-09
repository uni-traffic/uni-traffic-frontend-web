import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  src?: string;
  name: string;
  className?: string;
}

export const UserAvatar = ({ src, name, className }: UserAvatarProps) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  return (
    <Avatar className={cn("border border-border", className)}>
      <AvatarImage src={src} alt={name} className="object-cover" />
      <AvatarFallback className="text-xs font-medium bg-muted text-muted-foreground">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};
