"use client";

import SearchInput from "@/components/applications-table/search-input";
import PaymentTable from "@/components/cashier/payment-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import type { IVehicleApplicationDTO } from "@/lib/mockdata";
import { vehicleApplicationData } from "@/lib/mockdata";
import { Filter } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const statusOptions = [
  { value: "ALL", label: "ALL" },
  { value: "APPROVED", label: "Approved" },
  { value: "DENIED", label: "Denied" },
  { value: "PENDING_FOR_STICKER", label: "Pending_For_Sticker" },
  { value: "PENDING_FOR_PAYMENT", label: "Pending_For_Payment" },
  { value: "PENDING_FOR_SECURITY_APPROVAL", label: "Pending_For_Security_Approval" }
];

const ApplicationPage = () => {
  const [originalApplications, setOriginalApplications] =
    useState<IVehicleApplicationDTO[]>(vehicleApplicationData);
  const [displayedApplications, setDisplayedApplications] =
    useState<IVehicleApplicationDTO[]>(vehicleApplicationData);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [fetching, setFetching] = useState(true);

  const handleSearch = useCallback(() => {
    if (!searchQuery.trim()) {
      setDisplayedApplications(originalApplications);
      return;
    }

    const filtered = originalApplications.filter(
      (application) =>
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

  const handleUpdateApplication = (id: string, updates: Partial<IVehicleApplicationDTO>) => {
    setDisplayedApplications((prev) =>
      prev.map((application) =>
        application.id === id ? { ...application, ...updates } : application
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
        <PaymentTable
          applications={displayedApplications}
          onUpdateApplication={handleUpdateApplication}
        />
      </div>
    </div>
  );
};

export default ApplicationPage;
