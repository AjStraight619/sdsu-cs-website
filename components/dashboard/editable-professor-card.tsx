'use client';
import { useEffect, useRef, useState } from 'react';

import { Textarea } from '../ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '../ui/dialog';
import { usePathname } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProfileSchema } from '@/lib/schemas';
import { updateProfileCard } from '@/actions/profile-card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import ProfileImage from '../common/profile-image';
import { Button } from '../ui/button';
import SubmitButton2 from '../ui/submit-button2';
import { z } from 'zod';
import { Input } from '../ui/input';

import { PencilIcon } from 'lucide-react';
import { ErrorMessage, SuccessMessage } from '../ui/form-messages';
import { useUploadThing } from '@/lib/uploadthing';
import { toast } from 'sonner';
import { Progress } from '../ui/progress';

type EditableProfessorCardProps = {
  imageUrl: string;
  firstName: string | null;
  lastName: string | null;
  bio: string | null;
  courses?: string[];
  isEditable: boolean;
  userId: string;
};

export default function EditableProfessorCard({
  imageUrl,
  firstName,
  lastName,
  bio,
  courses,
  userId,
}: EditableProfessorCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const pathname = usePathname();
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [error, setError] = useState('');
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  // const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const renderRef = useRef(0);

  const [progess, setProgress] = useState<number>(0);

  const { startUpload, isUploading } = useUploadThing('imageUploader', {
    onClientUploadComplete: () => {
      setFiles([]);
      toast.dismiss();
      setProgress(0);
    },
    onUploadError: () => {
      alert('error occurred while uploading');
    },
    onUploadBegin: () => {
      // alert('upload has begun');
      toast.loading('Uploading image');
    },
    onUploadProgress: p => {
      // toast.loading('Uploading image');
      setProgress(p);
    },
  });
  useEffect(() => {
    console.log('This component re rendered: ', renderRef.current++);
  });

  const form = useForm<z.output<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      firstName: firstName ?? '',
      lastName: lastName ?? '',
      bio: bio ?? '',
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('files: ', e.target?.files);
    if (e.target.files) {
      const file = e.target.files[0];
      const tempUrl = URL.createObjectURL(file);
      setPreviewImageUrl(tempUrl);
      console.log('file input ref: ', fileInputRef.current);
      setFiles(prevFiles => [...prevFiles, file]);
    }
  };

  // const computeSHA256 = async (file: File) => {
  //   const buffer = await file.arrayBuffer();
  //   const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  //   const hashArray = Array.from(new Uint8Array(hashBuffer));
  //   const hashHex = hashArray.map(b => b.toString().padStart(2, '0')).join('');
  //   return hashHex;
  // };

  const action = async (formData: FormData) => {
    if (files[0]) {
      await startUpload(files);
    }
    const { success, failure } = await updateProfileCard(formData);
    if (failure) {
      // setError(failure);
      toast.error('Failed to update profile');
    } else {
      // setSuccess(success);
      toast.success('Profile updated successfully');
    }
  };

  const handleRemoveFile = () => {
    setFiles([]);
    URL.revokeObjectURL(previewImageUrl);
    setPreviewImageUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    console.log('removing file, file input ref: ', fileInputRef.current);
  };

  const handleOpenChange = (open: boolean) => {
    setIsEditing(open);
    setSuccess('');
    setError('');
  };

  if (!pathname.includes('/admin')) return null;

  return (
    <Dialog open={isEditing} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setIsEditing(true)}
          variant="outline"
          className="absolute top-2 right-2 flex items-center gap-x-1"
        >
          <PencilIcon size={15} />
          <span>Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form className="space-y-6" action={action}>
            <div className="flex items-center gap-x-2">
              <ProfileImage
                imageUrl={previewImageUrl ? previewImageUrl : imageUrl}
              />

              <input
                onChange={handleFileChange}
                ref={fileInputRef}
                hidden
                multiple={false}
                type="file"
                accept=".jpg, .jpeg, .png"
              />

              <div className="flex flex-col gap-y-2">
                <div className="flex flex-row items-center gap-x-2">
                  {files.length === 0 && (
                    <Button
                      type="button"
                      onClick={() => fileInputRef?.current?.click()}
                      variant="outline"
                    >
                      Choose Image
                    </Button>
                  )}
                  {files.length > 0 && (
                    <Button
                      onClick={() => handleRemoveFile()}
                      type="button"
                      variant="outline"
                    >
                      Remove
                    </Button>
                  )}
                </div>
                {success && <SuccessMessage message={success} />}
                {error && <ErrorMessage message={error} />}
              </div>
            </div>
            <Progress value={progess} />
            <FormField
              name="firstName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="lastName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="bio"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <SubmitButton2 isUploading={isUploading}>Submit</SubmitButton2>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
