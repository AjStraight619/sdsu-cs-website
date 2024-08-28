import { auth } from "@/auth";
import { redirect } from "next/navigation";
import MainViewer from "./main-viewer";
import { getCourseMaterials } from "@/server-only/course";

type CourseMaterialsProps = {
  course: string;
};

export default async function CourseMaterials({
  course,
}: CourseMaterialsProps) {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/admin/login");
  }

  if (!course) return null;

  const courseData = await getCourseMaterials(course);

  return <MainViewer courseData={courseData} />;
}
