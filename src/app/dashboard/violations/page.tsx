"use client";

import { PaginationControls } from "@/components/common/PaginationControls";
import { SearchInput } from "@/components/common/SearchInput";
import { ViolationCreateModal } from "@/components/modals/violation/ViolationCreateModal";
import { ViolationsTable } from "@/components/tables/violation/ViolationsTable";
import { Button } from "@/components/ui/button";
import { useViolations } from "@/hooks/violation/useViolations";
import type { Violation } from "@/lib/types";
import { FilePenLine, FileX2 } from "lucide-react";
import { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";

export default function ViolationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedSearchQuery, setAppliedSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isCreateViolationModalOpen, setIsCreateViolationModalOpen] = useState(false);

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
    ...(appliedSearchQuery.trim() !== "" && { searchKey: appliedSearchQuery })
  });

  const violations: Violation[] = fetchedViolationData?.violation ?? [];

  const handleSearch = () => {
    setAppliedSearchQuery(searchQuery);
    setPage(1);
  };

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
            <Button
              variant="outline"
              className="min-w-[100px]"
              onClick={() => setIsCreateViolationModalOpen(true)}
            >
              <FilePenLine />
              New
            </Button>
          </div>

          <div className="flex flex-1">
            {isFetching && violations.length === 0 ? (
              <div className="flex flex-col space-y-6 justify-center items-center w-full h-full border border-solid rounded-lg">
                <RingLoader />
                <p className="font-semibold mt-4 animate-pulse font-mono">Fetching Data</p>
              </div>
            ) : isError || violations.length === 0 ? (
              <div className="border rounded-md flex flex-1 flex-col space-y-6 justify-center items-center">
                <FileX2 className="text-black w-18 h-18 mb-4 transform hover:scale-x-[-1] transition-transform duration-300 ease-in-out" />
                <p className="font-semibold font-mono">NO VIOLATION RECORDS FOUND</p>
              </div>
            ) : (
              <div className="flex flex-col w-full justify-between">
                <ViolationsTable violations={violations} />
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
            )}
            <ViolationCreateModal
              isOpen={isCreateViolationModalOpen}
              onClose={() => setIsCreateViolationModalOpen(false)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
