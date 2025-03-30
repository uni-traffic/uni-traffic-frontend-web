import api from "@/api/axios";
import type { VehicleApplicationStatus, VehicleApplicationUserType } from "@/lib/types";
import type { AxiosError } from "axios";

export const getVehicleApplication = async ({
  id,
  schoolId,
  driverLicenseId,
  licensePlate,
  status,
  applicantId,
  userType,
  count = 25,
  page = 1
}: {
  id?: string;
  schoolId?: string;
  driverLicenseId?: string;
  licensePlate?: string;
  status?: VehicleApplicationStatus;
  applicantId?: string;
  userType?: VehicleApplicationUserType;
  count?: number;
  page?: number;
}) => {
  try {
    const response = await api.get("/vehicle-application/search", {
      params: {
        id,
        schoolId,
        driverLicenseId,
        licensePlate,
        status,
        applicantId,
        userType,
        count,
        page
      }
    });

    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    console.log(error);

    throw new Error(error.message);
  }
};
