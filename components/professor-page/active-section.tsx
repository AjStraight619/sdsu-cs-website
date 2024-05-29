"use client";
import { useActiveSection } from "@/hooks/useActiveSection";
import { ReactNode } from "react";

type ActiveSectionProps = {
  profName: string;
  course: string;
};

export default function ActiveSection({
  profName,
  course,
}: ActiveSectionProps) {
  const activeSection = useActiveSection();

  const renderSubHeader = (classCode: string) => {
    const parts = classCode.split("-");
    const [name, ...rest] = parts;
    const upperCaseName = name.toUpperCase();
    return [upperCaseName, ...rest].join(" ");
  };

  return (
    <div className="flex flex-col gap-y-2 select-none justify-start items-start w-full">
      <ActiveSectionHeader>{activeSection}</ActiveSectionHeader>
      <ActiveSectionSubHeader>
        {renderSubHeader(course.toUpperCase())}
      </ActiveSectionSubHeader>
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
