"use client";

import UniqueSignInChart from "@/components/common/charts/UniqueSignInChart";
import VehicleApplicationChart from "@/components/common/charts/VehicleApplicationChart";
import ViolationRecordChart from "@/components/common/charts/ViolationRecordChart";
import ViolationsGivenChart from "@/components/common/charts/ViolationsGivenChart";
import AuditLogDetailModal from "@/components/dashboard/admin/subComponents/audit-log-detail-modal";
import StatCard from "@/components/dashboard/admin/subComponents/stat-card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useAuditLogs } from "@/hooks/auditLog/useAuditLogs";
import { useUserSignInActivityByRange } from "@/hooks/user/useSignInActivityByRange";
import { useTotalUserCount } from "@/hooks/user/useTotalUserCount";
import { useViolationPaymentsByRange } from "@/hooks/violation/useViolationPaymentsByRange";
import { useViolationsGivenPerDayByRange } from "@/hooks/violation/useViolationsGivenPerDayByRange";
import type { AuditLog } from "@/lib/types";
import { formatNumber, getFirstDayOfCurrentMonth, getLastDayOfCurrentMonth } from "@/lib/utils";
import { Activity, AlertTriangle, DollarSign, Users } from "lucide-react";
import { useMemo, useState } from "react";

export const AdminDashboard = () => {
  const startDate = useMemo(() => getFirstDayOfCurrentMonth(), []);
  const endDate = useMemo(() => getLastDayOfCurrentMonth(), []);
  const { data, isLoading } = useAuditLogs({ page: 1, count: 8 });
  const { data: users, isLoading: isLoadingUsers } = useTotalUserCount("ALL");
  const { data: activeUsers, isLoading: isLoadingActiveUsers } = useUserSignInActivityByRange({
    startDate: startDate,
    endDate: endDate
  });
  const { data: violationsGiven, isLoading: isLoadingViolationsGiven } =
    useViolationsGivenPerDayByRange({
      startDate: startDate,
      endDate: endDate
    });
  const { data: violationPaymentCollected, isLoading: isLoadingViolationPaymentCollected } =
    useViolationPaymentsByRange({
      startDate: startDate,
      endDate: endDate
    });
  const [selectedAuditLogs, setSelectedAuditLogs] = useState<AuditLog | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getTotalViolations = () => {
    return ((violationsGiven ?? []) as { violationsIssued: number }[]).reduce(
      (sum, item) => sum + (item.violationsIssued || 0),
      0
    );
  };

  const getViolationsPaymentCollected = () => {
    return ((violationPaymentCollected ?? []) as { amountPaid: number }[]).reduce(
      (sum, item) => sum + (item.amountPaid || 0),
      0
    );
  };

  const handleAuditLogSelect = (auditLogData: AuditLog) => {
    setSelectedAuditLogs(auditLogData);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // @ts-ignore
  return (
    <div className="flex h-full overflow-hidden bg-gray-50 p-8 animate-fade-in">
      <div className="flex flex-col w-full">
        <header className="mb-8 animate-slide-up">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome to your user management dashboard</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={users?.count}
            description="Total User Count"
            icon={<Users className="h-6 w-6 text-blue-500" />}
            isLoading={isLoadingUsers}
          />
          <StatCard
            title="Active Users"
            value={activeUsers?.count}
            description="Currently Active"
            icon={<Activity className="h-6 w-6 text-green-500" />}
            isLoading={isLoadingActiveUsers}
          />
          <StatCard
            title="Violation Given"
            value={getTotalViolations()}
            description="Current Month"
            icon={<AlertTriangle className="h-6 w-6 text-red-500" />}
            isLoading={isLoadingViolationsGiven}
          />
          <StatCard
            title="Total Amount Collected from Violations"
            value={formatNumber(getViolationsPaymentCollected())}
            description="Current Month"
            icon={<DollarSign className="h-6 w-6 text-purple-500" />}
            isLoading={isLoadingViolationPaymentCollected}
          />
        </div>

        <div className="flex-1">
          <Carousel className="w-full h-full">
            <CarouselContent className="h-full">
              {/* Page 1 - Violation Record & Vehicle Application */}
              <CarouselItem className="h-full ">
                <div className="grid gap-6 md:grid-cols-2 h-full shadow-sm md:bg-card md:border md:rounded-xl">
                  <ViolationRecordChart className="h-full md:rounded-r-none md:border-0 shadow-none" />
                  <VehicleApplicationChart className="h-full md:rounded-l-none md:border-0 shadow-none" />
                </div>
              </CarouselItem>

              {/* Page 2 - Violations Given */}
              <CarouselItem className=" h-full">
                <div className="grid gap-6 h-full shadow-sm">
                  <ViolationsGivenChart className="h-full" />
                </div>
              </CarouselItem>

              {/* Page 3 - Unique Sign In */}
              <CarouselItem className=" h-full">
                <div className="grid gap-6 h-full shadow-sm">
                  <UniqueSignInChart className="h-full" />
                </div>
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>
      </div>

      <AuditLogDetailModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        auditLog={selectedAuditLogs}
      />
    </div>
  );
};
