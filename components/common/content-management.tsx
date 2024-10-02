'use client';

import { useEffect, useRef, useState } from 'react';
import { useObjectURL } from '@/hooks/useObjectURL';
import { useMaterial } from '@/context/course-materials-context';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';
import { CircleMinusIcon, PlusCircleIcon, UploadIcon } from 'lucide-react';

import { ErrorMessage, SuccessMessage } from '../ui/form-messages';
import DragAndDropWrapper from '../dashboard/drag-and-drop-wrapper';
import { useSearchParams } from 'next/navigation';
import { useUploadThing } from '@/lib/uploadthing';
import { toast } from 'sonner';

type ContentProps = {
  title: string;
  description?: string;
  contentUrls: string[];
  action: (formData: FormData) => Promise<any>;
  acceptedFileTypes: string;
  // userId: string;
};

export default function ContentManagement({
  title,
  description,
  contentUrls,
  action,
  acceptedFileTypes,
}: // userId,
ContentProps) {
  const { selectedMaterial } = useMaterial();
  const [files, setFiles] = useState<File[]>([]);

  const objectUrl = useObjectURL(files[0] || null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const searchParams = useSearchParams();
  const course = searchParams.get('course') as unknown as string;
  const [progress, setProgress] = useState<number>(0);

  const { startUpload } = useUploadThing('syllabusUploader', {
    onClientUploadComplete: () => {
      alert('uploaded successfully!');
      setFiles([]);
      toast.success('Syllabus uploaded successfully!');
    },
    onUploadError: () => {
      alert('error occurred while uploading');
    },
    onUploadBegin: () => {
      // alert('upload has begun');
    },
    onUploadProgress: progress => {
      setProgress(progress);
    },
  });

  useEffect(() => {
    console.log('Progress: ', progress);
  }, [progress]);

  const handleRemoveFile = () => {
    setFiles([]);
  };

  // ! Handling uploads with uploadthing now

  // const handleUpload = async (formData: FormData) => {
  //   // formData.append("courseTitle", course as string);
  //   // setError("");
  //   // setSuccess("");
  //   // if (!file) {
  //   //   setError("No file selected");
  //   //   return;
  //   // }
  //   // const result = await getSignedURL(
  //   //   file.size,
  //   //   selectedMaterial?.toLowerCase()
  //   // );
  //   // if (result?.failure) {
  //   //   setError("Failed to get signed URL");
  //   //   return;
  //   // }
  //   // if (result?.success?.url) {
  //   //   try {
  //   //     const url = result.success.url;
  //   //     await fetch(url, {
  //   //       method: "PUT",
  //   //       body: file,
  //   //       headers: {
  //   //         "Content-Type": file.type,
  //   //       },
  //   //     });
  //   //     const res = await action(formData);
  //   //     const { success, failure } = res;
  //   //     if (success) {
  //   //       setSuccess(success);
  //   //     } else {
  //   //       setError(failure);
  //   //     }
  //   //   } catch (err) {
  //   //     setError("Something went wrong during the upload");
  //   //   }
  //   // }
  // };

  const handleAddNewFile = (files: File[]) => {
    if (files && files.length > 0) {
      const file = files[0];
      setFiles(prevFiles => [...prevFiles, file]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('files: ', e.target?.files);
    if (e.target.files) {
      const file = e.target.files[0];
      // setFile(file);
      const tempUrl = URL.createObjectURL(file);
      // setPreviewImageUrl(tempUrl);
      // console.log("file input ref: ", fileInputRef.current);
      setFiles(prevFiles => [...prevFiles, file]);
    }
  };

  const displayUrls = objectUrl ? [objectUrl] : contentUrls;

  return (
    <Card className="relative">
      {files.length === 1 && (
        <div className="absolute top-2 right-2 flex items-center gap-x-2">
          <Button onClick={handleRemoveFile} type="button" variant="outline">
            <CircleMinusIcon size={15} className="mr-1" />
            Remove
          </Button>

          {/* <form action={handleUpload}>
            <SubmitButton2 variant="outline">
              <UploadIcon size={15} className="mr-1" />
              Upload
            </SubmitButton2>
          </form> */}

          <Button onClick={() => startUpload(files, { course: course })}>
            Upload
          </Button>
        </div>
      )}

      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="py-2">
          {success && <SuccessMessage message={success} />}
          {error && <ErrorMessage message={error} />}
        </div>
        {files.length === 0 && (
          <>
            <Button
              type="button"
              className="absolute top-2 right-2 flex items-center gap-x-2"
              variant="outline"
              onClick={() => inputRef?.current?.click()}
            >
              <PlusCircleIcon />
              Add File
            </Button>
            <input
              type="file"
              hidden
              accept={acceptedFileTypes}
              ref={inputRef}
              multiple={false}
              onChange={e => handleFileChange(e)}
            />
          </>
        )}
        {displayUrls.length > 0 ? (
          <div className="flex-grow flex-col space-y-2">
            {displayUrls.map((url, idx) => (
              <iframe
                key={idx}
                src={url ?? ''}
                style={{ height: '800px' }}
                className="w-full h-full"
              ></iframe>
            ))}
          </div>
        ) : (
          <DragAndDropWrapper>
            <p>
              Drag and drop your file for{' '}
              <span className="font-semibold text-lg">{selectedMaterial}</span>{' '}
              here.
            </p>
          </DragAndDropWrapper>
        )}
      </CardContent>
    </Card>
  );
}
