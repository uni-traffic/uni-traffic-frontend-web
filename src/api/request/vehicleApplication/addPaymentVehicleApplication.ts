import api from "@/api/axios";
import type { AxiosError } from "axios";

export const addPaymentVehicleApplication = async ({
  vehicleApplicationId,
  cashTendered,
  amountDue
}: {
  vehicleApplicationId: string;
  cashTendered: number;
  amountDue: number;
}) => {
  try {
    const response = await api.post("/payment/sticker", {
      vehicleApplicationId,
      cashTendered,
      amountDue
    });

    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    console.log(error);

    throw new Error(error.message);
  }
};
