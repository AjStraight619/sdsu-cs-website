
import { type TProfessorCard } from "@/lib/types"
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card"
import Image from "next/image"
type ProfessorCardProps = TProfessorCard
export default function ProfessorCard({ imageUrl, name, bio, courses }: ProfessorCardProps) {

  return (
    <Card className="w-1/3">
      <CardHeader>
        <div className='flex flex-row items-center gap-x-2'>
          <Image alt="Profile picture" src={imageUrl} width={80} height={80} className="rounded-full" />
          <p className='font-semibold text-2xl'>
            {name}
          </p>
        </div>
        <CardDescription>
          {bio}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
