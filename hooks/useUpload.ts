type useUploadProps = {
  onUpload: (file: File) => void;
  onError: (error: Error) => void;
  onProgress: (progress: number) => void;
  onSuccess: (url: string) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
};

import { useDropzone } from "react-dropzone";

export const useUpload = () => {
  const {} = useDropzone();
};
