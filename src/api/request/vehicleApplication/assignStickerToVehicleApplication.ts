import api from "@/api/axios";
import type { AxiosError } from "axios";

export const assignStickerToVehicleApplication = async ({
  vehicleApplicationId,
  stickerNumber
}: {
  vehicleApplicationId: string;
  stickerNumber: string;
}) => {
  try {
    const response = await api.post("/vehicle-application/update/sticker", {
      vehicleApplicationId,
      stickerNumber
    });

    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    console.log(error);

    throw new Error(error.message);
  }
};
