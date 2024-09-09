"use client";
import { MultiUploader } from "@/components/file/file-upload-test";
import { UploadButton } from "@/lib/uploadthing";
import React from "react";

const TestPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <MultiUploader />
    </div>
  );
};

export default TestPage;
