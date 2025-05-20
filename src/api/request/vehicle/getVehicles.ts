import api from "@/api/axios";
import type { AxiosError } from "axios";

export const getVehicles = async ({
  id,
  ownerId,
  licensePlate,
  stickerNumber,
  sort,
  searchKey,
  count,
  page
}: {
  id?: string;
  ownerId?: string;
  licensePlate?: string;
  stickerNumber?: string;
  sort?: "1" | "2";
  searchKey?: string;
  count: number;
  page: number;
}) => {
  try {
    const response = await api.get("/vehicle/search", {
      params: {
        id,
        ownerId,
        licensePlate,
        stickerNumber,
        sort,
        searchKey,
        count,
        page
      }
    });

    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    console.warn(error);
    throw new Error(error.message);
  }
};
