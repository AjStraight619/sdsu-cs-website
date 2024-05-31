"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface INavLink {
  href: string;
  text: string;
}

export default function NavLink({ href, text }: INavLink) {
  const searchParams = useSearchParams();
  const currentCourse = searchParams.get("course");
  console.log("current course: ", currentCourse);
  console.log("text: ", text);
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
