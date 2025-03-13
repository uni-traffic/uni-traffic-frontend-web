import AuditLogDetailModal from "@/components/dashboard/admin/subComponents/audit-log-detail-modal";
import AuditLogTable from "@/components/dashboard/admin/subComponents/audit-log-table";
import FilterSelect from "@/components/dashboard/admin/subComponents/filter-select";
import StatCard from "@/components/dashboard/admin/subComponents/stat-card";
import SearchInput from "@/components/user-table/search-input";
import { type IViolationRecordAuditLogDTO, auditLogData } from "@/lib/mockdata";
import { Activity, AlertTriangle, DollarSign, Users } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const filterOptions = [
  { label: "All Type", value: "all" },
  { label: "Created", value: "CREATED" },
  { label: "Updated", value: "UPDATED" },
  { label: "Deleted", value: "DELETED" }
];

export const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("all");
  const [originalUsers, setOriginalUsers] = useState<IViolationRecordAuditLogDTO[]>(auditLogData);
  const [filteredUsers, setFilteredUsers] = useState<IViolationRecordAuditLogDTO[]>(auditLogData);
  const [selectedUser, setSelectedUser] = useState<IViolationRecordAuditLogDTO | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = useCallback(() => {
    if (!searchTerm.trim()) {
      setFilteredUsers(originalUsers);
      return;
    }

    const filtered = originalUsers.filter(
      (auditLogData) =>
        `${auditLogData.actor?.firstName} ${auditLogData.actor?.lastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        auditLogData.actor?.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredUsers(filtered);
  }, [searchTerm, originalUsers]);

  const handleUserSelect = (auditLogData: IViolationRecordAuditLogDTO) => {
    setSelectedUser(auditLogData);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

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
          className="flex flex-col bg-white p-6 rounded-lg shadow-sm border animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-1">Recent Activities</h2>
            {/* <p className="text-sm text-muted-foreground">Logs</p> */}
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
              onValueChange={setFilterValue}
              options={filterOptions}
              placeholder="All Type"
            />
          </div>

          <AuditLogTable auditLogData={filteredUsers} onAuditLogSelect={handleUserSelect} />
        </div>
      </div>

      <AuditLogDetailModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        auditLog={selectedUser}
      />
    </div>
  );
};
