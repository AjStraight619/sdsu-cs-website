import { ReactNode } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "./button"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
type SubmitButton2Props = {
  children: ReactNode

}
export default function SubmitButton2({ children }: SubmitButton2Props) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className={cn('w-full',
      pending ? "bg-muted-foreground" : "")}>
      {pending ? <Loader2 className='animate-spin' /> : children}
    </Button>
  )

}
