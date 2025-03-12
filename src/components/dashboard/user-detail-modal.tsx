import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import type { IViolationRecordAuditLogDTO } from "@/lib/mockdata";
import { format } from "date-fns";

interface UserDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  auditLog: IViolationRecordAuditLogDTO | null;
}

const UserDetailModal = ({ isOpen, onClose, auditLog }: UserDetailModalProps) => {
  if (!auditLog) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-10">
        <DialogHeader className="space-y-3">
          <div className="flex justify-center pt-4">
            <img src="/neu-logo.png" alt="University Logo" className="h-16 w-16 object-contain" />
          </div>
          <DialogTitle className="text-center">New Era University</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <h3 className="font-medium text-lg">Details</h3>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name:</span>
              <span className="font-medium">{`${auditLog.actor?.firstName} ${auditLog.actor?.lastName}`}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Email:</span>
              <span>{auditLog.actor?.email}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Role:</span>
              <span>{auditLog.actor?.role}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Type:</span>
              <span>{auditLog.auditLogType}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Date:</span>
              <span>{format(auditLog.createdAt, "MMM dd, yyyy hh:mm:ss a")}</span>
            </div>

            <div className="flex justify-between flex-col space-y-2">
              <span className="text-muted-foreground">Remarks:</span>
              <div>
                <p>{auditLog.details}</p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" className="w-full bg-gray-800 hover:bg-gray-700" onClick={onClose}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailModal;
