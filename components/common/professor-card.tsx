import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import ProfileImage from "./profile-image";
import EditableProfessorCard from "../dashboard/editable-professor-card";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function ProfessorCard() {
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

  if (!user) {
    redirect("/admin/register");
  }

  return (
    <Card className="w-full sm:w-1/2 relative">
      <EditableProfessorCard
        imageUrl={user.image ?? "/base_profile_picture.jpg"}
        name={user.name}
        bio={user.bio}
        isEditable={true}
      />
      <CardHeader>
        <div className="flex flex-row items-center gap-x-6">
          <ProfileImage imageUrl={user.image ?? "/base_profile_picture.jpg"} />
          <p className="font-semibold text-2xl">{user.name}</p>
        </div>
        <CardDescription>{user.bio}</CardDescription>
      </CardHeader>
    </Card>
  );
}
