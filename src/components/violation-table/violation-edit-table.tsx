import type { Violation } from "@/lib/types";
import { format } from "date-fns";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import ViolationEditModal from "./violation-edit-modal";
import ViolationDeleteModal from "./violation-delete-modal";
import { MoreHorizontal } from "lucide-react";

interface ViolationsTableProps {
  violations: Violation[];
  onUpdateViolation: (id: string, updates: Partial<Violation>) => void;
}

const ViolationsEditTable = ({ violations, onUpdateViolation }: ViolationsTableProps) => {
  const [isViolationEditModalOpen, setIsViolationEditModalOpen] = useState(false);
  const [isViolationDeleteModalOpen, setIsViolationDeleteModalOpen] = useState(false);
  const [selectedViolation, setSelectedViolation] = useState<Violation | null>(null);

  const handleEditClick = (violation: Violation) => {
    setSelectedViolation(violation);
    setIsViolationEditModalOpen(true);
  };

  const handleUpdateViolation = (id: string, updates: Partial<Violation>) => {
    onUpdateViolation(id, updates);
  };

  const handleDeleteClick= (violation: Violation) => {
    setIsViolationDeleteModalOpen(true);
    setSelectedViolation(violation);
  };

  return (
    <>
      <div className="w-full relative rounded-md border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
          <tr className="border-b bg-muted/50">
            <th className="py-3 px-6 text-left font-medium">ID</th>
            <th className="py-3 px-6 text-left font-medium w-[20rem]">Violation</th>
            <th className="py-3 px-6 text-left font-medium w-[15rem]">Category</th>
            <th className="py-3 px-6 text-left font-medium w-[10rem]">Penalty</th>
            <th className="py-3 px-6 text-center font-medium" />
          </tr>
          </thead>
          <tbody className="divide-y">
            {violations.map((record) => {

              return (
                <tr key={record.id} className="bg-card hover:bg-muted/50 transition-colors">
                  <td className="py-4 px-6 font-bold">{record.id}</td>
                  <td className="py-4 px-6">{record.violationName}</td>
                  <td className="py-4 px-6">{record.category}</td>
                  <td className="py-4 px-6">{record.penalty}</td>
                  <td className="py-4 px-6 text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 rounded hover:bg-muted">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditClick(record)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteClick(record)}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  </td>
                </tr>
              );
            })}
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

export default ViolationsEditTable;
