"use client";

import { useMaterial } from "@/context/course-materials-context";
import { Syllabus } from "@prisma/client";

type MainViewerProps = {
  syllabus: Syllabus;
};

export default function MainViewer() {
  const { selectedMaterial } = useMaterial();

  switch (selectedMaterial) {
    case "Home":
      return;
    case "Syllabus":
      return;
    case "Modules":
      return;
    default:
      return <div>Select material to view.</div>;
  }
}
