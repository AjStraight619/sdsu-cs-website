import React from "react";
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
import { ProfessorCard as TProfessorCard } from "@/lib/types";
import ProfessorCard from "@/components/common/professor-card"
type AdminDashboardProps = {
  params: {
    userId: string;
  };
  searchParams: {
    course: string;
  };
};

const testCardInfo: TProfessorCard =
{
  name: "Alex Straight",
  imageUrl: '/base_profile_picture.jpg',
  bio: "I am a professor of CS 150 and CS 160....",

}


export default async function AdminDashboard({
  params: { userId },
  searchParams: { course },
}: AdminDashboardProps) {
  console.log("userId: ", userId);
  console.log("course: ", course);

  // Fetch course info here and dump it into the syllbus, course component, and modules component
  // Going to use suspense here to give a nice loading state
  // const courseInfo = await db.course.findFirst({a
  //   where: {},
  // })

  // const signedUrl = await getSignedURL()
  // console.log("Signed url in Admin Dashboard: ", signedUrl)

  return (
    <div className="min-h-screen flex flex-col p-12 space-y-6 pt-24 container">
      <ProfessorCard name={testCardInfo.name} imageUrl={testCardInfo.imageUrl} bio={testCardInfo.bio} />

      {/*   <Header className="text-center mb-12" /> */}
      {/*   <UploadImage /> */}
      {/*   <div className="flex flex-col items-center justify-start space-y-8 container"> */}
      {/*     <section className="flex flex-row items-start justify-between w-full gap-x-4"> */}
      {/*       <Profile /> */}
      {/*       <CourseSelection /> */}
      {/*     </section> */}
      {/*     <section className="flex flex-row items-start justify-between w-full gap-x-4"> */}
      {/*       <Syllabus /> */}

      {/*       {/* You can uncomment Modules and DragnDrop components when needed */}
      {/*       <Modules /> */}
      {/*     </section> */}
      {/*     <DragnDrop /> */}
    </div>

  );
}
