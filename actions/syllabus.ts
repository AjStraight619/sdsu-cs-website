"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getS3FileURL } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function addSyllabus(data: FormData) {
  const session = await auth();
  if (!session || !session.user.id) {
    return { failure: "Not authenticated" };
  }

  const formData = Object.fromEntries(data.entries());
  const title = (formData.title as string) || null;
  const description = (formData.description as string) || null;
  const courseTitle = formData.courseTitle as string;

  const professorId = session.user.id;

  try {
    // Find the courseId using professorId and the unique course title
    const course = await db.course.findFirst({
      where: {
        professorId: professorId,
        title: courseTitle,
      },
    });

    if (!course) {
      return { failure: "Course not found" };
    }

    const courseId = course.id;
    const fileUrl = getS3FileURL("syllabus", session.user.id);

    const result = await db.$transaction(async (prisma) => {
      const newSyllabus = await prisma.syllabus.create({
        data: {
          professorId: session.user.id,
          courseId: courseId,
          title: title ?? "",
          description: description ?? "",
          url: fileUrl,
        },
      });

      await prisma.course.update({
        where: { id: courseId },
        data: {
          syllabi: {
            connect: { id: newSyllabus.id },
          },
        },
      });

      return newSyllabus;
    });

    return result;
  } catch (error) {
    console.error("Error adding syllabus:", error);
    return { failure: "Error adding syllabus" };
  } finally {
    revalidatePath("/admin/dashboard/[userId]", "page");
  }
}
