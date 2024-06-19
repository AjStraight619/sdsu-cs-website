import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function CourseMaterials() {
  // will do a promise.all to fetch the home, syllabus, and modules here..
  const session = await auth();
  if (!session || !session.user) {
    redirect("/admin/login");
  }
  const syllabus = await db.syllabus.findUnique({
    where: {
      id: session.user.id,
    },
  });

  return <div></div>;
}
