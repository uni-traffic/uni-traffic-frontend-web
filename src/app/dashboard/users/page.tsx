"use client";

import { PaginationControls } from "@/components/common/PaginationControls";
import { SearchInput } from "@/components/common/SearchInput";
import { UsersTable } from "@/components/tables/user/UserTable";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useUsers } from "@/hooks/user/useUsers";
import type { Role, User } from "@/lib/types";
import { FileX2, Filter } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { RingLoader } from "react-spinners";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedSearchQuery, setAppliedSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [roleFilter, setRoleFilter] = useState<string>("ALL");

  const {
    data: fetchedUserData,
    isFetching,
    isError
  } = useUsers({
    count: 11,
    page: page,
    ...(appliedSearchQuery.trim() !== "" && { searchKey: appliedSearchQuery }),
    ...(roleFilter !== "ALL" && { role: roleFilter })
  });

  const users: User[] = fetchedUserData?.user ?? [];

  const handleSearch = () => {
    setAppliedSearchQuery(searchQuery);
    setPage(1);
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setAppliedSearchQuery("");
      setPage(1);
    }
  }, [searchQuery]);

  const handleRoleFilterChange = useCallback((role: string) => {
    setRoleFilter(role);
    setPage(1);
  }, []);

  return (
    <div className="flex flex-1 flex-col h-full bg-gray-50 p-8 animate-fade-in">
      <div className="flex flex-1 flex-col p-6 w-full rounded-lg shadow-sm border mx-auto animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-1">Users</h1>
        </div>

        <div className="mb-6 flex justify-between items-center gap-4 flex-col sm:flex-row">
          <div className="w-full sm:max-w-sm">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={handleSearch}
              placeholder="Search"
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
                <DropdownMenuItem onClick={() => handleRoleFilterChange("ALL")}>
                  ALL
                </DropdownMenuItem>
                {roles.map((role) => {
                  return (
                    <DropdownMenuItem
                      key={role.label}
                      onClick={() => handleRoleFilterChange(role.value)}
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
          {isFetching && users.length === 0 ? (
            <div className="flex flex-col space-y-6 justify-center items-center w-full h-full border border-solid rounded-lg">
              <RingLoader />
              <p className="font-semibold mt-4 animate-pulse font-mono">Fetching Data</p>
            </div>
          ) : isError || users.length === 0 ? (
            <div className="border rounded-md flex flex-1 flex-col space-y-6 justify-center items-center">
              <FileX2 className="text-black w-18 h-18 mb-4 transform hover:scale-x-[-1] transition-transform duration-300 ease-in-out" />
              <p className="font-semibold font-mono">NO USERS FOUND</p>
            </div>
          ) : (
            <div className="flex flex-col w-full justify-between">
              <UsersTable users={users} />
              <PaginationControls
                currentPage={page}
                totalPages={fetchedUserData?.totalPages || 1}
                prev={() => setPage((prev) => Math.max(prev - 1, 1))}
                next={() => setPage((prev) => prev + 1)}
                setPage={setPage}
                hasPrev={page > 1}
                hasNext={!!fetchedUserData?.hasNextPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
