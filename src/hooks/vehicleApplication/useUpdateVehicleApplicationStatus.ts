import { updateVehicleApplicationStatus } from "@/api/request/vehicleApplication/updateVehicleApplicationStatus";
import type { VehicleApplicationStatus } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";

export const useUpdateVehicleApplicationStatus = () => {
  return useMutation({
    mutationFn: ({
      vehicleApplicationId,
      newStatus,
      remarks
    }: {
      vehicleApplicationId: string;
      newStatus: VehicleApplicationStatus;
      remarks?: string;
    }) => updateVehicleApplicationStatus(vehicleApplicationId, newStatus, remarks)
  });
};
