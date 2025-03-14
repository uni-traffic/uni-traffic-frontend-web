import type { ViolationRecord } from "@/lib/types";

interface ReceiptProps {
  violation: ViolationRecord;
  paidAmount: number;
  referenceNo: string;
}

const Receipt = ({ violation, paidAmount, referenceNo }: ReceiptProps) => {
  return (
    <div className=" bg-white shadow-md max-w-sm mx-auto">
      <div className="p-4 border bg-white shadow-md">
        <p className="text-center text-gray-600">Payment Received for</p>
        <img src="/neu-logo.png" alt="NEU Logo" className="w-[60px] h-[60px] mx-auto" />
        <h2 className="text-center font-bold text-lg">New Era University</h2>
        <hr className="my-2" />
        <div className="text-sm space-y-1">
          <div className="flex justify-between">
            <strong>Balance:</strong>
            <span>PHP {violation.violation?.penalty.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <strong>Amount Paid:</strong>
            <span>PHP {paidAmount.toLocaleString()}</span>
          </div>
          <div className="flex flex-col">
            <strong>Violation ID:</strong>
            <span>{violation.id}</span>
          </div>
          <div className="flex justify-between">
            <strong>Violation Info:</strong>
            <span>{violation.violation?.category}</span>
          </div>
          <div className="flex justify-between">
            <strong>Paid by:</strong>
            <span>
              {violation.user?.firstName} {violation.user?.lastName}
            </span>
          </div>
          <div className="flex justify-between">
            <strong>Date/Time:</strong>
            <span>{new Date().toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <strong>Reference No.:</strong>
            <span>{referenceNo}</span>
          </div>
          <div className="flex justify-between">
            <strong>Cashier:</strong>
            <span>Jane Doe</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
