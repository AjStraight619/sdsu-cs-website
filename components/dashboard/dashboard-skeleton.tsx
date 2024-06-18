import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardSkeleton() {
  return (
    <div className="min-h-screen flex flex-col p-12 space-y-12 pt-32 container">
      <Skeleton />
    </div>
  )
}
