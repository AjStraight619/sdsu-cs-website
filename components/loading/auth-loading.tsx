"use client";
import { usePathname } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function AuthLoading() {
  const pathname = usePathname();
  const registerPage = pathname.endsWith("/register");
  return (
    <Card className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/4">
      <CardHeader>
        <CardTitle>
          <Skeleton className="flex h-10 w-1/3" />
        </CardTitle>

        <Skeleton
          className={`h-4 rounded-md ${registerPage ? "w-4/5" : "w-1/2"}`}
        />
      </CardHeader>
      <CardContent className="space-y-6">
        {Array.from({ length: registerPage ? 4 : 2 }).map((_, idx) => (
          <div key={idx} className="space-y-2">
            <Skeleton className="flex h-4 w-1/4 rounded-md" />
            <Skeleton className="flex h-10 py-2 w-full rounded-md" />
            {registerPage && idx < 2 && (
              <Skeleton className="flex h-4 w-3/4 rounded-md" />
            )}
          </div>
        ))}
        <Skeleton className="flex h-10 w-full rounded-md" />{" "}
      </CardContent>
    </Card>
  );
}
