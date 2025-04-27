import api from "@/api/axios";
import type { AxiosError } from "axios";

export const getTotalViolationsByRange = async ({
  startDate,
  endDate,
  type
}: {
  startDate: string;
  endDate: string;
  type: "YEAR" | "MONTH" | "DAY";
}) => {
  try {
    const response = await api.get("/violation-record/stats/violations-given", {
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
