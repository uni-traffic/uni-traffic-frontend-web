"use client";

import { Button } from "@/components/ui/button";
import type { StickerApplicationPayment } from "@/lib/types";
import { format } from "date-fns";
import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";
import { useRef } from "react";

export const StickerApplicationReceipt = ({
  stickerApplicationPayment
}: {
  stickerApplicationPayment: StickerApplicationPayment | null;
}) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = async () => {
    const element = printRef.current;
    if (!element) return;

    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      unit: "px",
      format: [250, 250]
    });

    pdf.addImage(data, "PNG", 0, 0, 250, 250);
    pdf.save(`${stickerApplicationPayment?.id}.pdf`);
  };

  return (
    <div className="flex flex-col space-y-8 justify-center items-center px-4">
      <div className="w-[23rem]" ref={printRef}>
        <div className="p-4 border">
          <div className="flex flex-col space-y-3">
            <img src="/neu-logo.png" alt="NEU Logo" className="w-[60px] h-[60px] mx-auto" />
            <h2 className="text-center font-bold text-lg">New Era University</h2>
          </div>
          <hr className="my-2" />
          <div className="text-sm space-y-4 mt-4">
            <div className="flex justify-between">
              <strong>Reference No.:</strong>
              <span>{stickerApplicationPayment?.id}</span>
            </div>
            <div className="flex justify-between">
              <strong>Date/Time:</strong>
              {stickerApplicationPayment?.date ? (
                <span>
                  {format(new Date(stickerApplicationPayment?.date), "MMMM dd, yyyy hh:mm a")}
                </span>
              ) : null}
            </div>
            <div className="flex justify-between">
              <strong>Cashier:</strong>
              <span>{`${stickerApplicationPayment?.cashier?.firstName} ${stickerApplicationPayment?.cashier?.lastName}`}</span>
            </div>
            <div className="flex justify-between">
              <strong>Description:</strong>
              <span>NEU-VPS</span>
            </div>
            <div className="flex justify-between">
              <strong>Amount Due:</strong>
              <span>PHP {stickerApplicationPayment?.amountDue.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <strong>Cash Tendered:</strong>
              <span>PHP {stickerApplicationPayment?.cashTendered.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <strong>Change:</strong>
              <span>PHP {stickerApplicationPayment?.change.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-end">
        <Button className="w-full" onClick={handlePrint}>
          Print
        </Button>
      </div>
    </div>
  );
};
