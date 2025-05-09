import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  prev: () => void;
  next: () => void;
  setPage: (page: number) => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export const PaginationControls = ({
  currentPage,
  totalPages,
  prev,
  next,
  setPage,
  hasPrev,
  hasNext
}: PaginationControlsProps) => {
  const getVisiblePages = () => {
    const visiblePages = [];
    const maxVisible = 5;

    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="w-full pt-2">
      <Pagination className="w-full">
        <PaginationContent>
          <PaginationItem className="cursor-pointer select-none">
            <PaginationPrevious
              onClick={hasPrev ? prev : undefined}
              className={!hasPrev ? "opacity-50 cursor-not-allowed" : ""}
              aria-disabled={!hasPrev}
              tabIndex={!hasPrev ? -1 : undefined}
            />
          </PaginationItem>

          {!visiblePages.includes(1) && (
            <>
              <PaginationItem className="cursor-pointer select-none">
                <PaginationLink onClick={() => setPage(1)} isActive={currentPage === 1}>
                  1
                </PaginationLink>
              </PaginationItem>
              {visiblePages[0] > 2 && (
                <PaginationItem className="select-none">
                  <PaginationEllipsis />
                </PaginationItem>
              )}
            </>
          )}

          {visiblePages.map((page) => (
            <PaginationItem key={page} className="cursor-pointer select-none">
              <PaginationLink onClick={() => setPage(page)} isActive={currentPage === page}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {!visiblePages.includes(totalPages) && (
            <>
              {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                <PaginationItem className="select-none">
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem className="cursor-pointer select-none">
                <PaginationLink
                  onClick={() => setPage(totalPages)}
                  isActive={currentPage === totalPages}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          <PaginationItem className="cursor-pointer select-none">
            <PaginationNext
              onClick={hasNext ? next : undefined}
              className={!hasNext ? "opacity-50 cursor-not-allowed" : ""}
              aria-disabled={!hasNext}
              tabIndex={!hasNext ? -1 : undefined}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
