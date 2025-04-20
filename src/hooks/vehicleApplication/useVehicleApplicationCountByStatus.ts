import { getVehicleApplicationCountByStatus } from "@/api/request/vehicleApplication/getVehicleApplicationCountByStatus";
import { useQuery } from "@tanstack/react-query";

export const useVehicleApplicationCountByStatus = (
  status?:
    | "APPROVED"
    | "PENDING_FOR_STICKER"
    | "PENDING_FOR_PAYMENT"
    | "PENDING_FOR_SECURITY_APPROVAL"
    | "REJECTED"
) => {
  return useQuery({
    queryKey: ["vehicleApplicationCountByStatus", status],
    queryFn: () => getVehicleApplicationCountByStatus({ status }),
    staleTime: 60 * 1000
  });
};
