"use server"

import { auth } from "@/auth"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!
  }
})
const MAX_FILE_SIZE = 1024 * 1024 * 10
export async function getSignedURL(type: string, size: number, checksum: string) {
  // TODO: Remember to implement auth and return a failure object if admin is not signed in.
  const session = await auth()
  if (!session || !session.user) {
    return { failure: "Not authenticated" }
  }
  if (size > MAX_FILE_SIZE) {
    return {
      failure: "File too large"
    }
  }

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: `profile-image-${session.user.id}`,
    // ContentType: type,
    // ContentLength: size,
    // ChecksumSHA256: checksum
  })

  const signedUrl = await getSignedUrl(s3, putObjectCommand, {
    expiresIn: 3600,
  })

  console.log("signed url: ", signedUrl)
  return { success: { url: signedUrl } }
}



