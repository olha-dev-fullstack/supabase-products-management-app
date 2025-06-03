import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import DeleteProductDialog from "./delete-product-dialog";
import EditProductDialog from "./edit-product-dialog";

export const RowActionsMenu = ({ row }: {row: Row<any>}) => {
    const product = row.original;
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [productStatus, changeProductStatus] = useState(product.status)
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => changeProductStatus(productStatus === "Active" ? "Draft" : "Active")}>
              {productStatus === "Active" ? "Unpublish" : "Publish"}
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
              Edit product
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
              Delete product
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <EditProductDialog
          productData={product}
          isOpen={isEditDialogOpen}
          setOpen={setIsEditDialogOpen}
        />
        <DeleteProductDialog
          isOpen={isDeleteDialogOpen}
          setOpen={setIsDeleteDialogOpen}
        />
      </>
    );
}

export default RowActionsMenu;