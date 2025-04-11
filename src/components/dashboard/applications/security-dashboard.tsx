"use client";

import { AlertTriangle, CalendarArrowUp, FileText, Users } from "lucide-react";
import StatCard from "../admin/subComponents/stat-card";
import { ApplicationStatusChart } from "./subComponents/application-status-chart";
import { ViolationsByDateChart } from "./subComponents/violations-by-date-chart";

export const SecurityDashboard = () => {
  return (
    <div className="flex h-full overflow-hidden bg-gray-50 p-8 animate-fade-in">
      <div className="flex flex-col w-full">
        <header className="mb-8 animate-slide-up">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome to Security dashboard</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Applications"
            value="100"
            description="Last 30 days"
            icon={<FileText className="h-6 w-6 text-blue-500" />}
          />
          <StatCard
            title="Pending Applications"
            value="96"
            description="Currently Active"
            icon={<CalendarArrowUp className="h-6 w-6 text-green-500" />}
          />
          <StatCard
            title="Active Violations"
            value="32"
            description="Violations issued."
            icon={<AlertTriangle className="h-6 w-6 text-red-500" />}
          />
          <StatCard
            title="Registered Users"
            value="520"
            description="Total Users"
            icon={<Users className="h-6 w-6 text-blue-500" />}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <ViolationsByDateChart />
          <ApplicationStatusChart />
        </div>
      </div>
    </div>
  );
};
