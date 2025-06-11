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
import { StatusEnum, useProducts } from "@/hooks/use-products";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const RowActionsMenu = ({ row }: { row: Row<any> }) => {
  const product = row.original;
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { editProduct } = useProducts();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: editProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const handleChangeProductStatus = () => {
    const statusToSet =
      product.status === StatusEnum.ACTIVE ? StatusEnum.DRAFT : StatusEnum.ACTIVE;
    try {
      mutation.mutate({ id: product.id, data: { status: statusToSet } });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

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
          <DropdownMenuItem onClick={handleChangeProductStatus}>
            {product.status === "Active" ? "Unpublish" : "Publish"}
          </DropdownMenuItem>

          <DropdownMenuItem
            disabled={product.status === StatusEnum.ACTIVE}
            onClick={() => setIsEditDialogOpen(true)}
          >
            Edit product
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-red-500"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
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
        productId={product.id}
        isOpen={isDeleteDialogOpen}
        setOpen={setIsDeleteDialogOpen}
      />
    </>
  );
};

export default RowActionsMenu;
