"use client";

import { Syllabus } from "@prisma/client";
import DragAndDropWrapper from "../dashboard/drag-and-drop-wrapper";
import { useObjectURL } from "@/hooks/useObjectURL";
import { useMaterial } from "@/context/course-materials-context";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { CircleMinusIcon, UploadIcon } from "lucide-react";
import { useRef, useState } from "react";
import SubmitButton2 from "../ui/submit-button2";
import { getSignedURL } from "@/actions/s3";
import { usePathname } from "next/navigation";
import { ErrorMessage, SuccessMessage } from "../ui/form-messages";
import { addSyllabus } from "@/actions/syllabus";

type SyllabusContentProps = {
  syllabus: Syllabus[] | undefined;
};

export default function SyllabusContent({ syllabus }: SyllabusContentProps) {
  const { file, setFile } = useMaterial();
  const objectUrl = useObjectURL(file || null);
  const formRef = useRef<HTMLFormElement>(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const pathname = usePathname();

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleSyllabusUpload = async (formData: FormData) => {
    setError("");
    setSuccess("");
    if (!file) {
      setError("No file selected");
      return;
    }

    const result = await getSignedURL(file.size, "syllabus");
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
        await addSyllabus(formData);
        setSuccess("Syllabus uploaded successfully");
      } catch (err) {
        setError("Something went wrong during the upload");
      }
    }
  };

  const dashboardPath = pathname.includes("/admin");

  const displayUrl = objectUrl || (syllabus && syllabus[0]?.url) || "";

  return (
    <Card className="relative">
      {file && (
        <div className="absolute top-2 right-2 flex items-center gap-x-2">
          <Button onClick={handleRemoveFile} type="button" variant="outline">
            <CircleMinusIcon size={15} className="mr-1" />
            Remove
          </Button>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(formRef.current || undefined);
              handleSyllabusUpload(formData);
            }}
            ref={formRef}
          >
            <SubmitButton2 type="submit" variant="outline">
              <UploadIcon size={15} className="mr-1" />
              Upload
            </SubmitButton2>
          </form>
        </div>
      )}

      <CardHeader>
        <CardTitle>Syllabus</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="py-2">
          {success && <SuccessMessage message={success} />}
          {error && <ErrorMessage message={error} />}
        </div>
        <DragAndDropWrapper>
          {displayUrl && (
            <div className="flex-grow">
              <iframe
                src={displayUrl}
                style={{ height: "800px" }}
                className="w-full h-full"
              ></iframe>
            </div>
          )}
        </DragAndDropWrapper>
      </CardContent>
    </Card>
  );
}
