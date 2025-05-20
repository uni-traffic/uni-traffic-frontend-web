import api from "@/api/axios";
import type { AxiosError } from "axios";

export const getSignedUrl = async (params: { path: string }) => {
  try {
    const response = await api.get("/files/view", { params: { path: params.path } });

    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    console.error(error.response);
    throw new Error(error.message);
  }
};
