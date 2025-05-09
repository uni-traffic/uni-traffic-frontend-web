"use client";

import { VehicleApplicationStatusBadge } from "@/components/common/VehicleApplicationStatusBadge";
import { VehicleApplicationAssignStickerModal } from "@/components/modals/vehicleApplication/VehicleApplicationAssignStickerModal";
import { VehicleApplicationReceiptModal } from "@/components/modals/vehicleApplication/VehicleApplicationReceiptModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import type { StickerApplicationPayment, VehicleApplication } from "@/lib/types";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { VehicleApplicationPaymentModal } from "../../modals/vehicleApplication/VehicleApplicationPaymentModal";
import { Button } from "../../ui/button";

export const CashierVehicleApplicationTable = ({
  applications
}: {
  applications: VehicleApplication[];
}) => {
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [isStickerApplicationReceiptOpen, setIsStickerApplicationReceiptOpen] = useState(false);
  const [isAssignStickerModalOpen, setIsAssignStickerModalOpen] = useState(false);
  const [receipt, setReceipt] = useState<StickerApplicationPayment | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<VehicleApplication | null>(null);

  const handleApplicationClick = (application: VehicleApplication) => {
    setSelectedApplication(application);
    setIsApplicationModalOpen(true);
  };

  const handleViewReceipt = (stickerApplicationPayment: StickerApplicationPayment | null) => {
    setIsStickerApplicationReceiptOpen(true);
    setReceipt(stickerApplicationPayment);
  };

  const handleAssignApplicationClick = (application: VehicleApplication) => {
    setSelectedApplication(application);
    setIsAssignStickerModalOpen(true);
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
            {applications.map((application) => {
              const user = application.applicant;

              return (
                <tr key={application.id} className="bg-card hover:bg-muted/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold">{application.id}</td>
                  <td className="py-3.5 px-4 text-sm text-muted-foreground">
                    <div className="font-semibold text-black">
                      {user?.firstName} {user?.lastName}
                    </div>
                    <div className="text-xs text-gray-500">{user?.email}</div>
                  </td>
                  <td className="py-3.5 px-4">{application.vehicle.licensePlate}</td>
                  <td className="py-3.5 px-4 text-xs">
                    {format(new Date(application.createdAt), "MMMM dd, yyyy hh:mm a")}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-center">
                    <VehicleApplicationStatusBadge status={application.status} />
                  </td>
                  <td className="py-3.5 px-4">
                    {application.status === "PENDING_FOR_SECURITY_APPROVAL" ||
                    application.status === "REJECTED" ? null : (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="font-semibold w-4">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          side={"right"}
                          sideOffset={0}
                          className="font-medium font-sans"
                        >
                          {application.status === "PENDING_FOR_PAYMENT" ? (
                            <DropdownMenuItem onClick={() => handleApplicationClick(application)}>
                              ADD PAYMENT
                            </DropdownMenuItem>
                          ) : null}
                          {application.status === "PENDING_FOR_STICKER" ||
                          application.status === "APPROVED" ? (
                            <DropdownMenuItem
                              onClick={() => handleViewReceipt(application.payment)}
                            >
                              VIEW RECEIPT
                            </DropdownMenuItem>
                          ) : null}
                          {application.status === "PENDING_FOR_STICKER" ? (
                            <DropdownMenuItem
                              onClick={() => handleAssignApplicationClick(application)}
                            >
                              ASSIGN STICKER
                            </DropdownMenuItem>
                          ) : null}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <VehicleApplicationPaymentModal
        application={selectedApplication}
        isOpen={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
        handleViewReceipt={handleViewReceipt}
      />
      <VehicleApplicationReceiptModal
        stickerApplicationPayment={receipt}
        isOpen={isStickerApplicationReceiptOpen}
        onClose={() => setIsStickerApplicationReceiptOpen(false)}
      />
      <VehicleApplicationAssignStickerModal
        application={selectedApplication}
        isOpen={isAssignStickerModalOpen}
        onClose={() => setIsAssignStickerModalOpen(false)}
      />
    </>
  );
};
