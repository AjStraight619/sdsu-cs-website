"use client";

import React, { ReactNode, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Progress } from "../ui/progress";
import { toast } from "sonner";
import { useMaterial } from "@/context/course-materials-context";

const DragAndDropWrapper = ({ children }: { children: ReactNode }) => {
  const [progress, setProgress] = useState(0);
  const { selectedMaterial, files, setFiles } = useMaterial();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const reader = new FileReader();

      // Set up the event handlers
      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          console.log(percentComplete);
          setProgress(percentComplete);
          // toast.loading(
          //   <Progress className="z-[999]" value={percentComplete} />,
          //   { id: "upload-progress" }
          // );
        }
      };

      reader.onloadend = () => {
        toast.dismiss("upload-progress");
        toast.success("File uploaded successfully", {
          id: "upload-success",
          duration: 2000,
        });
        setProgress(100); // Ensure it shows 100% on completion
        setTimeout(() => setProgress(0), 2000); // Reset progress after 2 seconds
        setFiles([...files, file]);
      };

      reader.onerror = () => {
        toast.error("Error uploading file", {
          id: "upload-failed",
          duration: 5000,
        });
        setProgress(0);
      };

      reader.readAsArrayBuffer(file);

      return () => {
        reader.abort();
      };
    },
    [files, setFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".jpeg", ".jpg", ".png"],
    },
  });

  return (
    <div {...getRootProps()} className="border-2 border-dashed p-4">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
      {children}
      {/* <Progress value={progress} /> */}
    </div>
  );
};

export default DragAndDropWrapper;
