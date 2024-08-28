import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import "server-only";

export async function getCourseMaterials(course: string) {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/admin/login");
  }

  try {
    const courseMaterials = await db.course.findFirst({
      where: {
        professorId: session.user.id,
        title: course,
      },
      include: {
        syllabus: true,
        modules: true,
      },
    });

    return courseMaterials;
  } catch (err) {
    console.error(err);
  }
}
