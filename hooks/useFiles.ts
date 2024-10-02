import { useState, useEffect } from 'react';

type UseFileOptions = {
  maxFileSize?: number;
  types?: string[];
  limit?: number;
};

export const useFiles = (options: UseFileOptions) => {
  const [files, setFiles] = useState<File[]>([]);
  const [fileURLs, setFileURLs] = useState<string[]>([]);

  const addFiles = (newFiles: File[]) => {
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
    const newFileURLs = newFiles.map(file => URL.createObjectURL(file));
    setFileURLs(prevURLs => [...prevURLs, ...newFileURLs]);
  };

  const removeFile = (index: number) => {
    URL.revokeObjectURL(fileURLs[index]);

    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    setFileURLs(prevURLs => prevURLs.filter((_, i) => i !== index));
  };

  const resetFiles = () => {
    fileURLs.forEach(url => URL.revokeObjectURL(url));
    setFiles([]);
    setFileURLs([]);
  };

  useEffect(() => {
    return () => {
      fileURLs.forEach(url => URL.revokeObjectURL(url));
    };
  }, [fileURLs]);

  return { files, addFiles, fileURLs, removeFile, resetFiles };
};
