"use client"

import { useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { User } from "@/lib/types";
import SearchInput from "@/components/user-table/SearchInput";
import UsersTable from "@/components/user-table/UsersTable";
import { users as initialUsers } from "@/lib/users";


const UsersPage = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string | null>(null);

  const handleSearch = () => {
   
    if (!searchQuery.trim()) {
      setUsers(initialUsers);
      return;
    }

    const filtered = initialUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setUsers(filtered);
  };

  const handleStatusFilter = (role: string | null) => {
    setRoleFilter(role);
    
    if (!role) {
      setUsers(initialUsers);
      return;
    }

    const filtered = initialUsers.filter((user) => user.role === role);
    setUsers(filtered);
  };

  const handleUpdateUser = (userId: string, updates: Partial<User>) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === userId ? { ...user, ...updates } : user))
    );
  };

  return (
    <div className="p-6 max-w-[1200px] mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-1">Users</h1>
        <p className="text-muted-foreground">Account Review Panel</p>
      </div>

      <div className="mb-6 flex justify-between items-center gap-4 flex-col sm:flex-row">
        <div className="w-full sm:max-w-sm">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
            placeholder="Search..."
          />
        </div>
        
        <div className="flex items-center gap-2 self-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                {roleFilter ? `Role: ${roleFilter}` : "All Role"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleStatusFilter(null)}>
                All role
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusFilter("security")}>
                Security
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusFilter("staff")}>
                Staff
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusFilter("guest")}>
                Guest
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusFilter("student")}>
                Student
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <UsersTable users={users} onUpdateUser={handleUpdateUser} />
    </div>
  );
};

export default UsersPage;