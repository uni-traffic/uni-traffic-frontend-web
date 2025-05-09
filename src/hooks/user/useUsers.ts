import { getUsers } from "@/api/request/user/getUsers";
import { useQuery } from "@tanstack/react-query";

export const useUsers = ({
  count,
  page,
  id,
  firstName,
  lastName,
  username,
  email,
  sort,
  searchKey,
  role
}: {
  count: number;
  page: number;
  id?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  sort?: 1 | 2;
  searchKey?: string;
  role?: string;
}) => {
  return useQuery({
    queryKey: [
      "users",
      { count, page, id, firstName, lastName, username, email, sort, searchKey, role }
    ],
    queryFn: () =>
      getUsers({
        count,
        page,
        id,
        firstName,
        lastName,
        username,
        email,
        sort,
        searchKey,
        role
      })
  });
};
