import { usePathname } from "next/navigation";

export const useCourse = () => {
  const pathname = usePathname();
  return pathname.split("/")[2];
};
