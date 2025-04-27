"use client";

import api from "@/api/axios";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import SearchInput from "@/components/user-table/search-input";
import UsersTable from "@/components/user-table/user-table";
import type { Role, User } from "@/lib/types";
import type { AxiosError } from "axios";
import { FileX2, Filter } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import { toast } from "sonner";

const roles: { value: Role; label: string }[] = [
  { value: "SUPERADMIN", label: "SUPERADMIN" },
  { value: "ADMIN", label: "ADMIN" },
  { value: "CASHIER", label: "CASHIER" },
  { value: "SECURITY", label: "SECURITY" },
  { value: "STUDENT", label: "STUDENT" },
  { value: "STAFF", label: "STAFF" },
  { value: "GUEST", label: "GUEST" }
];

const UsersPage = () => {
  const [originalUsers, setOriginUsers] = useState<User[]>([]);
  const [displayedUsers, setDisplayedUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  const [fetching, setFetching] = useState(true);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await api.get("/user/search", {
        params: {
          count: 50,
          page: 1
        },
        withCredentials: true
      });

      setOriginUsers(response.data);
      setDisplayedUsers(response.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      const { message } = axiosError.response?.data as { message?: string };

      toast.error(`${axiosError.status}: ${message || "Failed to fetch users"}`);
    } finally {
      setFetching(false);
    }
  }, []);

  const handleSearch = useCallback(() => {
    if (!searchQuery.trim()) {
      setDisplayedUsers(originalUsers);
      return;
    }

    const filtered = originalUsers.filter(
      (user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.firstName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setDisplayedUsers(filtered);
  }, [searchQuery, originalUsers]);

  const handleStatusFilter = (role: string | null) => {
    setRoleFilter(role);

    if (!role) {
      setDisplayedUsers(originalUsers);
      return;
    }

    const filtered = originalUsers.filter((user) => user.role.toUpperCase() === role.toUpperCase());
    setDisplayedUsers(filtered);
  };

  const handleUpdateUser = (userId: string, updates: Partial<User>) => {
    setDisplayedUsers((prev) =>
      prev.map((user) => (user.id === userId ? { ...user, ...updates } : user))
    );
  };

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="flex flex-1 flex-col h-full bg-gray-50 p-8 animate-fade-in">
      <div className="flex flex-1 flex-col p-6 w-full rounded-lg shadow-sm border mx-auto animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-1">User Management</h1>
          <p className="text-muted-foreground">Manage Users</p>
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
                <DropdownMenuItem onClick={() => handleStatusFilter(null)}>ALL</DropdownMenuItem>
                {roles.map((role) => {
                  return (
                    <DropdownMenuItem
                      key={role.label}
                      onClick={() => handleStatusFilter(role.value)}
                    >
                      {role.value}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex flex-1">
          {fetching ? (
            <div className="flex flex-col space-y-6 justify-center items-center w-full h-full border border-solid rounded-lg">
              <RingLoader />
              <p className="font-semibold mt-4 animate-pulse font-mono">Fetching Data</p>
            </div>
          ) : !fetching && originalUsers.length > 0 ? (
            <div className="flex flex-col w-full justify-between">
              <UsersTable users={displayedUsers} onUpdateUser={handleUpdateUser} />
              {/*<PaginationControls*/}
              {/*  prev={() => console.log("Prev")}*/}
              {/*  next={() => console.log("Next")}*/}
              {/*/>*/}
            </div>
          ) : (
            <div className="border rounded-md flex flex-1 flex-col space-y-6 justify-center items-center">
              <FileX2 className="text-black w-18 h-18 mb-4 transform hover:scale-x-[-1] transition-transform duration-300 ease-in-out" />
              <p className="font-semibold font-mono">NO USERS FOUND</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
