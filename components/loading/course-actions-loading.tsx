import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function CourseActionsLoading() {
  return (
    <Card className="w-full sm:w-1/2 relative">
      <Skeleton className="absolute top-2 right-2 w-1/5 h-8 rounded-md" />
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-10 w-1/5 rounded-md" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-2 w-1/5" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 w-full gap-x-2">
          {Array.from({ length: 2 }, (_, idx) => (
            <Skeleton className="h-10 rounded-md" key={idx} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
