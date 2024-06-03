"use client";
import { useCourse } from "@/hooks/useCourse";
import { ReactNode } from "react";
import Syllabus from "./syllabus";
import { usePathname, useSearchParams } from "next/navigation";

type ActiveSectionProps = {
  filesAndFolders: any[];
  markdownContent: string;
};

export default function ActiveSection({
  filesAndFolders,
  markdownContent,
}: ActiveSectionProps) {
  const course = useCourse();
  const searchParams = useSearchParams();
  const section = searchParams.get("section");
  const pathname = usePathname();
  const prof = decodeURIComponent(pathname.split("/").pop()!);

  const renderSubHeader = (classCode: string) => {
    const parts = classCode.split("-");
    const [name, ...rest] = parts;
    const upperCaseName = name.toUpperCase();
    return [upperCaseName, ...rest].join(" ");
  };

  return (
    <div className="flex flex-col gap-y-2 select-none justify-start items-start w-full">
      <ActiveSectionHeader>{section}</ActiveSectionHeader>
      <ActiveSectionSubHeader>
        <span>{prof} </span>
        <span>- </span>
        <span>{renderSubHeader(course.toUpperCase())}</span>
      </ActiveSectionSubHeader>
      <Syllabus markdownContent={markdownContent} />
    </div>
  );
}

function ActiveSectionHeader({ children }: { children: ReactNode }) {
  return (
    <h1 className="text-3xl font-semibold text-start capitalize">{children}</h1>
  );
}

function ActiveSectionSubHeader({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-muted-foreground text-lg font-semibold">{children}</h2>
  );
}
