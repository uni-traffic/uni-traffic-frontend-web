import { useAuth } from "@/context/AuthContext";
import type { User } from "@/lib/types";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { UserRoleUpdateModal } from "../../modals/user/UserRoleUpdateModal";
import { Button } from "../../ui/button";

export const UsersTable = ({
  users
}: {
  users: User[];
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const { user: authUser } = useAuth();

  const handleRoleClick = (user: User) => {
    if (user.role === "SUPERADMIN") {
      toast.warning("Cannot update users with SUPERADMIN role!");
      return;
    }
    if (user.role === "ADMIN" && authUser?.role === "ADMIN") {
      toast.warning("You do not have permission to update the role of this user.");
      return;
    }

    setSelectedUser(user);
    setIsRoleModalOpen(true);
  };

  return (
    <>
      <div className="relative rounded-md border overflow-hidden w-full">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="py-3 px-4 w-[10vw] text-left font-medium">Username</th>
              <th className="py-3 px-4 w-[10vw] text-left font-medium">Last Name</th>
              <th className="py-3 px-4 w-[10vw] text-left font-medium">First Name</th>
              <th className="py-3 px-4 w-[10vw] text-left font-medium">Email</th>
              <th className="py-3 px-4 w-[10vw] text-left font-medium">Role</th>
              <th className="py-3 px-4 w-[10vw] text-left font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map((user) => {
              return (
                <tr key={user.id} className="bg-card hover:bg-muted/50 transition-colors">
                  <td className="py-3.5 px-4 text-sm text-muted-foreground">{user.username}</td>
                  <td className="py-2 px-4 text-sm text-muted-foreground">{user.lastName}</td>
                  <td className="py-2 px-4 text-sm text-muted-foreground">{user.firstName}</td>
                  <td className="py-2 px-4 text-sm text-muted-foreground">{user.email}</td>
                  <td className="py-2 px-4 text-sm text-muted-foreground">{user.role}</td>
                  <td className="py-2 px-4">
                    {user.role !== "SUPERADMIN" &&
                      !(user.role === "ADMIN" && authUser?.role === "ADMIN") && (
                        <Button variant="ghost" size="icon" onClick={() => handleRoleClick(user)}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <UserRoleUpdateModal
        user={selectedUser}
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
      />
    </>
  );
};
