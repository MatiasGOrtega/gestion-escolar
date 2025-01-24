"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Button } from "../ui/button";
import Link from "next/link";

function PaginationList({ page, count }: { page: number; count: number }) {
  const isFirsPage = page === 1 ? page : page - 1;
  const isLastPage =
    page === Math.ceil(count / ITEM_PER_PAGE) ? page : page + 1;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button asChild disabled={isFirsPage === 1}>
            <Link href={`?page=${isFirsPage}`}>&laquo;</Link>
          </Button>
        </PaginationItem>
        {Array.from({ length: Math.ceil(count / ITEM_PER_PAGE) }, (_, i) => {
          const p = i + 1;
          return (
            <PaginationItem key={p}>
              <Button asChild disabled={p === page}>
                <Link href={`?page=${p}`}>{p}</Link>
              </Button>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <Button
            asChild
            disabled={isLastPage === Math.ceil(count / ITEM_PER_PAGE)}
          >
            <Link href={`?page=${isLastPage}`}>&raquo;</Link>
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationList;
