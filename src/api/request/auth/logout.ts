import api from "@/api/axios";
import type { AxiosError } from "axios";

export const logout = async () => {
  try {
    const response = await api.post("/auth/logout");

    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    console.error(error);
    throw new Error(error.message);
  }
};
