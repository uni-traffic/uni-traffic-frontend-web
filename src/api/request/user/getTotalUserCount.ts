import api from "@/api/axios";
import type { AxiosError } from "axios";

export const getTotalUserCount = async ({
  type
}: {
  type?: "ALL" | "MANAGEMENT" | "APP_USERS";
}) => {
  try {
    const response = await api.get("/user/count", {
      params: {
        type
      }
    });

    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    console.error(error);
    throw new Error(error.message);
  }
};
