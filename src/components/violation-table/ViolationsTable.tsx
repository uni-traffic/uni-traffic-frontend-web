import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ViolationStatusBadge } from "@/components/violation-table/ViolationStatusBadge";
import type { Violation } from "@/lib/types";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import ViolationDeleteModal from "./ViolationDeleteModal";
import ViolationEditModal from "./ViolationEditModal";

interface ViolationsTableProps {
  violations: Violation[];
}

const ViolationsTable = ({ violations }: ViolationsTableProps) => {
  const [isViolationEditModalOpen, setIsViolationEditModalOpen] = useState(false);
  const [isViolationDeleteModalOpen, setIsViolationDeleteModalOpen] = useState(false);
  const [selectedViolation, setSelectedViolation] = useState<Violation | null>(null);

  const handleEditClick = (violation: Violation) => {
    setSelectedViolation(violation);
    setIsViolationEditModalOpen(true);
  };

  const handleDeleteClick = (violation: Violation) => {
    setIsViolationDeleteModalOpen(true);
    setSelectedViolation(violation);
  };

  return (
    <>
      <div className="w-full relative rounded-md border overflow-hidden overflow-x-auto">
        <table className="w-full text-sm table-fixed">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="py-3 px-4 text-left font-medium w-[300px] box-content">ID</th>
              <th className="py-3 px-4 text-left font-medium w-[250px] box-content">Violation</th>
              <th className="py-3 px-4 text-left font-medium w-[180px] box-content hidden lg:table-cell">
                Category
              </th>
              <th className="py-3 px-4 text-left font-medium w-[120px] box-content hidden md:table-cell">
                Penalty
              </th>
              <th className="py-3 px-4 text-left font-medium w-[100px] box-content">Status</th>
              <th className="py-3 px-4 text-center font-medium w-[60px] box-content" />
            </tr>
          </thead>
          <tbody className="divide-y">
            {violations.map((record) => (
              <tr key={record.id} className="bg-card hover:bg-muted/50 transition-colors">
                <td className="py-4 px-4 w-[300px] font-mono text-xs truncate box-content">
                  {record.id}
                </td>
                <td
                  className="py-4 px-4 w-[250px] truncate box-content"
                  title={record.violationName}
                >
                  {record.violationName}
                </td>
                <td
                  className="py-4 px-4 w-[180px] truncate box-content hidden lg:table-cell"
                  title={record.category}
                >
                  {record.category}
                </td>
                <td className="py-4 px-4 w-[120px] truncate box-content hidden md:table-cell">
                  {record.penalty}
                </td>
                <td className="py-4 px-4 w-[100px] box-content">
                  <ViolationStatusBadge status={record.isDeleted} />
                </td>
                <td className="py-4 px-4 text-center w-[60px] box-content">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 rounded hover:bg-muted" type="button">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditClick(record)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteClick(record)}
                        className="text-red-600 focus:text-red-400"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ViolationEditModal
        isOpen={isViolationEditModalOpen}
        onClose={() => setIsViolationEditModalOpen(false)}
        violation={selectedViolation}
      />
      <ViolationDeleteModal
        isOpen={isViolationDeleteModalOpen}
        onClose={() => setIsViolationDeleteModalOpen(false)}
        violation={selectedViolation}
      />
    </>
  );
};

export default ViolationsTable;
