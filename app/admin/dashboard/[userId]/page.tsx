import React, { Suspense } from "react";
import Header from "@/components/common/header";
import DragnDrop from "@/components/dashboard/dragndrop";
import Syllabus from "@/components/dashboard/syllabus";
import Profile from "@/components/common/profile";
import Modules from "@/components/dashboard/modules";
import CourseSelection from "@/components/common/course-selection";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import UploadImage from "@/components/dashboard/upload-image";
import { getSignedURL } from "@/actions/s3";
import { TProfessorCard } from "@/lib/types";
import ProfessorCard from "@/components/common/professor-card";
import ProfessorCourses from "@/components/dashboard/professor-courses";
import SectionDivider from "@/components/ui/section-divider";
import CourseInfo from "@/components/dashboard/course-info";
import EditableProfessorCard from "@/components/dashboard/editable-professor-card";
import { redirect } from "next/navigation";
import ProfessorCardLoading from "@/components/loading/professor-card-loading";
import CourseActionsLoading from "@/components/loading/course-actions-loading";

type AdminDashboardProps = {
  params: {
    userId: string;
  };
  searchParams: {
    course: string;
  };
};

export default async function AdminDashboard({
  params: { userId },
  searchParams: { course },
}: AdminDashboardProps) {
  console.log("userId: ", userId);



  // const courseInfoComponent = currentCourseId ? (
  //   <Suspense fallback={<div>Loading...</div>}>
  //     <CourseInfo currentCourseId={currentCourseId} courses={courses} />
  //   </Suspense>
  // ) : (
  //   <div>No course selected</div>
  // );

  // if (!user) {
  //   redirect("/admin/register")
  // }

  const res = await fetch("http://localhost:3000/api/parse-pdf", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: "Yo from the client" }),
  })

  if (res.ok) {
    const data = await res.json()
    console.log("data: ", data)
  }

  if (!res.ok) {
    console.error("Something went wrong")
  }

  return (
    <div className="min-h-screen flex flex-col p-12 space-y-12 pt-32 container">
      <div className="flex sm:flex-row items-center sm:items-start sm:justify-between flex-col justify-center">
        <Suspense fallback={<ProfessorCardLoading />}>
          <ProfessorCard />
        </Suspense>
        <Suspense fallback={<CourseActionsLoading />}>
          <ProfessorCourses course={course} />
        </Suspense>
      </div>

      <SectionDivider />



      {/*   <section className="flex flex-col items-center space-y-6"> */}
      {/*     <h1 className="text-muted-foreground text-2xl sm:text-4xl font-semibold self-start"> */}
      {/*       {course} */}
      {/*     </h1> */}
      {/*     {courseInfoComponent} */}
      {/*   </section> */}
    </div>
  );
}

