"use client";

import { ApplicationStatusBadge } from "@/components/applications-table/application-status-badge";
import type { IVehicleApplicationDTO } from "@/lib/mockdata";
import { format } from "date-fns";
import { useState } from "react";
import { Button } from "../ui/button";
import ApplicationPaymentModal from "./application-payment-modal";

interface ApplicationsTableProps {
  applications: IVehicleApplicationDTO[];
  onUpdateApplication: (id: string, updates: Partial<IVehicleApplicationDTO>) => void;
}

const PaymentTable = ({ applications, onUpdateApplication }: ApplicationsTableProps) => {
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<IVehicleApplicationDTO | null>(
    null
  );

  const handleApplicationClick = (application: IVehicleApplicationDTO) => {
    setSelectedApplication(application);
    setIsApplicationModalOpen(true);
  };

  const handlePaymentApplication = (id: string, updates: Partial<IVehicleApplicationDTO>) => {
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
              <th className="py-3 px-4 text-center font-medium">Status</th>
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
                  <td className="py-3.5 px-4">{record.vehicle.licensePlate}</td>
                  <td className="py-3.5 px-4 text-xs">
                    {format(new Date(record.createdAt), "MMMM dd, yyyy hh:mm a")}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-center">
                    <ApplicationStatusBadge status={record.status} />
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {record.status === "PENDING_FOR_PAYMENT" ? (
                      <Button
                        variant="outline"
                        className="font-semibold"
                        onClick={() => handleApplicationClick(record)}
                      >
                        ADD PAYMENT
                      </Button>
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ApplicationPaymentModal
        application={selectedApplication}
        isOpen={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
        onUpdateApplication={handlePaymentApplication}
      />
    </>
  );
};

export default PaymentTable;
