import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

export const PaginationControls = ({ prev, next }: { prev: () => void; next: () => void }) => {
  return (
    <div className="w-full pt-2">
      <Pagination className="w-full">
        <PaginationContent className="flex justify-between w-full">
          <PaginationItem className="cursor-pointer" onClick={prev}>
            <PaginationPrevious />
          </PaginationItem>
          <PaginationItem className="cursor-pointer" onClick={next}>
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
