import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import type { IViolationRecordAuditLogDTO } from "@/lib/mockdata";
import { format } from "date-fns";
import UserAvatar from "../user-table/user-avatar";
import StatusBadge from "./status-badge";

interface UserTableProps {
  auditLogData: IViolationRecordAuditLogDTO[];
  onUserSelect: (auditLogData: IViolationRecordAuditLogDTO) => void;
}

const UserTable = ({ auditLogData, onUserSelect }: UserTableProps) => {
  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[150px]">Actor</TableHead>
            <TableHead className="w-[100px]">Type</TableHead>
            <TableHead className="w-[150px]">Details</TableHead>
            <TableHead className="text-left">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {auditLogData.map((auditLog, index) => (
            <TableRow
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={index}
              className="cursor-pointer transition-colors hover:bg-muted/50"
              onClick={() => onUserSelect(auditLog)}
            >
              <TableCell>
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
              <TableCell>
                <p className="truncate w-[30vw]">{auditLog.details}</p>
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

export default UserTable;
