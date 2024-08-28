"use client";

import { useMaterial } from "@/context/course-materials-context";
import { getCourseMaterials } from "@/server-only/course";
import { Prisma, Syllabus } from "@prisma/client";

import ModuleContent from "../common/module-content";
import SyllabusContent from "../common/syllabus-content";
import CourseHome from "./course-home";

type MainViewerProps = {
  courseData: Prisma.PromiseReturnType<typeof getCourseMaterials>;
};

export default function MainViewer({ courseData }: MainViewerProps) {
  const { selectedMaterial } = useMaterial();

  switch (selectedMaterial) {
    case "Home":
      return <CourseHome courseDescription={courseData?.description ?? ""} />;
    case "Syllabus":
      return <SyllabusContent syllabus={courseData?.syllabus} />;
    case "Modules":
      return <ModuleContent modules={courseData?.modules} />;
    default:
      return <pre>{JSON.stringify(courseData, null, 2)}</pre>;
  }
}
