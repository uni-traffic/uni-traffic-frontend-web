"use client";

import { ContentLoading } from "@/components/common/ContentLoading";
import { PaginationControls } from "@/components/common/PaginationControls";
import { SearchInput } from "@/components/common/SearchInput";
import { CashierVehicleApplicationTable } from "@/components/tables/vehicleApplication/CashierVehicleApplicationTable";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useVehicleApplications } from "@/hooks/vehicleApplication/useVehicleApplications";
import type { VehicleApplication } from "@/lib/types";
import { FileX2, Filter } from "lucide-react";
import { useEffect, useState } from "react";

const statusOptions = [
  { value: "ALL", label: "All" },
  { value: "APPROVED", label: "APPROVED" },
  { value: "PENDING_FOR_STICKER", label: "PENDING STICKER" },
  { value: "PENDING_FOR_PAYMENT", label: "PENDING PAYMENT" },
  { value: "PENDING_FOR_SECURITY_APPROVAL", label: "PENDING APPROVAL" },
  { value: "REJECTED", label: "REJECTED" }
];

const ApplicationPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedSearchQuery, setAppliedSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<{ value: string; label: string }>({
    value: "ALL",
    label: "ALL"
  });

  const {
    data: vehicleApplicationsData,
    isFetching,
    isError
  } = useVehicleApplications({
    count: 7,
    page: page,
    ...(statusFilter.value !== "ALL" && { status: statusFilter.value }),
    ...(appliedSearchQuery.trim() !== "" && { searchKey: appliedSearchQuery })
  });

  const vehicleApplications: VehicleApplication[] =
    vehicleApplicationsData?.vehicleApplication ?? [];

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

  return (
    <div className="flex flex-1 flex-col h-full bg-gray-50 p-8 animate-fade-in">
      <div className="flex flex-1 flex-col p-6 w-full rounded-lg shadow-sm border mx-auto animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-1">Vehicle Sticker Applications</h1>
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
                  {statusFilter.value !== "ALL" ? `Status: ${statusFilter.label}` : "All"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="font-semibold font-mono">
                {statusOptions.map((option) => (
                  <DropdownMenuItem key={option.value} onClick={() => setStatusFilter(option)}>
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between">
          {isFetching ? (
            <ContentLoading />
          ) : isError || vehicleApplications.length === 0 ? (
            <div className="border rounded-md flex flex-1 flex-col space-y-6 justify-center items-center">
              <FileX2 className="text-black w-18 h-18 mb-4 transform hover:scale-x-[-1] transition-transform duration-300 ease-in-out" />
              <p className="font-semibold font-mono">NO VEHICLE APPLICATIONS FOUND</p>
            </div>
          ) : (
            <div className="flex w-full">
              <CashierVehicleApplicationTable applications={vehicleApplications} />
            </div>
          )}
          <PaginationControls
            currentPage={page}
            totalPages={vehicleApplicationsData?.totalPages || 1}
            prev={() => setPage((prev) => Math.max(prev - 1, 1))}
            next={() => setPage((prev) => prev + 1)}
            setPage={setPage}
            hasPrev={page > 1}
            hasNext={!!vehicleApplicationsData?.hasNextPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ApplicationPage;
