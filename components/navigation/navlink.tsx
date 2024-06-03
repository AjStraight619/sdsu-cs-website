"use client";

import { useActiveCourse } from "@/hooks/useActiveCourse";
import Link from "next/link";

interface INavLink {
  href: string;
  text: string;
}

export default function NavLink({ href, text }: INavLink) {
  const currentCourse = useActiveCourse();

  return (
    <Link
      className={`font-medium font-inter text-base hover:text-charcoal-800 hover:underline transition-colors duration-150 ${
        text.toLowerCase() === currentCourse?.toLowerCase()
          ? "text-bright-red underline"
          : "text-charcoal-950"
      }`}
      href={href}
    >
      {text}
    </Link>
  );
}
