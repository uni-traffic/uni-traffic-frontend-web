import api from "@/api/axios";
import type { AxiosError } from "axios";

export const deleteViolation = async (id: string) => {
  try {
    const response = await api.post("/violation/delete", {
      id: id
    });

    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    console.error(error);
    throw new Error(error.message);
  }
};
