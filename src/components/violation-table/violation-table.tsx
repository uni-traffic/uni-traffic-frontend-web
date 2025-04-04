import { ViolationReceiptModal } from "@/components/violation-table/violation-receipt-modal";
import { ViolationStatusBadge } from "@/components/violation-table/violation-status-badge";
import type { ViolationRecord } from "@/lib/types";
import { format } from "date-fns";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "../ui/pagination";
import ViolationPaymentModal from "./violation-payment-modal";

interface ViolationsTableProps {
  violations: ViolationRecord[];
  onUpdateViolation: (id: string, updates: Partial<ViolationRecord>) => void;
}

const ViolationsTable = ({ violations, onUpdateViolation }: ViolationsTableProps) => {
  const rowsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [isViolationModalOpen, setIsViolationModalOpen] = useState(false);
  const [isViolationReceiptModalOpen, setIsViolationReceiptModalOpen] = useState(false);
  const [selectedViolation, setSelectedViolation] = useState<ViolationRecord | null>(null);

  const totalPages = Math.ceil(violations.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedViolations = violations.slice(startIndex, startIndex + rowsPerPage);

  const handleViolationClick = (violation: ViolationRecord) => {
    setSelectedViolation(violation);
    setIsViolationModalOpen(true);
  };

  const handleUpdateViolation = (id: string, updates: Partial<ViolationRecord>) => {
    onUpdateViolation(id, updates);
  };

  const handleViewReceipt = (violation: ViolationRecord) => {
    setIsViolationReceiptModalOpen(true);
    setSelectedViolation(violation);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
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
            {paginatedViolations.map((record) => {
              const user = record.user;

              return (
                <tr key={record.id} className="bg-card hover:bg-muted/50 transition-colors">
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
                    <ViolationStatusBadge status={record.status} />
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
                        <p className="">{format(new Date(), "MMMM dd, yyyy hh:mm a")}</p>
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
        <Pagination className="m-2">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
            </PaginationItem>
            {Array.from({ length: totalPages }).map((_, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={currentPage === index + 1}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <ViolationPaymentModal
        isOpen={isViolationModalOpen}
        onClose={() => setIsViolationModalOpen(false)}
        violation={selectedViolation}
        onUpdateViolation={handleUpdateViolation}
      />
      <ViolationReceiptModal
        violation={selectedViolation}
        isOpen={isViolationReceiptModalOpen}
        onClose={() => setIsViolationReceiptModalOpen(false)}
      />
    </>
  );
};

export default ViolationsTable;
