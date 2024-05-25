import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type CoursesProps = {
  profName: string;
  courses: string[];
};

export default function Course({ profName, courses }: CoursesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize font-poppins">{profName}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="capitalize">
          {courses.map((course, idx) => (
            <li key={idx}>{course}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
