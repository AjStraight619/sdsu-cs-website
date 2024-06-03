"use client";

import { ProfessorsFolder } from "@/lib/types";
import { Card, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import { useActiveCourse } from "@/hooks/useActiveCourse";

type ProfessorCardProps = {
  folder: ProfessorsFolder;
};

export default function ProfessorCard({ folder }: ProfessorCardProps) {
  console.log("folder: ", folder);
  const course = useActiveCourse();
  return (
    <Link href={`/classes/${course}/${folder.name}`}>
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center  gap-x-4">
          <div className="p-1 rounded-full bg-charcoal-50 border border-muted shadow-md">
            <Image
              src={folder.imageUrl}
              alt="Professor Image"
              width={80}
              height={80}
              className="rounded-full"
              quality={100}
            />
          </div>
          <CardTitle>{folder.name}</CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
}
