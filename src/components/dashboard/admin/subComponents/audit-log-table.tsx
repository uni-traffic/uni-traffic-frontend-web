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
import UserAvatar from "../../../user-table/user-avatar";
import StatusBadge from "./status-badge";

interface UserTableProps {
  auditLogData: ViolationRecordAuditLog[];
  onAuditLogSelect: (auditLogData: ViolationRecordAuditLog) => void;
}

const AuditLogTable = ({ auditLogData, onAuditLogSelect }: UserTableProps) => {
  return (
    <div className="overflow-hidden rounded-md border">
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
          {auditLogData.map((auditLog) => (
            <TableRow
              key={auditLog.id}
              className="cursor-pointer transition-colors hover:bg-muted/50"
              onClick={() => onAuditLogSelect(auditLog)}
            >
              <TableCell className="max-w-[15vw]">
                <div className="flex items-center gap-3">
                  <UserAvatar
                    src={auditLog.actor?.role}
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
    </div>
  );
};

export default AuditLogTable;
