import api from "@/api/axios";
import type { AxiosError } from "axios";

export const updateViolation = async ({
  id,
  category,
  violationName,
  penalty
}: {
  id: string;
  category?: string;
  violationName?: string;
  penalty?: number;
}) => {
  try {
    const response = await api.post("/violation/update", {
      id,
      category,
      violationName,
      penalty
    });
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    console.error(error);
    throw new Error(error.message);
  }
};
