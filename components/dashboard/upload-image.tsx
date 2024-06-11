"use client"
import { getSignedURL } from "@/actions/s3"
import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FileSchema } from "@/lib/schemas"
import { useRef } from "react"

export default function UploadImage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const form = useForm({
    resolver: zodResolver(FileSchema),
    defaultValues: {
      file: null
    }
  })
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const signedUrlResult = await getSignedURL()
      console.log("Signed url result: ", signedUrlResult)
      if (signedUrlResult && signedUrlResult.success) {
        const url = signedUrlResult.success.url
        console.log("signed url: ", url)
      } else {
        console.error("Signed URL result does not contain success property.")
      }
    } catch (error) {
      console.error("Error fetching signed URL:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit}
    >
      <Button type='submit'>
        Check Signed Url
      </Button>

    </form>
  )
}

