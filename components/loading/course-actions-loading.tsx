import { Skeleton } from "@/components/ui/skeleton"

export default function CourseActionsLoading() {
  return (
    <div className='flex items-center gap-x-2'>
      <Skeleton className='h-10 w-48' />
      <Skeleton className='h-10 w-32' />
    </div>
  )
}
