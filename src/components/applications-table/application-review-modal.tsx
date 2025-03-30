import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateVehicleApplicationStatus } from "@/hooks/vehicleApplication/useUpdateVehicleApplicationStatus";
import type { ImageLink, VehicleApplication } from "@/lib/types";
import { useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import VehicleImageCarousel from "./vehicle-image-carousel";

interface ApplicationModalProps {
  application: VehicleApplication | null;
  isOpen: boolean;
  onClose: () => void;
}

const ApplicationModal = ({ application, isOpen, onClose }: ApplicationModalProps) => {
  const queryClient = useQueryClient();
  const [remarks, setRemarks] = useState("");

  const { mutate: updateVehicleApplicationStatus, isPending } = useUpdateVehicleApplicationStatus();

  if (!application) return null;

  const handleApprove = () => {
    updateVehicleApplicationStatus(
      {
        vehicleApplicationId: application.id,
        newStatus: "PENDING_FOR_PAYMENT",
        remarks: remarks
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["vehicleApplications"] });
          toast.success("Application has been approved");
          onClose();
        },
        onError: () => toast.error("Error submitting approving application")
      }
    );
  };

  const handleReject = () => {
    if (remarks.trim().length === 0) {
      toast.error("You must define remarks when rejecting an application.");
      return;
    }

    console.log(remarks);

    updateVehicleApplicationStatus(
      {
        vehicleApplicationId: application.id,
        newStatus: "REJECTED",
        remarks: remarks
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["vehicleApplications"] });
          toast.success("Application has been approved");
          onClose();
        },
        onError: () => toast.error("Error submitting approving application")
      }
    );
  };

  const vehicleImages: ImageLink[] = [
    { url: application.vehicle.frontImage, alt: "Front View" },
    { url: application.vehicle.sideImage, alt: "Side View" },
    { url: application.vehicle.backImage, alt: "Rear View" }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto p-0 rounded-lg">
        <DialogHeader className="p-6 pb-2 sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-semibold">Vehicle Application Review</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription className="text-sm text-muted-foreground">
            Review the application details before approving or rejecting
          </DialogDescription>
        </DialogHeader>

        <div className="p-6">
          <Tabs defaultValue="staff" className="w-full">
            <TabsList className="w-full grid grid-cols-3 mb-6">
              <TabsTrigger value="staff">Staff/Student Form</TabsTrigger>
              <TabsTrigger value="driver">Driver Form</TabsTrigger>
              <TabsTrigger value="vehicle">Vehicle Form</TabsTrigger>
            </TabsList>

            <TabsContent value="staff" className="space-y-4 animate-fade-in">
              <div className="grid md:grid-cols-2 gap-6 p-6 border rounded-lg subtle-shadow">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-muted-foreground">School ID</label>
                    <div className="text-sm font-medium p-2 border rounded bg-muted/30">
                      {application.schoolMember.schoolId}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground">First Name</label>
                      <div className="text-sm font-medium p-2 border rounded bg-muted/30">
                        {application.schoolMember.firstName}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Last Name</label>
                      <div className="text-sm font-medium p-2 border rounded bg-muted/30">
                        {application.schoolMember.lastName}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-muted-foreground">Type</label>
                    <div className="text-sm font-medium p-2 border rounded bg-muted/30">
                      {application.schoolMember.type}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-medium mb-2 block">School Credentials</label>
                  <div className="mt-2 border rounded-md overflow-hidden">
                    <img
                      src={application.schoolMember.schoolCredential}
                      alt="School Credentials"
                      className="w-full h-[200px] object-contain cursor-pointer"
                      onClick={() =>
                        window.open(application.schoolMember.schoolCredential, "_blank")
                      }
                    />
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    Click on image to view in full size
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="driver" className="space-y-4 animate-fade-in">
              <div className="grid md:grid-cols-2 gap-6 p-6 border rounded-lg subtle-shadow">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground">First Name</label>
                      <div className="text-sm font-medium p-2 border rounded bg-muted/30">
                        {application.driver.firstName}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Last Name</label>
                      <div className="text-sm font-medium p-2 border rounded bg-muted/30">
                        {application.driver.lastName}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-muted-foreground">License ID</label>
                    <div className="text-sm font-medium p-2 border rounded bg-muted/30">
                      {application.driver.licenseId}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-medium mb-2 block">License Image</label>
                  <div className="mt-2 border rounded-md overflow-hidden">
                    <img
                      src={application.driver.licenseImage}
                      alt="Driver's License"
                      className="w-full h-[200px] object-contain cursor-pointer"
                      onClick={() => window.open(application.driver.licenseImage, "_blank")}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    Click on image to view in full size
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
                      {application.vehicle.make}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-muted-foreground">Series</label>
                    <div className="text-sm font-medium p-2 border rounded bg-muted/30">
                      {application.vehicle.series}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="text-xs text-muted-foreground">Type</label>
                    <div className="text-sm font-medium p-2 border rounded bg-muted/30">
                      {application.vehicle.type}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-muted-foreground">Model</label>
                    <div className="text-sm font-medium p-2 border rounded bg-muted/30">
                      {application.vehicle.model}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="text-xs text-muted-foreground">License Plate</label>
                  <div className="text-sm font-medium p-2 border rounded bg-muted/30">
                    {application.vehicle.licensePlate}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Certificate of Registration</label>
                    <div className="border rounded-md overflow-hidden">
                      <img
                        src={application.vehicle.certificateOfRegistration}
                        alt="Certificate of Registration"
                        className="w-full h-[180px] object-contain cursor-pointer"
                        onClick={() =>
                          window.open(application.vehicle.certificateOfRegistration, "_blank")
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Official Receipt</label>
                    <div className="border rounded-md overflow-hidden">
                      <img
                        src={application.vehicle.officialReceipt}
                        alt="Official Receipt"
                        className="w-full h-[180px] object-contain cursor-pointer"
                        onClick={() => window.open(application.vehicle.officialReceipt, "_blank")}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground text-center col-span-2">
                    Click on images to view in full size
                  </p>
                </div>

                <div className="mb-6">
                  <label className="text-sm font-medium mb-3 block">Vehicle Images</label>
                  {vehicleImages && vehicleImages.length > 0 && (
                    <VehicleImageCarousel images={vehicleImages} />
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {application.remarks && application.status === "REJECTED" ? (
            <div className="mt-6">
              <label className="text-sm font-medium mb-2 block">Remarks:</label>
              <div className="text-sm p-2 border rounded bg-muted/30 min-h-[100px]">
                {application.remarks || ""}
              </div>
            </div>
          ) : application.status === "PENDING_FOR_SECURITY_APPROVAL" ? (
            <div className="mt-6">
              <label className="text-sm font-medium mb-2 block">Remarks:</label>
              <Textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Add remarks here..."
                className="min-h-[100px]"
                disabled={application.status !== "PENDING_FOR_SECURITY_APPROVAL"}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {application.status === "PENDING_FOR_SECURITY_APPROVAL"
                  ? "Remarks are required for rejection"
                  : `Previous remarks: ${application.remarks || "None"}`}
              </p>
            </div>
          ) : null}
        </div>

        <DialogFooter className="sticky bottom-0 p-4 border-t bg-background/95 backdrop-blur-sm">
          {application.status === "PENDING_FOR_SECURITY_APPROVAL" ? (
            <div className="flex w-full justify-end gap-4">
              <Button
                variant="destructive"
                onClick={handleReject}
                disabled={isPending}
                className="px-6"
              >
                {isPending ? "Processing..." : "Reject Application"}
              </Button>
              <Button onClick={handleApprove} disabled={isPending} className="px-6">
                {isPending ? "Processing..." : "Approve Application"}
              </Button>
            </div>
          ) : (
            <Button onClick={onClose} className="ml-auto">
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationModal;
