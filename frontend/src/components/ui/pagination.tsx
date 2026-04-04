"use client";

import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isFetching?: boolean;
  showPageInfo?: boolean;
  showPageNumbers?: boolean;
  maxPageNumbers?: number;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  isFetching = false,
  showPageInfo = true,
  showPageNumbers = true,
  maxPageNumbers = 5,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    
    if (totalPages <= maxPageNumbers) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= maxPageNumbers - 2) {
        for (let i = 1; i <= maxPageNumbers; i++) {
          pages.push(i);
        }
        pages.push("...");
      } else if (currentPage >= totalPages - 2) {
        pages.push("...");
        for (let i = totalPages - maxPageNumbers + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
      }
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === 1 || isFetching}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </Button>
      
      {showPageNumbers && (
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => (
            page === "..." ? (
              <span key={`ellipsis-${index}`} className="px-2 text-gray-400">...</span>
            ) : (
              <Button
                key={page}
                variant={currentPage === page ? "primary" : "ghost"}
                size="sm"
                onClick={() => onPageChange(page)}
                disabled={isFetching}
              >
                {page}
              </Button>
            )
          ))}
        </div>
      )}
      
      {showPageInfo && (
        <span className="text-sm text-gray-600 px-2">
          Page {currentPage} of {totalPages}
        </span>
      )}
      
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === totalPages || isFetching}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
}
