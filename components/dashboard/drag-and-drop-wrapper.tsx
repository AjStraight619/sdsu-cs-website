"use client";

import React, { ReactNode, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Progress } from "../ui/progress";
import { toast } from "sonner";
import { useMaterial } from "@/context/course-materials-context";

const DragAndDropWrapper = ({ children }: { children: ReactNode }) => {
  const [progress, setProgress] = useState(0);
  const { selectedMaterial, file, setFile } = useMaterial();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFile = acceptedFiles[0];
      if (!newFile) return;

      const reader = new FileReader();

      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          console.log(percentComplete);
          setProgress(percentComplete);
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
        setFile(newFile);
      };

      reader.onerror = () => {
        toast.error("Error uploading file", {
          id: "upload-failed",
          duration: 5000,
        });
        setProgress(0);
      };

      reader.readAsArrayBuffer(newFile);

      return () => {
        reader.abort();
      };
    },
    [setFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    multiple: false,
  });

  return (
    <div {...getRootProps()} className="border-2 border-dashed p-4">
      <input className="z-[999]" {...getInputProps()} />
      {isDragActive && <p className="animate-pulse">Drop the file here ...</p>}
      {children}
    </div>
  );
};

export default DragAndDropWrapper;
