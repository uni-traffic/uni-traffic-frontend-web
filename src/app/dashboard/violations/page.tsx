"use client";

import { ContentLoading } from "@/components/common/ContentLoading";
import { PaginationControls } from "@/components/common/PaginationControls";
import { SearchInput } from "@/components/common/SearchInput";
import { ViolationCreateModal } from "@/components/modals/violation/ViolationCreateModal";
import { ViolationsTable } from "@/components/tables/violation/ViolationsTable";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useViolations } from "@/hooks/violation/useViolations";
import type { Violation } from "@/lib/types";
import { FilePenLine, FileX2, Filter } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const filters: { value: string; label: string }[] = [
  { value: "ALL", label: "ALL" },
  { value: "false", label: "ACTIVE" },
  { value: "true", label: "DELETED" }
];

export default function ViolationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedSearchQuery, setAppliedSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isCreateViolationModalOpen, setIsCreateViolationModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setAppliedSearchQuery("");
      setPage(1);
    }
  }, [searchQuery]);

  const {
    data: fetchedViolationData,
    isFetching,
    isError
  } = useViolations({
    page: page,
    count: 9,
    ...(appliedSearchQuery.trim() !== "" && { searchKey: appliedSearchQuery }),
    ...((statusFilter === "true" || statusFilter === "false") && {
      isDeleted: statusFilter === "true"
    })
  });

  const violations: Violation[] = fetchedViolationData?.violation ?? [];

  const handleSearch = () => {
    setAppliedSearchQuery(searchQuery);
    setPage(1);
  };

  const handleRoleFilterChange = useCallback((role: string) => {
    setStatusFilter(role);
    setPage(1);
  }, []);

  return (
    <>
      <div className="flex flex-1 flex-col h-full bg-gray-50 p-8 animate-fade-in">
        <div className="flex flex-1 flex-col p-6 w-full rounded-lg shadow-sm border mx-auto animate-fade-in">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-1">Violations</h1>
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
            <div className="flex flex-row gap-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-full min-w-[100px] flex flex-row justify-start"
                  >
                    <Filter className="h-4 w-4" />
                    {statusFilter === "ALL"
                      ? "ALL"
                      : statusFilter === "false"
                        ? "ACTIVE"
                        : "DELETED"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="font-semibold font-mono">
                  {filters.map((filter) => {
                    return (
                      <DropdownMenuItem
                        key={filter.label}
                        onClick={() => handleRoleFilterChange(filter.value)}
                      >
                        {filter.label}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="outline"
                className="min-w-[100px] h-full"
                onClick={() => setIsCreateViolationModalOpen(true)}
              >
                <FilePenLine />
                New
              </Button>
            </div>
          </div>

          <div className="flex flex-1 flex-col justify-between">
            {isFetching ? (
              <ContentLoading />
            ) : isError || violations.length === 0 ? (
              <div className="border rounded-md flex flex-1 flex-col space-y-6 justify-center items-center">
                <FileX2 className="text-black w-18 h-18 mb-4 transform hover:scale-x-[-1] transition-transform duration-300 ease-in-out" />
                <p className="font-semibold font-mono">NO VIOLATION FOUND</p>
              </div>
            ) : (
              <div className="flex w-full">
                <ViolationsTable violations={violations} />
              </div>
            )}
            <PaginationControls
              currentPage={page}
              totalPages={fetchedViolationData?.totalPages || 1}
              prev={() => setPage((prev) => Math.max(prev - 1, 1))}
              next={() => setPage((prev) => prev + 1)}
              setPage={setPage}
              hasPrev={page > 1}
              hasNext={!!fetchedViolationData?.hasNextPage}
            />
          </div>
        </div>
      </div>

      <ViolationCreateModal
        isOpen={isCreateViolationModalOpen}
        onClose={() => setIsCreateViolationModalOpen(false)}
      />
    </>
  );
}
