import api from "@/api/axios";
import { handleApiRequestError } from "@/lib/utils";
import type { AxiosError } from "axios";

export const getAuditLog = async ({
  objectId,
  actorId,
  actionType,
  sort,
  searchKey,
  count,
  page
}: {
  objectId?: string;
  actorId?: string;
  actionType?: "CREATE" | "UPDATE" | "DELETE";
  sort?: 1 | 2;
  searchKey?: string;
  count: number;
  page: number;
}) => {
  try {
    const response = await api.get("/audit-log/search", {
      params: {
        objectId: objectId,
        actorId: actorId,
        actionType: actionType,
        sort,
        searchKey,
        count,
        page
      }
    });

    return response.data;
  } catch (err) {
    handleApiRequestError(err as AxiosError, "Something went wrong fetching audit-logs");
  }
};
