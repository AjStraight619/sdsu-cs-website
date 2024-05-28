"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import { Progress } from "../ui/progress";
import { toast } from "sonner";
import { Button } from "../ui/button";

export default function DragnDrop() {
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const reader = new FileReader();

    // Set up the event handlers
    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        console.log(percentComplete);
        setProgress(percentComplete);
        toast.loading(
          <Progress className="z-[999]" value={percentComplete} />,

          { id: "upload-progress" }
        );
      }
    };

    reader.onloadend = () => {
      toast.dismiss("upload-progress");
      toast.success("File uploaded successfully", { id: "upload-success" });
      setProgress(100); // Ensure it shows 100% on completion
      setTimeout(() => setProgress(0), 2000); // Reset progress after 2 seconds
    };

    reader.onerror = () => {
      toast.error("Error uploading file", {
        id: "upload-failed",
        duration: 5000,
      });
      setProgress(0);
    };

    reader.readAsArrayBuffer(file);

    // setTimeout(() => {
    //   toast.dismiss("upload-success");
    //   toast.dismiss("upload-progress");
    //   toast.dismiss("upload-failed");
    // }, 5000);

    return () => {
      reader.abort();
    };
  }, []);

  const simulateLargeFileUpload = () => {
    const sizeInMB = 1000; // Size of the file to simulate (100MB)
    const arrayBuffer = new ArrayBuffer(sizeInMB * 1024 * 1024);
    const simulatedFile = new File([arrayBuffer], "large-file.bin", {
      type: "application/octet-stream",
    });

    onDrop([simulatedFile]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="flex flex-col items-center gap-y-2">
      <div {...getRootProps()} className="border-2 border-dashed p-4">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      <Button onClick={simulateLargeFileUpload}>
        Simulate Large File Upload
      </Button>
      <Button
        onClick={() => {
          toast("yo this is the toast");
        }}
      >
        Show Toast
      </Button>
      <Progress value={progress} />
    </div>
  );
}
