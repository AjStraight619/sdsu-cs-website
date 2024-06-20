"use client";

import { useMaterial } from "@/context/course-materials-context";
import { getCourseMaterials } from "@/server-only/course";
import { Prisma, Syllabus } from "@prisma/client";
import SyllabusContent from "../common/syllabus-content";

type MainViewerProps = {
  courseData: Prisma.PromiseReturnType<typeof getCourseMaterials>;
};

export default function MainViewer({ courseData }: MainViewerProps) {
  const { selectedMaterial } = useMaterial();

  switch (selectedMaterial) {
    case "Home":
      return;
    case "Syllabus":
      return <SyllabusContent syllabus={courseData?.syllabi} />;
    case "Modules":
      return;
    default:
      return <pre>{JSON.stringify(courseData, null, 2)}</pre>;
  }
}
