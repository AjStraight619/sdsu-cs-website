import React from "react";
import Header from "@/components/common/header";
import DragnDrop from "@/components/dashboard/dragndrop";
import Syllabus from "@/components/dashboard/syllabus";
import Profile from "@/components/common/profile";
import Modules from "@/components/dashboard/modules";
import CourseSelection from "@/components/common/course-selection";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";

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
  console.log("course: ", course);

  // Fetch course info here and dump it into the syllbus, course component, and modules component
  // Going to use suspense here to give a nice loading state
  const courseInfo = await db.course.findFirst({
    where: {},
  });

  return (
    <div className="min-h-screen flex flex-col p-12 space-y-6">
      <Header className="text-center mb-12" />
      <div className="flex flex-col items-center justify-start space-y-8 container">
        <section className="flex flex-row items-start justify-between w-full gap-x-4">
          <Profile />
          <CourseSelection />
        </section>
        <section className="flex flex-row items-start justify-between w-full gap-x-4">
          <Syllabus />

          {/* You can uncomment Modules and DragnDrop components when needed */}
          <Modules />
        </section>
        <DragnDrop />
      </div>
    </div>
  );
}