"use server";

import { db } from "@/lib/db";

export async function fileImageUpload(userId: string, fileUrl: string) {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    console.log("User not found ");
  }

  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      image: fileUrl,
    },
  });
}

export async function fileSyllabusUpload(
  userId: string,
  courseName: string,
  fileUrl: string
) {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  console.log("userId: ", userId);
  console.log("Course name: ", courseName);
  console.log("File url: ", fileUrl);

  if (!user) {
    console.log("User not found");
    return;
  }

  const course = await db.course.findUnique({
    where: {
      professorId_title: {
        professorId: userId,
        title: courseName,
      },
    },
  });

  if (!course) {
    console.log("No course");
    return;
  }

  try {
    await db.syllabus.upsert({
      where: {
        courseId: course.id, // This assumes that syllabus is tied to a course with a unique courseId
      },
      update: {
        url: fileUrl,
      },
      create: {
        courseId: course.id,
        url: fileUrl,
      },
    });
    console.log("Syllabus updated or created successfully");
  } catch (e) {
    console.error("Error during syllabus upsert:", e);
  }
}
