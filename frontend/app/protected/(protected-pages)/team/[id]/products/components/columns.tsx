"use client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import RowActionsMenu from "./row-actions-menu";
import { Badge } from "@/components/ui/badge";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({row}) => {
      const status = row.getValue("status") as string;
      return <Badge variant={status === "Active" ? "default" : "secondary"}>{status}</Badge>
    }
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
