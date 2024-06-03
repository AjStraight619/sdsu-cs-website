import { usePathname } from "next/navigation";

export const useActiveProfessor = () => {
  const pathname = usePathname();
  const parts = pathname.split("/");
  return parts[3];
};
