import { getViolationRecords } from "@/api/request/violationRecord/getViolationRecords";
import { useQuery } from "@tanstack/react-query";

export const useViolationRecords = ({
  id,
  vehicleId,
  userId,
  violationId,
  reportedById,
  sort,
  searchKey,
  status,
  count,
  page
}: {
  id?: string;
  vehicleId?: string;
  userId?: string;
  violationId?: string;
  reportedById?: string;
  sort?: 1 | 2;
  searchKey?: string;
  status?: string;
  count?: number;
  page?: number;
}) => {
  return useQuery({
    queryKey: [
      "violationRecords",
      { id, vehicleId, userId, violationId, reportedById, sort, searchKey, status, count, page }
    ],
    queryFn: () =>
      getViolationRecords({
        id,
        vehicleId,
        userId,
        violationId,
        reportedById,
        sort,
        searchKey,
        status,
        count,
        page
      })
  });
};
