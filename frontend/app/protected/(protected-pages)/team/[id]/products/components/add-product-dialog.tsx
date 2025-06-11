"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useProducts } from "@/hooks/use-products";
import { createProductSchema } from "../utils/zod-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useRef, useState } from "react";
import { toast } from "sonner";
import { uploadFile } from "@/app/fileActions";

export function AddProductDialog() {
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);
  const { createProduct } = useProducts();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
  const handleCreateProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;
    const formData = new FormData(formRef.current);

    try {
      let createData = createProductSchema.parse(formData);
      if (createData.imageFile) {
        const imageUrl = await uploadFile(createData.imageFile);
        createData = {
          ...createData,
          imageUrl
        }
      }
      mutation.mutate(createData);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setOpen(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="w-fit">
        <Button variant="default">Add Product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add product</DialogTitle>
          <DialogDescription>
            Add data of your product here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleCreateProduct} ref={formRef}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="img">Image</Label>
              <Input id="imageFile" name="imageFile" type="file" />
            </div>
          </div>
          <DialogFooter className="mt-3">
            <Button type="submit">Save changes</Button>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
