import { assignStickerToVehicleApplication } from "@/api/request/vehicleApplication/assignStickerToVehicleApplication";
import { useMutation } from "@tanstack/react-query";

export const useAssignSticker = () => {
  return useMutation({
    mutationFn: ({
      vehicleApplicationId,
      stickerNumber
    }: {
      vehicleApplicationId: string;
      stickerNumber: string;
    }) => assignStickerToVehicleApplication({ vehicleApplicationId, stickerNumber })
  });
};
