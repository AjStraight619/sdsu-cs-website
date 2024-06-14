import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z.string().min(1, {
      message: "Name is required"
    }),
    email: z.string().email().min(1, {
      message: "Email is required"
    }).max(100, {
      message: "Email too long"
    }),
    password: z.string().min(8, {
      message: "Password too short",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });



export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});




export const FileSchema = z.custom<File>(
  (file) => {
    if (!(file instanceof File)) {
      return false;
    }

    // Allowed file types
    const allowedFileTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedFileTypes.includes(file.type)) {
      return false;
    }

    // Max file size (5MB)
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    return file.size <= MAX_FILE_SIZE;
  },
  {
    message: "File must be an image (JPEG, PNG, GIF) and less than 5MB",
  }
);
