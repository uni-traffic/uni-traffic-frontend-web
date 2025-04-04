import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import type { ViolationRecordAuditLog } from "@/lib/types";
import { format } from "date-fns";
import { useState } from "react";
import UserAvatar from "../../../user-table/user-avatar";
import StatusBadge from "./status-badge";

interface UserTableProps {
  auditLogData: ViolationRecordAuditLog[];
  onAuditLogSelect: (auditLogData: ViolationRecordAuditLog) => void;
}

const AuditLogTable = ({ auditLogData, onAuditLogSelect }: UserTableProps) => {
  const rowsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(auditLogData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedAuditLogData = auditLogData.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="overflow-hidden rounded-md border flex-1">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="max-w-[10vw]">User</TableHead>
            <TableHead className="">Type</TableHead>
            <TableHead className="max-w-[10vw]">Details</TableHead>
            <TableHead className="text-left">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedAuditLogData.map((auditLog) => (
            <TableRow
              key={auditLog.id}
              className="cursor-pointer transition-colors hover:bg-muted/50"
              onClick={() => onAuditLogSelect(auditLog)}
            >
              <TableCell className="max-w-[15vw]">
                <div className="flex items-center gap-3">
                  <UserAvatar
                    name={`${auditLog.actor?.firstName} ${auditLog.actor?.lastName}`}
                    className="h-8 w-8"
                  />
                  <div>
                    <p className="font-medium">
                      {`${auditLog.actor?.firstName} ${auditLog.actor?.lastName}`}
                    </p>
                    <p className="text-xs text-muted-foreground">{auditLog.actor?.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <StatusBadge status={auditLog.auditLogType} />
              </TableCell>
              <TableCell className="max-w-[10vw]">
                <p className="truncate w-[10vw]">{auditLog.details}</p>
              </TableCell>
              <TableCell className="text-left">
                {format(auditLog.createdAt, "MMM dd, yyyy hh:mm:ss a")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
  );
};

export default AuditLogTable;
