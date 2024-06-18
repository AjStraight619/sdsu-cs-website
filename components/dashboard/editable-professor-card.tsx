"use client"
import { useEffect, useRef, useState } from "react";

import { Textarea } from "../ui/textarea";
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "../ui/dialog"
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileSchema } from "@/lib/schemas";
import { updateProfileCard } from "@/actions/profile-card";
import { getSignedURL } from "@/actions/s3";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import ProfileImage from "../common/profile-image";
import { Button } from "../ui/button";
import SubmitButton2 from "../ui/submit-button2";
import { z } from "zod";
import { Input } from "../ui/input";

import { PencilIcon } from "lucide-react";

type EditableProfessorCardProps = {
  imageUrl: string;
  name: string | null;
  bio: string | null;
  courses?: string[];
};

export default function EditableProfessorCard({ imageUrl, name, bio, courses }: EditableProfessorCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const pathname = usePathname()
  const [previewImageUrl, setPreviewImageUrl] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const renderRef = useRef(0)
  useEffect(() => {
    console.log("This component re rendered: ", renderRef.current++)
  })

  const form = useForm<z.output<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: name ?? "",
      bio: bio ?? "",
    }
  })




  useEffect(() => {
    return () => {
      console.log("revoking url")
      URL.revokeObjectURL(previewImageUrl)
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("files: ", e.target?.files)
    if (e.target.files) {
      const file = e.target.files[0]
      setFile(file)
      const tempUrl = URL.createObjectURL(file)
      setPreviewImageUrl(tempUrl)
      console.log("file input ref: ", fileInputRef.current)

    }
  }



  const action = async (formData: FormData) => {
    // ... call function to update profile card
    /*    const results = await updateProfileCard(formData) */
    const signedUrlResult = await getSignedURL()

    if (signedUrlResult.failure !== undefined) {
      return
    }
    const url = signedUrlResult.success.url

    if (file) {
      formData.append("imageUrl", url)
      formData.append("image", file)
    }

    const result = await updateProfileCard(formData)
    console.log("result from server action: ", result)
  }



  const handleRemoveFile = () => {
    setFile(null)
    URL.revokeObjectURL(previewImageUrl)
    setPreviewImageUrl("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""

    }
    console.log("removing file, file input ref: ", fileInputRef.current)
  }


  if (!pathname.includes("/admin")) return null

  return (

    <Dialog open={isEditing} onOpenChange={setIsEditing}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsEditing(true)} variant='outline' className="absolute top-2 right-2 flex items-center gap-x-1">
          <PencilIcon size={20} />
          <span>Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent>

        <Form {...form}>
          <form className="space-y-6" action={action}>
            <div className="flex items-center gap-x-2">
              <ProfileImage imageUrl={previewImageUrl ? previewImageUrl : imageUrl} />
              <input onChange={handleFileChange} ref={fileInputRef} hidden type="file" accept=".jpg, .jpeg, .png" />
              <Button type="button" onClick={() => fileInputRef?.current?.click()} variant="outline">
                Upload Image
              </Button>
              {file && (
                <Button onClick={() => handleRemoveFile()} type="button" variant="outline">
                  Remove
                </Button>
              )}
            </div>

            <FormField name="name" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField name="bio" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <DialogFooter>
              <SubmitButton2>Submit</SubmitButton2>
            </DialogFooter>

          </form>


        </Form>
      </DialogContent>

    </Dialog>
  );
}


