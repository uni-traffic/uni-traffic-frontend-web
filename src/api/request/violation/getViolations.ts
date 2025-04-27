import api from "@/api/axios";
import type { AxiosError } from "axios";

export const getViolations = async ({
  id,
  category,
  violationName,
  isDeleted,
  sort,
  searchKey,
  count,
  page
}: {
  id?: string;
  category?: string;
  violationName?: string;
  isDeleted?: boolean;
  sort?: "1" | "2";
  searchKey?: string;
  count: number;
  page: number;
}) => {
  try {
    const response = await api.get("/violation/search", {
      params: {
        id,
        category,
        violationName,
        isDeleted,
        sort,
        searchKey,
        count,
        page
      }
    });

    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    console.error(error);
    throw new Error(error.message);
  }
};
