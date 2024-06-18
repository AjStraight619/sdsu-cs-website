import { Card, CardDescription, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function ProfessorCardLoading() {
  return (
    <Card className="w-full sm:w-1/2 relative">
      <CardHeader>
        <div className='flex flex-row items-center gap-x-6'>
          <Skeleton className="h-24 w-24 rounded-full" />
          <Skeleton className='h-8 w-1/3' />
        </div>
        <CardDescription>
          <div className="flex flex-col space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />

          </div>
        </CardDescription>
      </CardHeader>


    </Card>

  )
}
