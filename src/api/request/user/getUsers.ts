import api from "@/api/axios";
import type { AxiosError } from "axios";

export const getUsers = async ({
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
  try {
    const response = await api.get("/user/search", {
      params: {
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
      }
    });
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    console.error(error);
    throw new Error(error.message);
  }
};
