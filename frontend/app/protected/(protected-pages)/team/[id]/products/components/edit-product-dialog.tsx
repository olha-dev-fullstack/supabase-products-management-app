/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { uploadFile } from "@/app/fileActions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useProducts } from "@/hooks/use-products";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { FormEvent, useRef, useState } from "react";
import { updateProductSchema } from "../utils/zod-schema";
import { toast } from "sonner";

const EditProductDialog = ({
  productData,
  isOpen,
  setOpen,
}: {
  productData: any;
  isOpen: boolean;
  setOpen: (value: boolean) => void;
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { editProduct } = useProducts();
  const queryClient = useQueryClient();
  const [image, setImage] = useState(productData.imageUrl);
  const mutation = useMutation({
    mutationFn: editProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleFileClear = () => {
    setImage(null);
    const fileInput = formRef.current?.querySelector('input[name="imageFile"]') as HTMLInputElement | null;
    if (fileInput) {
      fileInput.value = "";
    }
  };
  const handleUpdateProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;
    const formData = new FormData(formRef.current);

    try {
      let updateData = updateProductSchema.parse(formData);
      if (updateData.imageFile) {
        const imageUrl = await uploadFile(updateData.imageFile);
        updateData = {
          ...updateData,
          imageUrl,
        };
      }
      mutation.mutate({ id: productData.id, data: { ...updateData } });
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
          <DialogTitle>Edit product</DialogTitle>
          <DialogDescription>
            Add data of your product here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleUpdateProduct} ref={formRef}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" defaultValue={productData.title} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={productData.description}
              />
            </div>
            {image && (
              <div className="flex gap-2">
                <Image
                  width={100}
                  height={100}
                  src={image}
                  alt="Product image"
                />
                <Button variant="destructive" onClick={handleFileClear}>
                  Remove
                </Button>
              </div>
            )}
            <div className="grid gap-3">
              <Label htmlFor="imageFile">Image</Label>
              <Input
                id="imageFile"
                name="imageFile"
                type="file"
                onChange={imageChange}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;
