import { getViolations } from "@/api/request/violation/getViolations";
import type { GetViolationResponse } from "@/lib/types";
import { type UseQueryResult, useQuery } from "@tanstack/react-query";

export const useViolations = ({
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
}): UseQueryResult<GetViolationResponse> => {
  return useQuery({
    queryKey: ["violations", id, category, violationName, isDeleted, sort, searchKey, count, page],
    queryFn: () =>
      getViolations({
        id,
        category,
        violationName,
        isDeleted,
        sort,
        searchKey,
        count,
        page
      }),
    enabled: count > 0 && page > 0,
    staleTime: 60 * 1000,
    placeholderData: (prev) => prev
  });
};
