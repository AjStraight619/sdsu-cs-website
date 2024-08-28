"use client";
import { useMaterial } from "@/context/course-materials-context";
import { useOptimistic, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useSearchParams } from "next/navigation";
import { Textarea } from "../ui/textarea";
import SubmitButton2 from "../ui/submit-button2";
import { addCourseDescription } from "@/actions/course-home";

type CourseHomeProps = {
  courseDescription: string | undefined;
};

export default function CourseHome({ courseDescription }: CourseHomeProps) {
  const [input, setInput] = useState(courseDescription || "");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const course = searchParams.get("course");

  const handleHomeAction = async (formData: FormData) => {
    formData.append("courseName", course as string);
    const res = await addCourseDescription(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Home</CardTitle>
        <CardDescription>Give a description for {course}</CardDescription>
      </CardHeader>
      <form action={handleHomeAction}>
        <CardContent>
          <Textarea
            placeholder={`Hello welcome to ${course}...`}
            name="courseDescription"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </CardContent>
        <CardFooter>
          <SubmitButton2>Submit</SubmitButton2>
        </CardFooter>
      </form>
    </Card>
  );
}
