"use client";

import { PageSizeDropdown } from "@/components/page-size-dropdown";
import {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname } from "next/navigation";

export function NotePagination({
  currentPage,
  perPage,
  hasNextPage,
}: {
  currentPage: number;
  perPage: number;
  hasNextPage: boolean;
}) {
  const pathName = usePathname();
  return (
    <div className="flex relative w-full overflow-auto p-8">
      <Pagination>
        <PaginationContent>
          {currentPage - 1 > 0 && (
            <>
              <PaginationPrevious
                href={`${pathName}/?page=${currentPage - 1}&perPage=${perPage}`}
              />
              <PaginationLink
                href={`${pathName}/?page=${currentPage - 1}&perPage=${perPage}`}
              >
                {currentPage - 1}
              </PaginationLink>
            </>
          )}
          {(currentPage - 1 > 0 || hasNextPage) && (
            <PaginationLink href="#" isActive>
              {currentPage}
            </PaginationLink>
          )}
          {hasNextPage && (
            <>
              <PaginationLink
                href={`${pathName}/?page=${currentPage + 1}&perPage=${perPage}`}
              >
                {currentPage + 1}
              </PaginationLink>
              <PaginationNext
                href={`${pathName}/?page=${currentPage + 1}&perPage=${perPage}`}
              />
            </>
          )}
        </PaginationContent>
      </Pagination>
      <PageSizeDropdown
        currentPage={currentPage}
        perPage={perPage}
      ></PageSizeDropdown>
    </div>
  );
}
