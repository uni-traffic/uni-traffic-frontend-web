import { ViolationRecordStatusBadge } from "@/components/common/ViolationRecordStatusBadge";
import { ViolationRecordReceiptModal } from "@/components/modals/violationRecord/ViolationRecordReceiptModal";
import type { ViolationRecord } from "@/lib/types";
import { format } from "date-fns";
import { useState } from "react";
import { ViolationRecordPaymentModal } from "../../modals/violationRecord/ViolationRecordPaymentModal";
import { Button } from "../../ui/button";

export const ViolationRecordsTable = ({
  violations
}: {
  violations: ViolationRecord[];
}) => {
  const [isViolationModalOpen, setIsViolationModalOpen] = useState(false);
  const [isViolationReceiptModalOpen, setIsViolationReceiptModalOpen] = useState(false);
  const [selectedViolation, setSelectedViolation] = useState<ViolationRecord | null>(null);

  const handleViolationClick = (violation: ViolationRecord) => {
    setSelectedViolation(violation);
    setIsViolationModalOpen(true);
  };

  const handleViewReceipt = (violation: ViolationRecord) => {
    setIsViolationReceiptModalOpen(true);
    setSelectedViolation(violation);
  };

  return (
    <>
      <div className="w-full relative rounded-md border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="py-3 px-4 text-left font-medium">Reference No.</th>
              <th className="py-3 px-4 text-left font-medium">User</th>
              <th className="py-3 pl-4 text-left font-medium w-[20rem]">Violation Information</th>
              <th className="py-3 px-4 text-left font-medium">Date Created</th>
              <th className="py-3 px-4 text-center font-medium">Status</th>
              <th className="py-3 px-4 text-center font-medium" />
            </tr>
          </thead>
          <tbody className="divide-y">
            {violations.map((record) => {
              const user = record.user;

              return (
                <tr key={record.id} className="h-16 bg-card hover:bg-muted/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold">{record.id}</td>
                  <td className="py-3.5 px-4 text-sm text-muted-foreground">
                    <div className="font-medium">
                      {user?.firstName} {user?.lastName}
                    </div>
                    <div className="text-xs text-gray-500">{user?.email}</div>
                  </td>
                  <td className="py-3.5 pl-4">{record.violation?.violationName}</td>
                  <td className="py-3.5 px-4 text-xs">
                    {format(new Date(record.date), "MMMM dd, yyyy hh:mm a")}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-center">
                    <ViolationRecordStatusBadge status={record.status} />
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {record.status === "UNPAID" ? (
                      <Button
                        variant="outline"
                        className="font-semibold"
                        onClick={() => handleViolationClick(record)}
                      >
                        ADD PAYMENT
                      </Button>
                    ) : (
                      <span className="flex flex-col gap-0.5 text-center text-xs ">
                        <p className="font-bold">PAID ON</p>
                        <p className="">
                          {format(new Date(record.payment?.timePaid!), "MMMM dd, yyyy hh:mm a")}
                        </p>
                        <button
                          type="button"
                          className="underline text-blue-500"
                          onClick={() => handleViewReceipt(record)}
                        >
                          View Receipt
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
      <ViolationRecordPaymentModal
        isOpen={isViolationModalOpen}
        onClose={() => setIsViolationModalOpen(false)}
        violation={selectedViolation}
      />
      <ViolationRecordReceiptModal
        violation={selectedViolation}
        isOpen={isViolationReceiptModalOpen}
        onClose={() => setIsViolationReceiptModalOpen(false)}
      />
    </>
  );
};
