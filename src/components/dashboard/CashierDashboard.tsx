"use client";

import { ContentLoading } from "@/components/common/ContentLoading";
import { PaginationControls } from "@/components/common/PaginationControls";
import { SearchInput } from "@/components/common/SearchInput";
import { ViolationRecordsTable } from "@/components/tables/violationRecord/ViolationRecordsTable";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useViolationRecords } from "@/hooks/violationRecord/useViolationRecords";
import type { ViolationRecord } from "@/lib/types";
import { FileX2, Filter } from "lucide-react";
import { useEffect, useState } from "react";

const statusOptions = [
  { value: "ALL", label: "ALL" },
  { value: "PAID", label: "PAID" },
  { value: "UNPAID", label: "UNPAID" }
];

export const CashierDashboard = () => {
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedSearchQuery, setAppliedSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const handleSearch = () => {
    setAppliedSearchQuery(searchQuery);
    setPage(1);
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setAppliedSearchQuery("");
      setPage(1);
    }
  }, [searchQuery]);

  const {
    data: violationRecordsData,
    isFetching: fetching,
    isError
  } = useViolationRecords({
    count: 7,
    page: page,

    ...(statusFilter !== "ALL" && { status: statusFilter }),
    ...(appliedSearchQuery.trim() !== "" && { searchKey: appliedSearchQuery })
  });

  const violationRecords: ViolationRecord[] = violationRecordsData?.violation ?? [];

  return (
    <div className="flex flex-1 flex-col h-full bg-gray-50 p-8 animate-fade-in">
      <div className="flex flex-1 flex-col p-6 w-full rounded-lg shadow-sm border mx-auto animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-1">Violation Records</h1>
        </div>

        <div className="mb-6 flex justify-between items-center gap-4 flex-col sm:flex-row">
          <div className="w-full sm:max-w-sm">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={handleSearch}
              placeholder="Search"
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
              <DropdownMenuContent align="end" className="font-semibold font-mono">
                {statusOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => setStatusFilter(option.value)}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between">
          {fetching ? (
            <ContentLoading />
          ) : isError || violationRecords.length === 0 ? (
            <div className="border rounded-md flex flex-1 flex-col space-y-6 justify-center items-center">
              <FileX2 className="text-black w-18 h-18 mb-4 transform hover:scale-x-[-1] transition-transform duration-300 ease-in-out" />
              <p className="font-semibold font-mono">NO VIOLATION RECORDS FOUND</p>
            </div>
          ) : (
            <div className="flex w-full">
              <ViolationRecordsTable violations={violationRecords} />
            </div>
          )}

          <PaginationControls
            currentPage={page}
            totalPages={violationRecordsData?.totalPages || 1}
            prev={() => setPage((prev) => Math.max(prev - 1, 1))}
            next={() => setPage((prev) => prev + 1)}
            setPage={setPage}
            hasPrev={page > 1}
            hasNext={!!violationRecordsData?.hasNextPage}
          />
        </div>
      </div>
    </div>
  );
};
