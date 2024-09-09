import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const getProfessorInitials = (name: string | null) => {
  if (!name) return;
  const splitName = name.split(" ");
  const firstInitial = splitName[0].charAt(0);
  const lastInitial = splitName[splitName.length - 1].charAt(0);
  return `${firstInitial}${lastInitial}`;
};

export const getErrorMessage = (error: unknown): string => {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong";
  }

  return message;
};

export const getS3FileURL = (type: string, userId: string): string => {
  const bucketName = process.env.AWS_BUCKET_NAME;
  const region = process.env.AWS_BUCKET_REGION;
  const objectKey = `${type}-${userId}`;
  const fileUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${objectKey}`;
  return fileUrl;
};
