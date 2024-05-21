import { usePathname } from "next/navigation";

export function useActiveSection() {
  const pathname = usePathname();
  const parts = pathname.split("/");
  return parts.pop();
}
