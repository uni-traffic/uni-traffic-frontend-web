import api from "@/api/axios";
import type { AxiosError } from "axios";

export const createViolation = async ({
  category,
  violationName,
  penalty
}: {
  category: string;
  violationName: string;
  penalty: number;
}) => {
  try {
    const response = await api.post("/violation/create", {
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
