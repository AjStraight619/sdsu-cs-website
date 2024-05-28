import { UserIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function Profile() {
  const courses = ["Course 1", "Course 2", "Course 3"];
  return (
    <Card className="self-start min-w-[16rem]">
      <CardHeader>
        <CardTitle className="flex flex-row items-center justify-evenly">
          <UserIcon size={40} />
          <p>Manju</p>
        </CardTitle>
        <CardDescription>Bio......................</CardDescription>
      </CardHeader>
      <CardContent>
        {courses.map((course, idx) => (
          <p key={idx}>{course}</p>
        ))}
      </CardContent>
    </Card>
  );
}
