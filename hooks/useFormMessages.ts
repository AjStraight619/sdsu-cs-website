import { useState, useCallback } from "react";

type FormMessages = {
  success: string;
  error: string;
};

// TODO: Replace duplicate form messages logic with custom hook

const useFormMessages = () => {
  const [messages, setMessages] = useState<FormMessages>({
    success: "",
    error: "",
  });

  const setSuccess = useCallback((message: string) => {
    setMessages({ success: message, error: "" });
  }, []);

  const setError = useCallback((message: string) => {
    setMessages({ success: "", error: message });
  }, []);

  const clearMessages = useCallback(() => {
    setMessages({ success: "", error: "" });
  }, []);

  return { ...messages, setSuccess, setError, clearMessages };
};

export default useFormMessages;
