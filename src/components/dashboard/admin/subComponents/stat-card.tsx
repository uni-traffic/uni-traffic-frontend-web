import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  className?: string;
}

const StatCard = ({ title, value, description, className, icon }: StatCardProps) => {
  return (
    <div className="relative rounded-xl border shadow-sm">
      <Card className={cn("stat-card overflow-hidden", className)}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">{value}</div>
              {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
            </div>
            {icon && <div className="p-2 rounded-full">{icon}</div>}
          </div>
        </CardContent>
      </Card>

      <div className="absolute top-0 left-0 w-full h-full rounded-xl bg-[rgba(255,255,255,0.7)] border flex items-center justify-center">
        <span className="text-lg font-bold text-muted-foreground">Coming Soon</span>
      </div>
    </div>
  );
};

export default StatCard;
