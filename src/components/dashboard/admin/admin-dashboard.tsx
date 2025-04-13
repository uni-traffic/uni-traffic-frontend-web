"use client";

import AuditLogDetailModal from "@/components/dashboard/admin/subComponents/audit-log-detail-modal";
import AuditLogTable from "@/components/dashboard/admin/subComponents/audit-log-table";
import StatCard from "@/components/dashboard/admin/subComponents/stat-card";
import { useAuditLogs } from "@/hooks/auditLog/useAuditLogs";
import { useUserSignInActivityByRange } from "@/hooks/user/useSignInActivityByRange";
import { useTotalUserCount } from "@/hooks/user/useTotalUserCount";
import { useViolationPaymentsByRange } from "@/hooks/violation/useViolationPaymentsByRange";
import { useViolationsGivenPerDayByRange } from "@/hooks/violation/useViolationsGivenPerDayByRange";
import type { AuditLog } from "@/lib/types";
import { getFirstDayOfCurrentMonth, getLastDayOfCurrentMonth } from "@/lib/utils";
import { Activity, AlertTriangle, DollarSign, FileX2, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { RingLoader } from "react-spinners";

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
            value={getViolationsPaymentCollected().toFixed(2)}
            description="Current Month"
            icon={<DollarSign className="h-6 w-6 text-purple-500" />}
            isLoading={isLoadingViolationPaymentCollected}
          />
        </div>

        <div
          className="flex flex-1 flex-col p-6 rounded-lg shadow-sm border animate-slide-up bg-white"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-1">Recent Activities</h2>
          </div>

          {/*<div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between">*/}
          {/*  <div className="w-full sm:max-w-md">*/}
          {/*    <SearchInput*/}
          {/*      value={searchTerm}*/}
          {/*      onChange={setSearchTerm}*/}
          {/*      onSearch={handleSearch}*/}
          {/*      placeholder="Search..."*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*  <FilterSelect*/}
          {/*    value={filterValue}*/}
          {/*    onValueChange={handleStatusFilter}*/}
          {/*    options={filterOptions}*/}
          {/*    placeholder="All Type"*/}
          {/*  />*/}
          {/*</div>*/}

          <div className="flex flex-1">
            {isLoading ? (
              <div className="flex flex-col space-y-6 justify-center items-center w-full h-full border border-solid rounded-lg">
                <RingLoader />
                <p className="font-semibold mt-4 animate-pulse font-mono">Fetching Data</p>
              </div>
            ) : !isLoading && data?.auditLogs.length > 0 ? (
              <div className="flex flex-col w-full justify-between">
                <AuditLogTable
                  auditLogData={data?.auditLogs}
                  onAuditLogSelect={handleAuditLogSelect}
                />
                {/*<PaginationControls*/}
                {/*  prev={() => console.log("Prev")}*/}
                {/*  next={() => console.log("Next")}*/}
                {/*/>*/}
              </div>
            ) : (
              <div className="border rounded-md flex flex-1 flex-col space-y-6 justify-center items-center">
                <FileX2 className="text-black w-18 h-18 mb-4 transform hover:scale-x-[-1] transition-transform duration-300 ease-in-out" />
                <p className="font-bold font-mono">NO RECENT ACTIVITIES FOUND</p>
              </div>
            )}
          </div>
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
