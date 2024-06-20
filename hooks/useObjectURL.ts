import { useState, useEffect } from "react";

export const useObjectURL = (file: File | null) => {
  const [objectURL, setObjectURL] = useState<string | null>(null);
  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setObjectURL(url);

      return () => {
        URL.revokeObjectURL(url);
        setObjectURL(null);
      };
    }
  }, [file]);

  return objectURL;
};
