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
