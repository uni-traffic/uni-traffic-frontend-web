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
import ApplicationsTable from "@/components/applications-table/applications-table";
import type { VehicleApplication } from "@/lib/types";
import { vehicleApplicationData } from "@/lib/mockdata";
import type { AxiosError } from "axios";
import { FileX2, Filter } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import { toast } from "sonner";

const statusOptions = [
  { value: "ALL", label: "ALL" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
  { value: "FOR CLEARANCE", label: "For Clearance" }
];

export const SecurityDashboard = () => {
  const [originalApplications, setOriginalApplications] = useState<VehicleApplication[]>([]);
  const [displayedApplications, setDisplayedApplications] = useState<VehicleApplication[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [fetching, setFetching] = useState(true);

  const fetchVehicleApplications = useCallback(() => {
    setOriginalApplications(vehicleApplicationData);
    setDisplayedApplications(vehicleApplicationData);
    setFetching(false);
  }, []);
  
  const handleSearch = useCallback(() => {
    if (!searchQuery.trim()) {
      setDisplayedApplications(originalApplications);
      return;
    }
  
    const filtered = originalApplications.filter((application) =>
      application.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      application.applicant?.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      application.applicant?.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      application.applicant?.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    setDisplayedApplications(filtered);
  }, [searchQuery, originalApplications]);
  
  
  const handleStatusFilter = (filterValue: string) => {
    setStatusFilter(filterValue);
  
    if (!filterValue || filterValue === "ALL") {
      setDisplayedApplications(originalApplications);
      return;
    }
  
    const filtered = originalApplications.filter(
      (application) => application.status.toUpperCase() === filterValue.toUpperCase()
    );
    setDisplayedApplications(filtered);
  };

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);
 
  useEffect(() => {
    fetchVehicleApplications();
  }, [fetchVehicleApplications]);

  const handleUpdateApplication = (id: string, updates: Partial<VehicleApplication>) => {
    setOriginalApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, ...updates } : app
      )
    );
  
    setDisplayedApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, ...updates } : app
      )
    );
  };

  return (
    <div className="flex flex-col p-6 max-w-[1200px] h-full mx-auto animate-fade-in">
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

      <div className="flex flex-1">
        {fetching ? (
          <div className="flex flex-col space-y-6 justify-center items-center w-full h-full border border-solid rounded-lg">
            <RingLoader />
            <p className="font-semibold mt-4 animate-pulse font-mono">Fetching Data</p>
          </div>
        ) : !fetching && originalApplications.length > 0 ? (
          <ApplicationsTable 
            applications={displayedApplications} 
            onUpdateApplication={handleUpdateApplication}
          />
        ) : (
          <div className="border rounded-md flex flex-1 flex-col space-y-6 justify-center items-center">
            <FileX2 className="text-black w-18 h-18 mb-4 transform hover:scale-x-[-1] transition-transform duration-300 ease-in-out" />
            <p className="font-semibold font-mono">NO VEHICLE APPLICATIONS FOUND</p>
          </div>
        )}
      </div>
    </div>
  );
};
