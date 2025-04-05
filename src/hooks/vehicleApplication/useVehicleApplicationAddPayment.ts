import { addPaymentVehicleApplication } from "@/api/request/vehicleApplication/addPaymentVehicleApplication";
import { useMutation } from "@tanstack/react-query";

export const useVehicleApplicationAddPayment = () => {
  return useMutation({
    mutationFn: ({
      vehicleApplicationId,
      cashTendered,
      amountDue
    }: {
      vehicleApplicationId: string;
      cashTendered: number;
      amountDue: number;
    }) =>
      addPaymentVehicleApplication({
        vehicleApplicationId,
        cashTendered,
        amountDue
      })
  });
};
