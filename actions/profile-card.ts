"use server"

import { ProfileSchema } from "@/lib/schemas"


export async function updateProfileCard(data: FormData) {
  const formData = Object.fromEntries(data)
  const parsed = ProfileSchema.safeParse(formData)

  console.log("Parsed data: ", parsed)

  return parsed
  // Update profile here
  // TODO: Check if formdata contains a file, this will be an image file that we need to store in s3 and then save the url from s3 to db

}
