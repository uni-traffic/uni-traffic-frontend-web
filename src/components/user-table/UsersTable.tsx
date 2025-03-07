import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import RoleBadge from "./RoleBadge";
import UserAvatar from "./UserAvatar";
import RoleUpdateModal from "./RoleUpdateModal";
import { Role, User } from "@/lib/types";


  

interface UsersTableProps {
    users: User[];
    onUpdateUser: (userId: string, updates: Partial<User>) => void;
  }

  
  const UsersTable = ({ users, onUpdateUser }: UsersTableProps) => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  
    const handleRoleClick = (user: User) => {
      setSelectedUser(user);
      setIsRoleModalOpen(true);
    };
  
    const handleUpdateRole = (userId: string, role: Role) => {
      onUpdateUser(userId, { role });
    };
  
    return (
      <>
        <div className="relative rounded-md border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="py-3 px-4 text-left font-medium text-muted-foreground">Users</th>
                <th className="py-3 px-4 text-left font-medium text-muted-foreground">
                  <div className="flex items-center gap-1">
                    Role
                  </div>
                </th>
                <th className="py-3 px-4 text-left font-medium text-muted-foreground">Date Created</th>
                <th className="py-3 px-4 text-left font-medium text-muted-foreground"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {users.map((user) => (
                <tr 
                  key={user.id} 
                  className="bg-card hover:bg-muted/50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <UserAvatar src={user.avatar} name={user.name} />
                      <div>
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <RoleBadge role={user.role} onClick={() => handleRoleClick(user)} />
                  </td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">
                    {user.dateCreated}
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
         <RoleUpdateModal
          user={selectedUser}
          isOpen={isRoleModalOpen}
          onClose={() => setIsRoleModalOpen(false)}
          onUpdateRole={handleUpdateRole}
        /> 
      </>
    );
  };
  
  export default UsersTable;