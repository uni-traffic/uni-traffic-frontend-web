import api from "@/api/axios";
import type { AxiosError } from "axios";

export const logInWithCredentials = async (payload: {
  username: string;
  password: string;
}) => {
  try {
    const response = await api.post("/auth/login", payload);
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    if (error.status === 401) {
      throw new Error("Incorrect credentials");
    }

    console.error(error);
    throw new Error(`Something went wrong ${error.message}`);
  }
};
