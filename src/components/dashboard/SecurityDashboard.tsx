"use client";
import { PaginationControls } from "@/components/common/PaginationControls";
import { SearchInput } from "@/components/common/SearchInput";
import { SecurityVehicleApplicationTable } from "@/components/tables/vehicleApplication/SecurityVehicleApplicationTable";
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
import { RingLoader } from "react-spinners";

const statusOptions = [
  { value: "ALL", label: "All" },
  { value: "APPROVED", label: "Approved" },
  { value: "PENDING_FOR_STICKER", label: "Pending for Sticker" },
  { value: "PENDING_FOR_PAYMENT", label: "Pending for Payment" },
  { value: "PENDING_FOR_SECURITY_APPROVAL", label: "Pending for Security Approval" },
  { value: "REJECTED", label: "Rejected" }
];

export const SecurityDashboard = () => {
  const [vehicleApplications, setVehicleApplications] = useState<VehicleApplication[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedSearchQuery, setAppliedSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<{ value: string; label: string }>({
    value: "ALL",
    label: "ALL"
  });

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
    data: vehicleApplicationsData = [],
    isFetching,
    isError
  } = useVehicleApplications({
    count: 7,
    page: page,
    ...(statusFilter.value !== "ALL" && { status: statusFilter.value }),
    ...(appliedSearchQuery.trim() !== "" && { searchKey: appliedSearchQuery })
  });

  useEffect(() => {
    if (vehicleApplicationsData?.vehicleApplication !== undefined) {
      setVehicleApplications(vehicleApplicationsData.vehicleApplication ?? []);
    }
  }, [vehicleApplicationsData]);

  return (
    <div className="flex flex-1 flex-col h-full bg-gray-50 p-8 animate-fade-in">
      <div className="flex flex-1 flex-col p-6 w-full rounded-lg shadow-sm border mx-auto animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-1">Dashboard</h1>
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
              <DropdownMenuContent align="end">
                {statusOptions.map((option) => (
                  <DropdownMenuItem key={option.value} onClick={() => setStatusFilter(option)}>
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex flex-1">
          {isFetching && vehicleApplications.length === 0 ? (
            <div className="flex flex-col space-y-6 justify-center items-center w-full h-full border border-solid rounded-lg">
              <RingLoader />
              <p className="font-semibold mt-4 animate-pulse font-mono">Fetching Data</p>
            </div>
          ) : isError || vehicleApplications.length === 0 ? (
            <div className="border rounded-md flex flex-1 flex-col space-y-6 justify-center items-center">
              <FileX2 className="text-black w-18 h-18 mb-4 transform hover:scale-x-[-1] transition-transform duration-300 ease-in-out" />
              <p className="font-semibold font-mono">NO VEHICLE APPLICATIONS FOUND</p>
            </div>
          ) : (
            <div className="flex flex-col w-full justify-between">
              <SecurityVehicleApplicationTable applications={vehicleApplications} />
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
          )}
        </div>
      </div>
    </div>
  );
};
