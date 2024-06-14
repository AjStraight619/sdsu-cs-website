"use client"
import { usePathname } from "next/navigation";
import Logo from "./logo";
import NavLinks from "./navlinks";

export default function Navbar() {
  const pathname = usePathname()

  if (pathname.includes("admin")) return null
  return (
    <nav className="fixed top-0 z-50 p-6 flex w-full justify-between lg:px-32 xl:px-48 2xl:px-60 backdrop-blur-md border-b">
      <Logo />
      <NavLinks />
    </nav>
  );
}
