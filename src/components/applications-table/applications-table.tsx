"use client";

import ApplicationModal from "@/components/applications-table/application-review-modal";
import { ApplicationStatusBadge } from "@/components/applications-table/application-status-badge";
import type { VehicleApplication } from "@/lib/types";
import { format } from "date-fns";
import { useState } from "react";
import { Button } from "../ui/button";

interface ApplicationsTableProps {
  applications: VehicleApplication[];
  onUpdateApplication: (id: string, updates: Partial<VehicleApplication>) => void;
}

const ApplicationsTable = ({ applications, onUpdateApplication }: ApplicationsTableProps) => {
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<VehicleApplication | null>(null);

  const handleApplicationClick = (application: VehicleApplication) => {
    setSelectedApplication(application);
    setIsApplicationModalOpen(true);
  };

  const handleUpdateApplication = (id: string, updates: Partial<VehicleApplication>) => {
    onUpdateApplication(id, updates);
  };

  return (
    <>
      <div className="w-full relative rounded-md border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="py-3 px-4 text-left font-medium">Reference No.</th>
              <th className="py-3 px-4 text-left font-medium">Applicant</th>
              <th className="py-3 px-4 text-left font-medium w-[8rem]">License Plate</th>
              <th className="py-3 px-4 text-left font-medium">Date Created</th>
              <th className="py-3 px-4 text-left font-medium">Status</th>
              <th className="py-3 px-4 text-left font-medium w-[12rem]" />
            </tr>
          </thead>
          <tbody className="divide-y">
            {applications.map((record) => {
              const user = record.applicant;

              return (
                <tr key={record.id} className="bg-card hover:bg-muted/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold">{record.id}</td>
                  <td className="py-3.5 px-4 text-sm text-muted-foreground">
                    <div className="font-semibold text-black">
                      {user?.firstName} {user?.lastName}
                    </div>
                    <div className="text-xs text-gray-500">{user?.email}</div>
                  </td>
                  <td className="py-3.5 px-4">{record.vehicle?.licensePlate}</td>
                  <td className="py-3.5 px-4 text-xs">
                    {format(new Date(record.createdAt), "MMMM dd, yyyy hh:mm a")}
                  </td>
                  <td className="py-3.5 px-4 font-bold">
                    <ApplicationStatusBadge status={record.status} />
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {record.status === "PENDING_FOR_SECURITY_APPROVAL" ? (
                      <Button
                        variant="outline"
                        className="font-semibold"
                        onClick={() => handleApplicationClick(record)}
                      >
                        REVIEW
                      </Button>
                    ) : (
                      <span className="flex flex-col gap-0.5 text-center text-xs ">
                        <p className="font-bold"> {record.status} ON</p>
                        <p className="">{format(new Date(), "MMMM dd, yyyy hh:mm a")}</p>
                        <button type="button" className="underline text-blue-500 font-bold">
                          VIEW REMARKS
                        </button>
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ApplicationModal
        isOpen={isApplicationModalOpen}
        application={selectedApplication}
        onClose={() => setIsApplicationModalOpen(false)}
        onApprove={(id) => handleUpdateApplication(id, { status: "APPROVED" })}
        onReject={(id) => handleUpdateApplication(id, { status: "REJECTED" })}
      />
    </>
  );
};

export default ApplicationsTable;
