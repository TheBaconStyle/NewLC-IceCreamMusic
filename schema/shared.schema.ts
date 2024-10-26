import { z } from "zod";

export const fileSchema = z.any().refine((file: File) => {
  return file instanceof File;
});

export const stringAsDateSchema = z.string().refine((value) => {
  try {
    const date = new Date(value);
    return date instanceof Date && !isNaN(date.getTime());
  } catch (e) {
    return false;
  }
});
