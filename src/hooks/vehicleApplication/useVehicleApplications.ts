import { getVehicleApplications } from "@/api/request/vehicleApplication/getVehicleApplication";
import { useQuery } from "@tanstack/react-query";

export const useVehicleApplications = (params: {
  id?: string;
  schoolId?: string;
  driverLicenseId?: string;
  driverLastName?: string;
  driverFirstName?: string;
  firstName?: string;
  lastName?: string;
  licensePlate?: string;
  status?: string;
  applicantId?: string;
  userType?: string;
  sort?: "1" | "2";
  searchKey?: string;
  count?: number;
  page?: number;
}) => {
  return useQuery({
    queryKey: ["vehicleApplications", params],
    queryFn: () => getVehicleApplications(params),
    placeholderData: (prev) => prev
  });
};
