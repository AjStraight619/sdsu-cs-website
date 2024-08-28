import React, { Suspense } from "react";

import ProfessorCard from "@/components/common/professor-card";
import ProfessorCourses from "@/components/dashboard/professor-courses";
import SectionDivider from "@/components/ui/section-divider";
import ProfessorCardLoading from "@/components/loading/professor-card-loading";
import CourseActionsLoading from "@/components/loading/course-actions-loading";
import CourseMaterialsProvider from "@/context/course-materials-context";
import CourseHeader from "@/components/dashboard/course-header";
import CourseMaterialsSelection from "@/components/dashboard/course-materials-selection";
import CourseMaterials from "@/components/dashboard/course-materials";

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
  const getCourseTitle = (course: string): string => {
    const parts = course?.split("-");
    return parts?.join(" ");
  };

  return (
    <div className="min-h-screen flex flex-col p-12 space-y-12 pt-32 container overflow-auto">
      <section className="flex sm:flex-row items-center sm:items-start sm:justify-between flex-col justify-center gap-x-2 w-full">
        <Suspense fallback={<ProfessorCardLoading />}>
          <ProfessorCard />
        </Suspense>
        <Suspense fallback={<CourseActionsLoading />}>
          <ProfessorCourses course={course} />
        </Suspense>
      </section>
      <SectionDivider />
      <section className="space-y-6">
        <CourseHeader>
          {getCourseTitle(course) ?? (
            <div>
              Select or create a course in your course manager to continue.
            </div>
          )}
        </CourseHeader>
        <CourseMaterialsProvider>
          <CourseMaterialsSelection />
          <CourseMaterials course={course} />
        </CourseMaterialsProvider>
      </section>
    </div>
  );
}
