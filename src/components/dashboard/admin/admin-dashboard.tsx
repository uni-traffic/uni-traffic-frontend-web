"use client";

import api from "@/api/axios";
import { PaginationControls } from "@/components/common/paginationControls";
import AuditLogDetailModal from "@/components/dashboard/admin/subComponents/audit-log-detail-modal";
import AuditLogTable from "@/components/dashboard/admin/subComponents/audit-log-table";
import FilterSelect from "@/components/dashboard/admin/subComponents/filter-select";
import StatCard from "@/components/dashboard/admin/subComponents/stat-card";
import SearchInput from "@/components/user-table/search-input";
import type { ViolationRecordAuditLog } from "@/lib/types";
import { sortViolationRecordAuditLogsByDate } from "@/lib/utils";
import type { AxiosError } from "axios";
import { Activity, AlertTriangle, DollarSign, FileX2, Users } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import { toast } from "sonner";

const filterOptions = [
  { label: "All Type", value: "ALL" },
  { label: "CREATE", value: "CREATE" },
  { label: "UPDATE", value: "UPDATE" },
  { label: "DELETE", value: "DELETE" }
];

export const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("ALL");
  const [auditLogs, setAuditLogs] = useState<ViolationRecordAuditLog[]>([]);
  const [filteredAuditLogs, setFilteredAuditLogs] = useState<ViolationRecordAuditLog[]>([]);
  const [selectedAuditLogs, setSelectedAuditLogs] = useState<ViolationRecordAuditLog | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fetching, setFetching] = useState(true);

  const fetchViolationRecordAuditLog = useCallback(async () => {
    try {
      const response = await api.get("/audit-log/violation-record/search", {
        params: {
          page: 1,
          count: 20
        }
      });
      if (response.status !== 200) return;

      setAuditLogs(sortViolationRecordAuditLogsByDate(response.data));
    } catch (error) {
      const axiosError = error as AxiosError;
      const { message } = axiosError.response?.data as { message?: string };

      toast.error(`${axiosError.status}: ${message || "Failed to fetch recent activities"}`);
    } finally {
      setFetching(false);
    }
  }, []);

  const handleSearch = useCallback(() => {
    if (!searchTerm.trim()) {
      setFilteredAuditLogs(auditLogs);
      return;
    }

    const filtered = auditLogs.filter(
      (auditLogData) =>
        `${auditLogData.actor?.firstName} ${auditLogData.actor?.lastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        auditLogData.actor?.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredAuditLogs(filtered);
  }, [searchTerm, auditLogs]);

  const handleStatusFilter = (role: string) => {
    setFilterValue(role);
    if (role === "ALL") {
      setFilteredAuditLogs(auditLogs);
      return;
    }

    const filtered = auditLogs.filter(
      (user) => user.auditLogType.toUpperCase() === role.toUpperCase()
    );
    setFilteredAuditLogs(filtered);
  };

  const handleAuditLogSelect = (auditLogData: ViolationRecordAuditLog) => {
    setSelectedAuditLogs(auditLogData);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  useEffect(() => {
    fetchViolationRecordAuditLog();
  }, [fetchViolationRecordAuditLog]);

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
            value="128"
            description="Last 30 days"
            icon={<Users className="h-6 w-6 text-blue-500" />}
          />
          <StatCard
            title="Active Users"
            value="96"
            description="Currently Active"
            icon={<Activity className="h-6 w-6 text-green-500" />}
          />
          <StatCard
            title="Violation Given"
            value="32"
            description="Violations issued."
            icon={<AlertTriangle className="h-6 w-6 text-red-500" />}
          />
          <StatCard
            title="Total Fine Amount"
            value="5"
            description="Total Fine"
            icon={<DollarSign className="h-6 w-6 text-purple-500" />}
          />
        </div>

        <div
          className="flex flex-1 flex-col p-6 rounded-lg shadow-sm border animate-slide-up bg-white"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-1">Recent Activities</h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between">
            <div className="w-full sm:max-w-md">
              <SearchInput
                value={searchTerm}
                onChange={setSearchTerm}
                onSearch={handleSearch}
                placeholder="Search..."
              />
            </div>
            <FilterSelect
              value={filterValue}
              onValueChange={handleStatusFilter}
              options={filterOptions}
              placeholder="All Type"
            />
          </div>

          <div className="flex flex-1">
            {fetching ? (
              <div className="flex flex-col space-y-6 justify-center items-center w-full h-full border border-solid rounded-lg">
                <RingLoader />
                <p className="font-semibold mt-4 animate-pulse font-mono">Fetching Data</p>
              </div>
            ) : !fetching && auditLogs.length > 0 ? (
              <div className="flex flex-col w-full justify-between">
                <AuditLogTable
                  auditLogData={filteredAuditLogs}
                  onAuditLogSelect={handleAuditLogSelect}
                />
                <PaginationControls
                  prev={() => console.log("Prev")}
                  next={() => console.log("Next")}
                />
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
