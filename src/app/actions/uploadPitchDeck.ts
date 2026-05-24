"use server"

import { getSupabase } from "@/lib/supabase"

export async function uploadPitchDeck(formData: FormData) {
  const file = formData.get("file") as File
  if (!file) {
    throw new Error("No file provided")
  }

  const supabase = getSupabase()
  const bucketName = "projects"

  // Check if bucket exists
  const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()
  if (bucketsError) {
    throw new Error(`Failed to list buckets: ${bucketsError.message}`)
  }

  const bucketExists = buckets.some((b) => b.name === bucketName)
  if (!bucketExists) {
    const { error: createError } = await supabase.storage.createBucket(bucketName, {
      public: true,
      fileSizeLimit: 52428800, // 50MB
    })
    if (createError) {
      throw new Error(`Failed to create bucket: ${createError.message}`)
    }
  }

  // Generate a unique filename
  const ext = file.name.split(".").pop()
  const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${ext}`

  // Upload file
  const { data, error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(filename, file, {
      cacheControl: "3600",
      upsert: false,
    })

  if (uploadError) {
    throw new Error(`Failed to upload file: ${uploadError.message}`)
  }

  // Get public URL
  const { data: publicUrlData } = supabase.storage.from(bucketName).getPublicUrl(filename)

  return publicUrlData.publicUrl
}
