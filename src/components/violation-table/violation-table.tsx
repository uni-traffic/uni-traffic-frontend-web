import type { ViolationRecord } from "@/lib/types";
import { useState } from "react";
import { Button } from "../ui/button";
import ViolationPaymentModal from "./violation-payment-modal";

interface ViolationsTableProps {
  violations: ViolationRecord[];
  onUpdateViolation: (id: string, updates: Partial<ViolationRecord>) => void;
}

const ViolationsTable = ({ violations, onUpdateViolation }: ViolationsTableProps) => {
  const [isViolationModalOpen, setIsViolationModalOpen] = useState(false);
  const [selectedViolation, setSelectedViolation] = useState<ViolationRecord | null>(null);

  const handleViolationClick = (violation: ViolationRecord) => {
    setSelectedViolation(violation);
    setIsViolationModalOpen(true);
  };

  const handleUpdateViolation = (id: string, updates: Partial<ViolationRecord>) => {
    onUpdateViolation(id, updates);
  };

  const formattedDate = (date: string) =>
    new Date(date)
      .toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      })
      .replace(" at", "");
  const getTimeNow = () =>
    new Date()
      .toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      })
      .replace(" at", "");
  return (
    <>
      <div className="relative rounded-md border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="py-3 px-4 text-left font-medium">Users</th>
              <th className="py-3 px-4 text-left font-medium">Violation Record ID</th>
              <th className="py-3 px-4 text-left font-medium">Violation Information</th>
              <th className="py-3 px-4 text-left font-medium">Date Created</th>
              <th className="py-3 px-4 text-center font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {violations.map((record) => {
              const user = record.user;
              const violation = record.violation;

              return (
                <tr key={record.id} className="bg-card hover:bg-muted/50 transition-colors">
                  <td className="py-3.5 px-4 text-sm text-muted-foreground">
                    <div className="font-medium">
                      {user?.firstName} {user?.lastName}
                    </div>
                    <div className="text-xs text-gray-500">{user?.email}</div>
                  </td>
                  <td className="py-3.5 px-4 font-bold">{record.id}</td>
                  <td className="py-3.5 px-4">{record.violation?.category}</td>
                  <td className="py-3.5 px-4 text-xs">{formattedDate(record.date)}</td>
                  <td className="py-3.5 px-4 font-bold text-center">
                    {record.status === "Pending" && (
                      <div className="text-black font-semibold mb-1">
                        ₱{violation?.penalty.toLocaleString()}
                      </div>
                    )}
                    <span
                      className={`px-2 py-1 rounded text-white ${record.status === "Pending" ? "bg-red-500" : "bg-green-500"}`}
                    >
                      {record.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {record.status === "Pending" ? (
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
                        <p className="">{getTimeNow()}</p>
                        <a href="#" className="underline text-blue-500">
                          Print Receipt
                        </a>
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ViolationPaymentModal
        isOpen={isViolationModalOpen}
        onClose={() => setIsViolationModalOpen(false)}
        violation={selectedViolation}
        onUpdateViolation={handleUpdateViolation}
      />
    </>
  );
};

export default ViolationsTable;
