'use server';
import { createClient } from "@/lib/supabase/server";


export const uploadFile = async (file: File) => {
  const supabase = await createClient();
  
  const fileExt = file.name.split('.').pop()
  const filePath = `public/${file.name}-${Math.random()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from("images")
    .upload(filePath, file);
  if (error) {
    
    throw error;
  }
  
  return filePath;
};

export const getFileUrl = async (filePath: string) => {
  const supabase =  await createClient();
  if(!filePath) return null;
  const { data, error} = await supabase.storage
    .from("images")
    .createSignedUrl(filePath, 3600);
    console.log("retrieve url error", error, filePath);
    
  return data?.signedUrl;
};
