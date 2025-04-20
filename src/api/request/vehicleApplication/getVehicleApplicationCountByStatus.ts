import api from "@/api/axios";
import type { AxiosError } from "axios";

export const getVehicleApplicationCountByStatus = async ({
  status
}: {
  status?:
    | "APPROVED"
    | "PENDING_FOR_STICKER"
    | "PENDING_FOR_PAYMENT"
    | "PENDING_FOR_SECURITY_APPROVAL"
    | "REJECTED";
}) => {
  try {
    const response = await api.get("/vehicle-application/stats/count-by-status", {
      params: { status }
    });

    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    console.error(error);
    throw new Error(error.message);
  }
};
