import api from "@/api/axios";
import type { AxiosError } from "axios";

export const payViolationRecord = async (payload: {
  violationRecordId: string;
  cashTendered: number;
}) => {
  try {
    const response = await api.post("/payment/violation", payload);
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    console.error(error);
    throw new Error(error.message);
  }
};
