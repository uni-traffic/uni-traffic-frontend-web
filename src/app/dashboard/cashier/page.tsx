"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SearchInput from "@/components/violation-table/search-input";
import ViolationsTable from "@/components/violation-table/violation-table";
import { ViolationRecord } from "@/lib/types";
import { Filter } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const statusOptions = [
  { value: "ALL", label: "All" },
  { value: "UNPAID", label: "Unpaid" },
  { value: "PAID", label: "Paid" },
];

// mock violation data
const mockViolations: ViolationRecord[] = [
  {
    id: "0123456789",
    userId: "user1",
    reportedById: "security1",
    violationId: "speeding1",
    vehicleId: "vehicle1",
    status: "UNPAID",
    remarks: "",
    date: "December 04, 2024 04:56PM",
    user: { id: "user1", username: "Student1", email: "student@example.com", firstName: "Student", lastName: "One", role: "STUDENT" },
    reporter: null,
    violation: { id: "speeding1", category: "Traffic", violationName: "Speeding Violation", penalty: 1000 },
    vehicle: null,
  },
  {
    id: "1232143245",
    userId: "user12",
    reportedById: "security1",
    violationId: "speeding2",
    vehicleId: "vehicle1",
    status: "UNPAID",
    remarks: "",
    date: "December 04, 2024 04:56PM",
    user: { id: "user12", username: "Student12", email: "student@example.com", firstName: "Student", lastName: "Twelve", role: "STUDENT" },
    reporter: null,
    violation: { id: "speeding2", category: "Traffic", violationName: "Speeding Violation", penalty: 1000 },
    vehicle: null,
  },
  {
    id: "3683729758",
    userId: "user3",
    reportedById: "security2",
    violationId: "illegal1",
    vehicleId: "vehicle2",
    status: "PAID",
    remarks: "",
    date: "December 04, 2024 04:56PM",
    user: { id: "user3", username: "Student3", email: "student@example.com", firstName: "Student", lastName: "Three", role: "STUDENT" },
    reporter: null,
    violation: { id: "illegal1", category: "Traffic", violationName: "Illegal Parking", penalty: 1000 },
    vehicle: null,
  }
];

const CashierDashboard = () => {
  const [originalViolations, setOriginalViolations] = useState(mockViolations);
  const [displayedViolations, setDisplayedViolations] = useState(mockViolations);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const handleSearch = useCallback(() => {
    let filtered = originalViolations;
    if (searchQuery.trim()) {
      filtered = filtered.filter((v) =>
        v.id.includes(searchQuery) ||
        v.user?.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (statusFilter !== "ALL") {
      filtered = filtered.filter((v) => v.status === statusFilter);
    }
    setDisplayedViolations(filtered);
  }, [searchQuery, statusFilter, originalViolations]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  const handleUpdateViolation = (id : string, updates: Partial<ViolationRecord>) => {
      setDisplayedViolations((prev) =>
        prev.map((ViolationRecord) => (ViolationRecord.id === id ? { ...ViolationRecord, ...updates } : ViolationRecord))
      );
    };

  return (
    <div className="p-6 max-w-[1200px] mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-1">Violation Records</h1>
        <p className="text-muted-foreground">Violation Payment Review Panel</p>
      </div>

      <div className="mb-6 flex justify-between items-center gap-4 flex-col sm:flex-row">
        <div className="w-full sm:max-w-sm">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
            placeholder="Search User or Violation ID..."
          />
        </div>

        <div className="flex items-center gap-2 self-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                {statusFilter !== "ALL" ? `Status: ${statusFilter}` : "All"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {statusOptions.map((option) => (
                <DropdownMenuItem key={option.value} onClick={() => setStatusFilter(option.value)}>
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <ViolationsTable violations={displayedViolations} onUpdateViolation={handleUpdateViolation}/>
    </div>
  );
};

export default CashierDashboard;
