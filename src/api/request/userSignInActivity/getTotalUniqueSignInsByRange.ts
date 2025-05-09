import api from "@/api/axios";
import type { AxiosError } from "axios";

export const getTotalUniqueSignInsByRange = async ({
  startDate,
  endDate,
  type
}: {
  startDate: string;
  endDate: string;
  type: "YEAR" | "MONTH" | "DAY";
}) => {
  try {
    const response = await api.get("/sign-in-activity/stats/count", {
      params: {
        startDate,
        endDate,
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
