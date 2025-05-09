import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { GridLoader } from "react-spinners";

interface StatCardProps {
  title: string;
  value: string | number | undefined;
  description?: string;
  icon?: ReactNode;
  className?: string;
  isLoading: boolean;
}

export const StatCard = ({
  title,
  value,
  description,
  className,
  icon,
  isLoading
}: StatCardProps) => {
  return (
    <div className="h-full relative rounded-xl border shadow-sm">
      <Card className={cn("stat-card overflow-hidden h-full", className)}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              {isLoading ? (
                <GridLoader size={6} />
              ) : (
                <div className="text-3xl font-bold">{value}</div>
              )}
              {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
            </div>
            {icon && <div className="p-2 rounded-full">{icon}</div>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
