"use client";
import ApplicationsTable from "@/components/applications-table/applications-table";
import { PaginationControls } from "@/components/common/paginationControls";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import SearchInput from "@/components/violation-table/search-input";
import { useVehicleApplications } from "@/hooks/vehicleApplication/useVehicleApplications";
import type { VehicleApplication } from "@/lib/types";
import { FileX2, Filter } from "lucide-react";
import { useState } from "react";
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
  const { data: applications = [], isLoading } = useVehicleApplications({});
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<{ value: string; label: string }>({
    value: "ALL",
    label: "ALL"
  });

  const filteredApplications = (applications as VehicleApplication[]).filter((application) => {
    const matchesSearch =
      !searchQuery.trim() ||
      application.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      application.applicant?.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      application.applicant?.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      application.applicant?.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      application.vehicle.licensePlate.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter.value === "ALL" ||
      application.status.toUpperCase() === statusFilter.value.toUpperCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-1 flex-col h-full bg-gray-50 p-8 animate-fade-in">
      <div className="flex flex-1 flex-col p-6 w-full rounded-lg shadow-sm border mx-auto animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-1">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your vehicle management dashboard</p>
        </div>

        <div className="mb-6 flex justify-between items-center gap-4 flex-col sm:flex-row">
          <div className="w-full sm:max-w-sm">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={() => console.log("Search")}
              placeholder="Search User or Reference No..."
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
          {isLoading ? (
            <div className="flex flex-col space-y-6 justify-center items-center w-full h-full border border-solid rounded-lg">
              <RingLoader />
              <p className="font-semibold mt-4 animate-pulse font-mono">Fetching Data</p>
            </div>
          ) : filteredApplications.length > 0 ? (
            <div className="flex flex-col w-full justify-between">
              <ApplicationsTable applications={filteredApplications} />
              <PaginationControls
                prev={() => console.log("Prev")}
                next={() => console.log("Next")}
              />
            </div>
          ) : (
            <div className="border rounded-md flex flex-1 flex-col space-y-6 justify-center items-center">
              <FileX2 className="text-black w-18 h-18 mb-4 transform hover:scale-x-[-1] transition-transform duration-300 ease-in-out" />
              <p className="font-semibold font-mono">NO VEHICLE APPLICATIONS FOUND</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
