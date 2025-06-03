import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

import React from 'react'
import { Button } from '@/components/ui/button';

const EditProductDialog = ({productData, isOpen, setOpen}: {productData: any, isOpen: boolean, setOpen: (value: boolean) => void}) => {
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
          <form>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor='title'>Title</Label>
              <Input id="title" name="title" defaultValue={productData.title}/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor='description'>Description</Label>
              <Textarea id="description" name="description" defaultValue={productData.description}/>
            </div>
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