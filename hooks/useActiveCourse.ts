import { usePathname } from "next/navigation";

export function useActiveCourse() {
  const pathname = usePathname();
  const parts = pathname.split("/");
  const course = parts.find((part) => part.startsWith("CS"));
  return course;
}
