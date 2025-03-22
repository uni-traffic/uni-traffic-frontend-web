import React from "react";
import { X } from "lucide-react";
import { toast } from "sonner";

interface VehicleApplicationReviewModalProps {
  isOpen: boolean;
  application: any | null;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const VehicleApplicationReviewModal = ({
  isOpen,
  application,
  onClose,
  onApprove,
  onReject,
}: VehicleApplicationReviewModalProps) => {
  if (!isOpen || !application) return null;

  const handleApprove = () => {
    onApprove(application.id);
    toast.success("Application approved successfully");
    onClose();
  };
  
  const handleReject = () => {
    onReject(application.id);
    toast.error("Application rejected successfully");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)]  flex justify-center items-center z-50">
      <div className="bg-white flex-row w-[80rem] h-[40rem] p-8 rounded-lg shadow relative ">
        <div className="flex w-[100%] h-[10%] ">
          <div className="w-[33%] "></div>
          <div className="w-[33%] font-bold text-2xl text-center ">Vehicle Application Review</div>
          <div className="w-[33%] flex justify-end">
            <button><X className="w-6 h-6 mb-7 text-black hover:text-gray-700" onClick={onClose}/></button>
          </div>
        </div>
        <div className="flex w-[100%] h-[90%]">
          <div className="flex flex-col px-4 gap-3 w-[33%] ">
            <div className=" flex flex-col h-[50%] w-[100%] border border-black rounded-sm">
              <div className="flex w-[100%] h-[20%] justify-center items-center font-bold text-sm">Staff/Student Form</div>
              <div className="flex flex-col mb-4 w-[100%] h-[20%]">
                <label className="text-sm ml-2 text-gray-500">School ID</label>
                <input type="text" value={application.schoolMember.schoolId || "-"} className="px-2 py-1 border rounded-md text-md font-semibold" readOnly />
              </div>
              <div className="mb-4 flex w-[100%] h-[20%]">
                <div className="flex flex-col w-[100%] h-[20%] ">
                  <label className="text-sm ml-2 text-gray-500">First Name</label>
                  <input type="text" value={application.schoolMember.firstName || "-"} className="px-2 py-1 border rounded-md text-md font-semibold w-[11rem]" readOnly />
                </div><div className="flex flex-col w-[100%] h-[20%] ">
                  <label className="text-sm ml-2 text-gray-500">Last Name</label>
                  <input type="text" value={application.schoolMember.lastName || "-"} className="px-2 py-1 border rounded-md text-md font-semibold w-[12rem]" readOnly />
                </div>
              </div>
              <div className="flex flex-col mb-4 w-[100%] h-[20%]">
                <label className="text-sm ml-2 text-gray-500">Type</label>
                <input type="text" value={application.schoolMember.type || "-"} className="px-2 py-1 border rounded-md text-md font-semibold" readOnly />
              </div>
              <div className="flex w-[100%] h-[20%] mb-4 justify-between items-center">
                <button className="bg-black text-white px-4 py-1 rounded-md text-sm ml-2 font-semibold hover:bg-gray-800">Preview School Credentials</button>
                <a href="https://imglink123.test.com" className="text-blue-500 underline text-sm mr-2">Image Link</a>
              </div>
            </div>
            <div className=" flex flex-col h-[50%] w-[100%] border border-black rounded-sm">
              <div className="flex w-[100%] h-[20%] justify-center items-center font-bold text-sm">Driver Form</div>
              <div className="flex flex-col mb-4 w-[100%] h-[20%]">
                <label className="text-sm ml-2 text-gray-500">First Name</label>
                <input type="text" value={application.driver.firstName || "-"} className="px-2 py-1 border rounded-md text-md font-semibold" readOnly />
              </div>
              <div className="flex flex-col mb-4 w-[100%] h-[20%]">
                <label className="text-sm ml-2 text-gray-500">Last Name</label>
                <input type="text" value={application.driver.lastName || "-"} className="px-2 py-1 border rounded-md text-md font-semibold" readOnly />
              </div>
              <div className="flex flex-col mb-4 w-[100%] h-[20%]">
                <label className="text-sm ml-2 text-gray-500">License ID</label>
                <input type="text" value={application.driver.licenseId || "-"} className="px-2 py-1 border rounded-md text-md font-semibold" readOnly />
              </div>
              <div className="flex w-[100%] h-[20%] mb-4 justify-between items-center">
                <button className="bg-black text-white px-4 py-1 rounded-md text-sm ml-2 font-semibold hover:bg-gray-800">Preview License Image</button>
                <a href="https://imglink123.test.com" className="text-blue-500 underline text-sm mr-2">Image Link</a>
              </div>
            </div>
          </div>
          <div className="w-[33%] h-[102.5%] border border-black rounded-sm">
            <div className="flex w-[100%] h-[8%] justify-center items-center font-bold text-sm">Vehicle Form</div>
            <div className="flex flex-col mb-2 w-[100%] h-[9.09090909091%]">
              <label className="text-sm ml-2 text-gray-500">Make</label>
              <input type="text" value={application.vehicle.make ||"-"} className="px-2 py-1 border rounded-md text-md font-semibold" readOnly />
            </div>
            <div className="flex flex-col mb-2 w-[100%] h-[9.09090909091%]">
              <label className="text-sm ml-2 text-gray-500">Series</label>
              <input type="text" value={application.vehicle.series ||"-"} className="px-2 py-1 border rounded-md text-md font-semibold" readOnly />
            </div>
            <div className="flex flex-col mb-2 w-[100%] h-[9.09090909091%]">
              <label className="text-sm ml-2 text-gray-500">Type</label>
              <input type="text" value={application.vehicle.type ||"-"} className="px-2 py-1 border rounded-md text-md font-semibold" readOnly />
            </div>
            <div className="flex flex-col mb-2 w-[100%] h-[9.09090909091%]">
              <label className="text-sm ml-2 text-gray-500">Model</label>
              <input type="text" value={application.vehicle.model ||"-"} className="px-2 py-1 border rounded-md text-md font-semibold" readOnly />
            </div>
            <div className="flex flex-col mb-2 w-[100%] h-[9.09090909091%]">
              <label className="text-sm ml-2 text-gray-500">License Plate</label>
              <input type="text" value={application.vehicle.licensePlate ||"-"} className="px-2 py-1 border rounded-md text-md font-semibold" readOnly />
            </div>
            <div className="flex w-[100%] h-[3%] mb-6 mt-5 justify-between items-center">
              <button className="bg-black text-white px-4 py-1 rounded-md text-sm ml-2 font-semibold w-[65%] hover:bg-gray-800">Preview Certificate of Registration</button>
              <a href="https://imglink123.test.com" className="text-blue-500 underline text-sm mr-2">Image Link</a>
            </div>
            <div className="flex w-[100%] h-[3%] mb-6 justify-between items-center">
              <button className="bg-black text-white px-4 py-1 rounded-md text-sm ml-2 font-semibold w-[65%] hover:bg-gray-800">Preview Original Receipt</button>
              <a href="https://imglink123.test.com" className="text-blue-500 underline text-sm mr-2">Image Link</a>
            </div>
            <div className="flex w-[100%] h-[3%] mb-6 justify-between items-center">
              <button className="bg-black text-white px-4 py-1 rounded-md text-sm ml-2 font-semibold w-[65%] hover:bg-gray-800">Preview Vehicle Front Image</button>
              <a href="https://imglink123.test.com" className="text-blue-500 underline text-sm mr-2">Image Link</a>
            </div>
            <div className="flex w-[100%] h-[3%] mb-6 justify-between items-center">
              <button className="bg-black text-white px-4 py-1 rounded-md text-sm ml-2 font-semibold w-[65%] hover:bg-gray-800">Preview Vehicle Side Image</button>
              <a href="https://imglink123.test.com" className="text-blue-500 underline text-sm mr-2">Image Link</a>
            </div>
            <div className="flex w-[100%] h-[3%] mb-2 justify-between items-center">
              <button className="bg-black text-white px-4 py-1 rounded-md text-sm ml-2 font-semibold w-[65%] hover:bg-gray-800">Preview Vehicle Back Image</button>
              <a href="https://imglink123.test.com" className="text-blue-500 underline text-sm mr-2">Image Link</a>
            </div>
          </div>
          <div className="flex flex-col px-4 gap-3 w-[33%] h-[102.5%]">
            <div className=" flex flex-col h-[50%] w-[100%] ">
            <img
              src="/driverLicense.jpg"
              alt="Driver License"
              className="object-cover h-full w-full"
            />
            </div>
            <div className=" flex flex-col h-[50%] w-[100%] border border-black rounded-sm gap-2">
              <div className="flex flex-col w-[95%] h-[90%] mt-3 ml-2 font-bold text-sm">Remarks:
                <textarea
                  placeholder="Add remarks here..."
                  className="w-full border p-2 rounded-md h-32"
                ></textarea>
              </div>
              <div className="flex w-[100%] h-[20%] mb-4 justify-between items-center">
                <button onClick={handleReject} className="bg-red-500 text-white px-4 py-1 rounded-md text-sm ml-2 font-semibold hover:bg-red-400">Reject Application</button>
                <button 
                  onClick={handleApprove} 
                  className="bg-green-500 text-white px-4 py-1 rounded-md text-sm mr-2 font-semibold hover:bg-green-400">Approve Application</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleApplicationReviewModal;
