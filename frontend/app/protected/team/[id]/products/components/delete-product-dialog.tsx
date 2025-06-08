import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StatusEnum, useProducts } from "@/hooks/use-products";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const DeleteProductDialog = ({
  productId,
  isOpen,
  setOpen,
}: {
  productId: string;
  isOpen: boolean;
  setOpen: (value: boolean) => void;
}) => {
  const { editProduct } = useProducts();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () =>
      editProduct({ id: productId, data: { status: StatusEnum.DELETED } }),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  const handleDeleteProduct = () => {
    try {
      mutation.mutate();
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setOpen(false);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            product
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={handleDeleteProduct}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProductDialog;
