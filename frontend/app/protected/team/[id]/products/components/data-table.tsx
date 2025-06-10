"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Dispatch, SetStateAction } from "react"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pageIndex: number
  setPageIndex: Dispatch<SetStateAction<number>>
  pageSize: number
  totalPages: number
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageIndex,
  setPageIndex,
  pageSize,
  totalPages,
}: DataTableProps<TData, TValue>) {

  console.log('111111',totalPages);
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    pageCount: totalPages ?? -1,
    manualPagination: true,
    state: {
      pagination: {
        pageIndex,
        pageSize,
      }
    },
    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;
      setPageIndex(next.pageIndex);
    },
  })

  return (
    <>
    <div className="rounded-md border w-auto">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPageIndex((p) => Math.max(p - 1, 0))}
              className={pageIndex === 0 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {Array.from({ length: totalPages ?? 1 }).map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                isActive={i === pageIndex}
                onClick={() => setPageIndex(i)}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() =>
                setPageIndex((p) =>
                  p + 1 < (totalPages ?? 1) ? p + 1 : p
                )
              }
              className={
                pageIndex + 1 >= (totalPages ?? 1)
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  )
}