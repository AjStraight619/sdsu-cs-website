import React, { Suspense } from "react";

import ProfessorCard from "@/components/common/professor-card";
import ProfessorCourses from "@/components/dashboard/professor-courses";
import SectionDivider from "@/components/ui/section-divider";
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



  return (
    <div className="min-h-screen flex flex-col p-12 space-y-12 pt-32 container">
      <div className="flex sm:flex-row items-center sm:items-start sm:justify-between flex-col justify-center gap-x-2 w-full">
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

