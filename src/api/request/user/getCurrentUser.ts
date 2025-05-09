import api from "@/api/axios";
import type { AxiosError } from "axios";

export const getCurrentUser = async () => {
  try {
    const response = await api.get("/user/me");

    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    if (error.status !== 401) {
      console.error(error);
    }

    throw new Error(error.message);
  }
};
