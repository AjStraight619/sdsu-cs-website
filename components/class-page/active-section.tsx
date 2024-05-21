"use client";
import Header from "./header";
import { useActiveSection } from "@/hooks/useActiveSection";
import SubHeader from "./sub-header";

type ActiveSectionProps = {
  classCode: string;
};

export default function ActiveSection({ classCode }: ActiveSectionProps) {
  const activeSection = useActiveSection();

  const renderSubHeader = (classCode: string) => {
    const parts = classCode.split("-");
    const [name, ...rest] = parts;
    const upperCaseName = name.toUpperCase();
    return [upperCaseName, ...rest].join(" ");
  };

  return (
    <header className="flex flex-col gap-y-2 select-none">
      <Header>{activeSection}</Header>
      <SubHeader>{renderSubHeader(classCode)}</SubHeader>
    </header>
  );
}
