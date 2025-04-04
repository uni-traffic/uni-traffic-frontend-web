"use client";

import api from "@/api/axios";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import SearchInput from "@/components/violation-table/search-input";
import ViolationsTable from "@/components/violation-table/violation-table";
import type { ViolationRecord } from "@/lib/types";
import { softViolationRecordByDate } from "@/lib/utils";
import type { AxiosError } from "axios";
import { FileX2, Filter } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import { toast } from "sonner";

const statusOptions = [
  { value: "ALL", label: "ALL" },
  { value: "PAID", label: "PAID" },
  { value: "UNPAID", label: "UNPAID" }
];

export const CashierDashboard = () => {
  const [originalViolations, setOriginalViolations] = useState<ViolationRecord[]>([]);
  const [displayedViolations, setDisplayedViolations] = useState<ViolationRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [fetching, setFetching] = useState(true);

  const fetchViolationRecords = useCallback(async () => {
    try {
      const response = await api.get("/violation-record/search");
      if (response.status !== 200) return;
      const sortedResponse: ViolationRecord[] = softViolationRecordByDate(response.data);

      setOriginalViolations(sortedResponse);
      setDisplayedViolations(sortedResponse);
    } catch (error) {
      const axiosError = error as AxiosError;
      const { message } = axiosError.response?.data as { message?: string };

      toast.error(`${axiosError.status}: ${message || "User not found"}`);
    } finally {
      setFetching(false);
    }
  }, []);

  const handleSearch = useCallback(() => {
    if (!searchQuery.trim()) {
      setDisplayedViolations(originalViolations);
      return;
    }

    const filtered = originalViolations.filter(
      (violation) =>
        violation.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        violation.user?.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        violation.user?.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        violation.user?.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setDisplayedViolations(filtered);
  }, [searchQuery, originalViolations]);

  const handleStatusFilter = (filterValue: string) => {
    setStatusFilter(filterValue);

    if (!filterValue || filterValue === "ALL") {
      setDisplayedViolations(originalViolations);
      return;
    }

    const filtered = originalViolations.filter(
      (violation) => violation.status.toUpperCase() === filterValue.toUpperCase()
    );
    setDisplayedViolations(filtered);
  };

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  useEffect(() => {
    fetchViolationRecords();
  }, [fetchViolationRecords]);

  const handleUpdateViolation = (id: string, updates: Partial<ViolationRecord>) => {
    setDisplayedViolations((prev) =>
      prev.map((violation) => (violation.id === id ? { ...violation, ...updates } : violation))
    );
  };

  return (
    <div className="flex flex-1 flex-col h-full bg-gray-50 p-8 animate-fade-in">
      <div className="flex flex-1 flex-col p-6 m-8 rounded-lg shadow-sm border w-full mx-auto animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-1">Violation Records</h1>
          <p className="text-muted-foreground">Violation Payment Review Panel</p>
        </div>

        <div className="mb-6 flex justify-between items-center gap-4 flex-col sm:flex-row">
          <div className="w-full sm:max-w-sm">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={() => console.log("Search")}
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
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => handleStatusFilter(option.value)}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {fetching ? (
          <div className="flex flex-col space-y-6 justify-center items-center w-full h-full border border-solid rounded-lg">
            <RingLoader />
            <p className="font-semibold mt-4 animate-pulse font-mono">Fetching Data</p>
          </div>
        ) : !fetching && originalViolations.length > 0 ? (
          <ViolationsTable
            violations={displayedViolations}
            onUpdateViolation={handleUpdateViolation}
          />
        ) : (
          <div className="border rounded-md flex flex-1 flex-col space-y-6 justify-center items-center">
            <FileX2 className="text-black w-18 h-18 mb-4 transform hover:scale-x-[-1] transition-transform duration-300 ease-in-out" />
            <p className="font-semibold font-mono">NO VIOLATION RECORDS FOUND</p>
          </div>
        )}
      </div>
    </div>
  );
};
