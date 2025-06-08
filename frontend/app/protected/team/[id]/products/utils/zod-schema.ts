import {zfd } from 'zod-form-data';
import { z } from 'zod/v4';
export const createProductSchema = zfd.formData({
    title: zfd.text(z.string().min(1).max(150)),
    description: zfd.text(z.string().max(250).optional()),
    imageFile: zfd.file(z.instanceof(File).optional())
  });

export const updateProductSchema = zfd.formData({
    title: zfd.text(z.string().min(1).max(150)).optional(),
    status: zfd.text(z.enum(["Active", "Draft"])).optional(),
    description: zfd.text(z.string().max(250)).optional(),
    imageFile: zfd.file(z.instanceof(File).optional())
})