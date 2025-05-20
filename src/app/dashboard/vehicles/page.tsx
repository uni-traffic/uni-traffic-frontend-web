"use client";

import { ContentLoading } from "@/components/common/ContentLoading";
import { PaginationControls } from "@/components/common/PaginationControls";
import { SearchInput } from "@/components/common/SearchInput";
import { VehiclesTable } from "@/components/tables/vehicles/VehiclesTable";
import { useVehicles } from "@/hooks/vehicle/useVehicles";
import type { Vehicle } from "@/lib/types";
import { FileX2 } from "lucide-react";
import { useEffect, useState } from "react";

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
  } = useVehicles({
    page: page,
    count: 9,
    ...(appliedSearchQuery.trim() !== "" && { searchKey: appliedSearchQuery })
  });

  const vehicles: Vehicle[] = fetchedViolationData?.vehicles ?? [];

  const handleSearch = () => {
    setAppliedSearchQuery(searchQuery);
    setPage(1);
  };

  return (
    <div className="flex flex-1 flex-col h-full bg-gray-50 p-8 animate-fade-in">
      <div className="flex flex-1 flex-col p-6 w-full rounded-lg shadow-sm border mx-auto animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-1">Vehicles</h1>
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
        </div>

        <div className="flex flex-1 flex-col justify-between">
          {isFetching ? (
            <ContentLoading />
          ) : isError || vehicles.length === 0 ? (
            <div className="border rounded-md flex flex-1 flex-col space-y-6 justify-center items-center">
              <FileX2 className="text-black w-18 h-18 mb-4 transform hover:scale-x-[-1] transition-transform duration-300 ease-in-out" />
              <p className="font-semibold font-mono">NO VEHICLE FOUND</p>
            </div>
          ) : (
            <div className="flex w-full">
              <VehiclesTable vehicles={vehicles} />
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
  );
}
