"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { useUpdateUserRole } from "@/hooks/user/useUpdateUserRole";
import type { Role, User } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { UserAvatar } from "../../common/UserAvatar";

interface RoleUpdateModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

const roles: { value: Role; label: string }[] = [
  { value: "ADMIN", label: "ADMIN" },
  { value: "CASHIER", label: "CASHIER" },
  { value: "SECURITY", label: "SECURITY" },
  { value: "STUDENT", label: "STUDENT" },
  { value: "STAFF", label: "STAFF" },
  { value: "GUEST", label: "GUEST" },
  { value: "SUPERADMIN", label: "SUPERADMIN" }
];

export const UserRoleUpdateModal = ({ user, isOpen, onClose }: RoleUpdateModalProps) => {
  const [selectedRole, setSelectedRole] = useState<string | undefined>(user?.role);
  const { user: authUser } = useAuth();

  const { mutate: updateUserRole, isPending: isLoading } = useUpdateUserRole();

  const handleSubmit = async () => {
    if (!user || user.role === selectedRole || !selectedRole) return;

    updateUserRole(
      {
        userId: user?.id,
        role: selectedRole?.toUpperCase()
      },
      {
        onSuccess: (data) => {
          onClose();
          toast.success(`Successfully updated ${data.firstName}'s role to ${data.role}.`);
        },
        onError: (error) => {
          toast.error(`Failed to update user Role: ${error.message}`);
        }
      }
    );
  };

  useEffect(() => {
    if (user) setSelectedRole(user.role);
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-center">Update User Role</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-4 my-4">
          <UserAvatar name={`${user.firstName} ${user.lastName}`} className="h-16 w-16" />
          <div className="text-center">
            <p className="font-medium text-foreground">{`${user.firstName} ${user.lastName}`}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="font-medium">Select Role</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full text-left">
                {selectedRole ? selectedRole : "Select a role"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-100">
              {roles.map((role) => {
                if (role.value === "SUPERADMIN") return null;
                if (role.value === "ADMIN" && authUser?.role === "ADMIN") return null;

                return (
                  <DropdownMenuItem key={role.value} onClick={() => setSelectedRole(role.value)}>
                    {role.label}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <DialogFooter className="sm:justify-center gap-2 mt-4">
          <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!selectedRole || selectedRole === user.role}
            className="w-full sm:w-auto"
          >
            {isLoading ? (
              <div className="flex space-x-4">
                <Loader2 className="animate-spin" />
                Updating Role
              </div>
            ) : (
              "Update Role"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
