import React from "react";
import CourseActions from "./course-actions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

type ProfessorCoursesProps = {
  course: string;
  isEditable: boolean;
};

export default async function ProfessorCourses({
  course,
  isEditable,
}: ProfessorCoursesProps) {
  // await wait(5000);
  const session = await auth();
  if (!session || !session.user) {
    redirect("/admin/login");
  }

  const userId = session.user.id;

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      courses: true,
    },
  });

  const coursesInfo = user?.courses.map((course) => ({
    id: course.id,
    title: course.title,
  }));

  let currentCourseIdx;
  let currentCourseId;
  currentCourseIdx = coursesInfo?.findIndex((c) => c.title === course);
  if (
    currentCourseIdx !== undefined &&
    currentCourseIdx !== -1 &&
    coursesInfo
  ) {
    currentCourseId = coursesInfo[currentCourseIdx].id;
  }

  return (
    <CourseActions
      isEditable={isEditable}
      courses={coursesInfo}
      currentCourse={course}
    />
  );
}
