"use server"

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!
  }
})
export async function getSignedURL() {
  // TODO: Remember to implement auth and return a failure object if admin is not signed in.

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: "test-file",
  })
  const signedUrl = await getSignedUrl(s3, putObjectCommand, {
    expiresIn: 3600,
  })
  console.log("signed url: ", signedUrl)
  return { success: { url: signedUrl } }
}



