import { getVehicleApplication } from "@/api/request/vehicleApplication/getVehicleApplication";
import type { VehicleApplicationStatus, VehicleApplicationUserType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export const useVehicleApplications = ({
  id,
  schoolId,
  driverLicenseId,
  licensePlate,
  status,
  applicantId,
  userType,
  count,
  page
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
  return useQuery({
    queryFn: () =>
      getVehicleApplication({
        id,
        schoolId,
        driverLicenseId,
        licensePlate,
        status,
        applicantId,
        userType,
        count,
        page
      }),
    queryKey: ["vehicleApplications"],
    staleTime: 60 * 1000
  });
};
