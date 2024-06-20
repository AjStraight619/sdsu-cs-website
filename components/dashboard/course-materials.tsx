import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import MainViewer from "./main-viewer";
import { Prisma } from "@prisma/client";
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

  const courseData = await getCourseMaterials(course);

  console.log(JSON.stringify(courseData, null, 2));

  return <MainViewer courseData={courseData} />;
}
