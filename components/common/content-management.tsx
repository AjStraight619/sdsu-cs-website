"use client";

import { useRef, useState } from "react";
import { useObjectURL } from "@/hooks/useObjectURL";
import { useMaterial } from "@/context/course-materials-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { CircleMinusIcon, PlusCircleIcon, UploadIcon } from "lucide-react";
import SubmitButton2 from "../ui/submit-button2";
import { getSignedURL } from "@/actions/s3";
import { ErrorMessage, SuccessMessage } from "../ui/form-messages";
import DragAndDropWrapper from "../dashboard/drag-and-drop-wrapper";
import { useSearchParams } from "next/navigation";

type ContentProps = {
  title: string;
  description?: string;
  contentUrls: string[];
  action: (formData: FormData) => Promise<any>;
  acceptedFileTypes: string;
};

export default function ContentManagement({
  title,
  description,
  contentUrls,
  action,
  acceptedFileTypes,
}: ContentProps) {
  const { file, setFile, selectedMaterial } = useMaterial();
  const objectUrl = useObjectURL(file || null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const searchParams = useSearchParams();
  const course = searchParams.get("course");

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleUpload = async (formData: FormData) => {
    formData.append("courseTitle", course as string);
    setError("");
    setSuccess("");
    if (!file) {
      setError("No file selected");
      return;
    }

    const result = await getSignedURL(
      file.size,
      selectedMaterial?.toLowerCase()
    );
    if (result?.failure) {
      setError("Failed to get signed URL");
      return;
    }
    if (result?.success?.url) {
      try {
        const url = result.success.url;
        await fetch(url, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file.type,
          },
        });
        const res = await action(formData);
        const { success, failure } = res;
        if (success) {
          setSuccess(success);
        } else {
          setError(failure);
        }
      } catch (err) {
        setError("Something went wrong during the upload");
      }
    }
  };

  const handleAddNewFile = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      setFile(file);
    }
  };

  const displayUrls = objectUrl ? [objectUrl] : contentUrls;

  console.log("display urls: ", displayUrls);

  return (
    <Card className="relative">
      {file && (
        <div className="absolute top-2 right-2 flex items-center gap-x-2">
          <Button onClick={handleRemoveFile} type="button" variant="outline">
            <CircleMinusIcon size={15} className="mr-1" />
            Remove
          </Button>

          <form action={handleUpload}>
            <SubmitButton2 variant="outline">
              <UploadIcon size={15} className="mr-1" />
              Upload
            </SubmitButton2>
          </form>
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
        {!file && (
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
              onChange={(e) => handleAddNewFile(e.target.files)}
            />
          </>
        )}
        {displayUrls.length > 0 ? (
          <div className="flex-grow flex-col space-y-2">
            {displayUrls.map((url, idx) => (
              <iframe
                key={idx}
                src={url ?? ""}
                style={{ height: "800px" }}
                className="w-full h-full"
              ></iframe>
            ))}
          </div>
        ) : (
          <DragAndDropWrapper>
            <p>
              Drag and drop your file for{" "}
              <span className="font-semibold text-lg">{selectedMaterial}</span>{" "}
              here.
            </p>
          </DragAndDropWrapper>
        )}
      </CardContent>
    </Card>
  );
}
