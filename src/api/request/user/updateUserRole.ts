import api from "@/api/axios";
import type { AxiosError } from "axios";

export const updateUserRole = async (payload: {
  userId: string;
  role: string;
}) => {
  try {
    const response = await api.post("/user/update/role", payload);
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    console.error(error);
    throw new Error(error.message);
  }
};
