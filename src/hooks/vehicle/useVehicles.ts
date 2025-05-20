import { getVehicles } from "@/api/request/vehicle/getVehicles";
import type { GetVehicleResponse } from "@/lib/types";
import { type UseQueryResult, useQuery } from "@tanstack/react-query";

export const useVehicles = ({
  id,
  ownerId,
  licensePlate,
  stickerNumber,
  sort,
  searchKey,
  count,
  page
}: {
  id?: string;
  ownerId?: string;
  licensePlate?: string;
  stickerNumber?: string;
  sort?: "1" | "2";
  searchKey?: string;
  count: number;
  page: number;
}): UseQueryResult<GetVehicleResponse> => {
  return useQuery({
    queryKey: ["vehicles", id, ownerId, licensePlate, stickerNumber, sort, searchKey, count, page],
    queryFn: () =>
      getVehicles({
        id,
        ownerId,
        licensePlate,
        stickerNumber,
        sort,
        searchKey,
        count,
        page
      }),
    enabled: count > 0 && page > 0,
    placeholderData: (prev) => prev
  });
};
