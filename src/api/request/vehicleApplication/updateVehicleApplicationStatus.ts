import api from "@/api/axios";
import type { VehicleApplicationStatus } from "@/lib/types";
import type { AxiosError } from "axios";

export const updateVehicleApplicationStatus = async (
  vehicleApplicationId: string,
  newStatus: VehicleApplicationStatus,
  remarks?: string
) => {
  try {
    const response = await api.post("/vehicle-application/update/status", {
      vehicleApplicationId,
      status: newStatus,
      remarks: remarks
    });

    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    console.log(error);

    throw new Error(error.message);
  }
};
