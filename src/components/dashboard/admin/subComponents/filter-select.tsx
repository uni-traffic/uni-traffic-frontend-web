import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { SlidersHorizontal } from "lucide-react";

interface FilterSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
}

const FilterSelect = ({
  value,
  onValueChange,
  options,
  placeholder = "Filter"
}: FilterSelectProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          <SelectValue placeholder={placeholder} />
        </div>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FilterSelect;
