"use client";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { updateProductSchema } from "../utils/zod-schema";
import React, { useRef } from 'react'
import { Button } from '@/components/ui/button';
import { useProducts } from '@/hooks/use-products';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getFileUrl } from '@/app/fileActions';
import Image from 'next/image';

const EditProductDialog = ({productData, isOpen, setOpen}: {productData: any, isOpen: boolean, setOpen: (value: boolean) => void}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { editProduct } = useProducts();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: editProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  const handleUpdateProduct = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;
    const formData = new FormData(formRef.current);

    try {
      const updateData = updateProductSchema.parse(formData);
      mutation.mutate({id: productData.id, data: {...updateData}});
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
              Add data of your product here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateProduct} ref={formRef}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor='title'>Title</Label>
              <Input id="title" name="title" defaultValue={productData.title}/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor='description'>Description</Label>
              <Textarea id="description" name="description" defaultValue={productData.description}/>
            </div>
            {productData.imageUrl && <Image width={100} height={100} src={productData.imageUrl} alt="Product image"/>}
            <div className="grid gap-3">
              <Label htmlFor="img">Image</Label>
              <Input id="img" name="img" type="file"/>
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
  )
}

export default EditProductDialog