"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import SearchInput from "@/components/violation-table/search-input";
import ViolationsTable from "@/components/violation-table/violation-table";
import { violationRecordData } from "@/lib/mockdata";
import type { ViolationRecord } from "@/lib/types";
import { Filter } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const statusOptions = [
  { value: "ALL", label: "All" },
  { value: "UNPAID", label: "UNPAID" },
  { value: "PAID", label: "PAID" }
];

export const CashierDashboard = () => {
  const [originalViolations, setOriginalViolations] =
    useState<ViolationRecord[]>(violationRecordData);
  const [displayedViolations, setDisplayedViolations] =
    useState<ViolationRecord[]>(violationRecordData);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const handleSearch = useCallback(() => {
    let filtered = originalViolations;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((v) => {
        const owner = v.vehicle?.owner;
        return (
          v.id.includes(query) ||
          owner?.firstName?.toLowerCase().includes(query) ||
          owner?.lastName?.toLowerCase().includes(query) ||
          owner?.username?.toLowerCase().includes(query)
        );
      });
    }
    if (statusFilter !== "ALL") {
      filtered = filtered.filter((v) => v.status === statusFilter);
    }
    setDisplayedViolations(filtered);
  }, [searchQuery, statusFilter, originalViolations]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  const handleUpdateViolation = (id: string, updates: Partial<ViolationRecord>) => {
    setDisplayedViolations((prev) =>
      prev.map((violation) => (violation.id === id ? { ...violation, ...updates } : violation))
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

      <ViolationsTable violations={displayedViolations} onUpdateViolation={handleUpdateViolation} />
    </div>
  );
};
