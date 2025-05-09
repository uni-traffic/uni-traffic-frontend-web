import { getAuditLog } from "@/api/request/auditLog/getAuditLog";
import { useQuery } from "@tanstack/react-query";

export const useAuditLogs = ({
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
  return useQuery({
    queryFn: () =>
      getAuditLog({
        objectId: objectId,
        actorId: actorId,
        actionType: actionType,
        sort,
        searchKey,
        count,
        page
      }),
    queryKey: ["auditLog"],
    placeholderData: (prev) => prev
  });
};
