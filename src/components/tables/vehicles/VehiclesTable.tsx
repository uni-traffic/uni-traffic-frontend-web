import { VehiclePreviewModal } from "@/components/modals/vehicles/VehiclePreviewModal";
import type { Vehicle } from "@/lib/types";
import { useState } from "react";
import { Button } from "../../ui/button";

export const VehiclesTable = ({
  vehicles
}: {
  vehicles: Vehicle[];
}) => {
  const [isViolationModalOpen, setIsViolationModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const handleVehicleSelect = (violation: Vehicle) => {
    setSelectedVehicle(violation);
    setIsViolationModalOpen(true);
  };

  return (
    <>
      <div className="w-full relative rounded-md border overflow-hidden">
        <table className="w-full text-sm font-roboto">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="py-3 px-4 text-left font-medium">License Plate</th>
              <th className="py-3 px-4 text-left font-medium">Sticker Number</th>
              <th className="py-3 px-4 text-left font-medium">Make</th>
              <th className="py-3 pl-4 text-left font-medium w-[20rem]">Series</th>
              <th className="py-3 px-4 text-left font-medium">Model</th>
              <th className="py-3 px-4 text-center font-medium" />
            </tr>
          </thead>
          <tbody className="divide-y">
            {vehicles.map((vehicle) => {
              return (
                <tr key={vehicle.id} className="h-16 bg-card hover:bg-muted/50 transition-colors">
                  <td className="py-3.5 px-4">{vehicle.licensePlate}</td>
                  <td className="py-3.5 px-4">{vehicle.stickerNumber}</td>
                  <td className="py-3.5 pl-4">{vehicle.make}</td>
                  <td className="py-3.5 pl-4">{vehicle.series}</td>
                  <td className="py-3.5 pl-4">{vehicle.model}</td>
                  <td className="py-3.5 px-4 text-center">
                    <Button
                      variant="outline"
                      className="font-semibold"
                      onClick={() => handleVehicleSelect(vehicle)}
                    >
                      VIEW DETAILS
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <VehiclePreviewModal
        vehicle={selectedVehicle}
        onClose={() => setIsViolationModalOpen(false)}
        isOpen={isViolationModalOpen}
      />
    </>
  );
};
