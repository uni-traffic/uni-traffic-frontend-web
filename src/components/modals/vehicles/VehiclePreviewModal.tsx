import { NeuImage } from "@/components/common/NeuImage";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ImageLink, Vehicle } from "@/lib/types";
import { X } from "lucide-react";
import { VehicleImageCarousel } from "../../common/VehicleImageCarousel";

interface VehicleModalProps {
  vehicle: Vehicle | null;
  isOpen: boolean;
  onClose: () => void;
}

export const VehiclePreviewModal = ({ vehicle, isOpen, onClose }: VehicleModalProps) => {
  if (!vehicle) return null;

  const vehicleImages: ImageLink[] = [
    { url: vehicle.images.front, alt: "Front View" },
    { url: vehicle.images.side, alt: "Side View" },
    { url: vehicle.images.back, alt: "Rear View" }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto p-0 rounded-lg">
        <DialogHeader className="p-6 pb-2 sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-semibold">Vehicle Details</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="p-6">
          <Tabs defaultValue="vehicle" className="w-full">
            <TabsList className="w-full grid grid-cols-3 mb-6">
              <TabsTrigger value="vehicle">Vehicle Details</TabsTrigger>
              <TabsTrigger value="staff">Staff/Student Details</TabsTrigger>
              <TabsTrigger value="driver">Driver Details</TabsTrigger>
            </TabsList>

            <TabsContent value="staff" className="space-y-4 animate-fade-in">
              <div className="grid md:grid-cols-2 gap-6 p-6 border rounded-lg subtle-shadow">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-muted-foreground">School ID</label>
                    <div className="text-sm font-medium p-2 border rounded bg-muted/30">
                      {vehicle.schoolMember.schoolId}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground">First Name</label>
                      <div className="text-sm font-medium p-2 border rounded bg-muted/30">
                        {vehicle.schoolMember.firstName}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Last Name</label>
                      <div className="text-sm font-medium p-2 border rounded bg-muted/30">
                        {vehicle.schoolMember.lastName}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-muted-foreground">Type</label>
                    <div className="text-sm font-medium p-2 border rounded bg-muted/30">
                      {vehicle.schoolMember.type}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-medium mb-2 block">School Credentials</label>
                  <div className="mt-2 border rounded-md overflow-hidden">
                    <NeuImage
                      image={vehicle.schoolMember.schoolCredential}
                      alt="School Credentials"
                      className="h-[200px]"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    Click on image to view in full size
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="driver" className="space-y-4 animate-fade-in">
              <div className="p-6 border rounded-lg subtle-shadow">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="text-xs text-muted-foreground">First Name</label>
                    <div className="text-sm font-medium p-2 border rounded bg-muted/30">
                      {vehicle.driver.firstName}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-muted-foreground">Last Name</label>
                    <div className="text-sm font-medium p-2 border rounded bg-muted/30">
                      {vehicle.driver.lastName}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="text-xs text-muted-foreground">License ID</label>
                  <div className="text-sm font-medium p-2 border rounded bg-muted/30">
                    {vehicle.driver.licenseId}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Driver's License</label>
                    <div className="border rounded-md overflow-hidden">
                      <NeuImage image={vehicle.driver.licenseImage} alt={"Driver's License"} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Driver's Picture</label>
                    <div className="border rounded-md overflow-hidden">
                      <NeuImage image={vehicle.driver.selfiePicture} alt="Driver's Picture" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground text-center col-span-2">
                    Click on images to view in full size
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="vehicle" className="space-y-4 animate-fade-in">
              <div className="p-6 border rounded-lg subtle-shadow">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="text-xs text-muted-foreground">Make</label>
                    <div className="text-sm font-medium p-2 border rounded bg-muted/30">
                      {vehicle.make}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-muted-foreground">Series</label>
                    <div className="text-sm font-medium p-2 border rounded bg-muted/30">
                      {vehicle.series}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="text-xs text-muted-foreground">Type</label>
                    <div className="text-sm font-medium p-2 border rounded bg-muted/30">
                      {vehicle.type}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-muted-foreground">Model</label>
                    <div className="text-sm font-medium p-2 border rounded bg-muted/30">
                      {vehicle.model}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="text-xs text-muted-foreground">License Plate</label>
                  <div className="text-sm font-medium p-2 border rounded bg-muted/30">
                    {vehicle.licensePlate}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Certificate of Registration</label>
                    <div className="border rounded-md overflow-hidden">
                      <NeuImage
                        image={vehicle.images.registration}
                        alt={"Certificate of Registration"}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Official Receipt</label>
                    <div className="border rounded-md overflow-hidden">
                      <NeuImage image={vehicle.images.receipt} alt="Official Receipt" />
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="text-sm font-medium mb-3 block">Vehicle Images</label>
                  {vehicleImages && vehicleImages.length > 0 && (
                    <VehicleImageCarousel images={vehicleImages} />
                  )}
                  <p className="text-xs text-muted-foreground text-center col-span-2">
                    Click on images to view in full size
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter className="sticky bottom-0 p-4 border-t bg-background/95 backdrop-blur-sm">
          <Button onClick={onClose} className="ml-auto">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
