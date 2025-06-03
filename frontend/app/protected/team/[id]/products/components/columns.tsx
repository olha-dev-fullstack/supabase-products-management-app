"use client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import RowActionsMenu from "./row-actions-menu";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) =>
      format(new Date(row.getValue("createdAt")), "yyyy-MM-dd"),
  },
  {
    id: "actions",
    cell: ({row}) => <RowActionsMenu row={row} />
  },
];
