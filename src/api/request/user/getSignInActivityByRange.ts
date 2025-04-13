import api from "@/api/axios";
import type { AxiosError } from "axios";

export const getUserSignInActivityByRange = async ({
  startDate,
  endDate
}: {
  startDate: string;
  endDate: string;
}) => {
  try {
    const response = await api.get("/sign-in-activity/count", {
      params: {
        startDate,
        endDate
      }
    });

    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    console.error(error);
    throw new Error(error.message);
  }
};
