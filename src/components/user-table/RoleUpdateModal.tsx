import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import { Role, User } from "@/lib/types";



interface RoleUpdateModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateRole: (userId: string, role: Role) => void;
}

const roles: { value: Role; label: string }[] = [
  { value: "security", label: "Security" },
  { value: "guest", label: "Guest" },
  { value: "staff", label: "Staff" },
  { value: "student", label: "Student" },
];

const RoleUpdateModal = ({ user, isOpen, onClose, onUpdateRole }: RoleUpdateModalProps) => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(user?.role || null);

  const handleSubmit = () => {
    if (user && selectedRole) {
      onUpdateRole(user.id, selectedRole);
      onClose();
    }
  };

  useState(() => {
    if (user) {
      setSelectedRole(user.role);
    }
  });

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Update User Role</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-4 my-4">
          <UserAvatar src={user.avatar} name={user.name} className="h-16 w-16" />
          <div className="text-center">
            <p className="font-medium text-foreground">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="font-medium">Select Role</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full text-left">
                {roles.find((role) => role.value === selectedRole)?.label || "Select a role"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-100">
              {roles.map((role) => (
                <DropdownMenuItem key={role.value} onClick={() => setSelectedRole(role.value)}>
                  {role.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <DialogFooter className="sm:justify-center gap-2 mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button 
            type="button" 
            onClick={handleSubmit}
            disabled={!selectedRole || selectedRole === user.role}
            className="w-full sm:w-auto"
          >
            Update Role
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RoleUpdateModal;