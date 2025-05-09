import api from "@/api/axios";
import type { AxiosError } from "axios";

export const signInWithGoogle = async (payload: {
  token: string;
  clientType: "WEB" | "MOBILE";
}) => {
  try {
    const response = await api.post("/auth/google", payload);
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    console.error(error);
    throw new Error(error.message);
  }
};
