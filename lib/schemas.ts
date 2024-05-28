import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z.string(),
    email: z.string().email().min(3).max(50),
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

    // 5MB
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    return file.size <= MAX_FILE_SIZE;
  },
  {
    message: "File size should be less than 5MB",
  }
);
