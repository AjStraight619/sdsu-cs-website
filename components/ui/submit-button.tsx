import { ReactNode } from "react"
import { Button } from "./button"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

type SubmitButtonProps = {
  isPending: boolean
  children: ReactNode
  className?: string
}

export default function SubmitButton({ isPending, children, className }: SubmitButtonProps) {
  return (
    <Button type='submit' className={cn("w-full", className)}>
      {isPending ? <Loader2 className='animate-spin' /> : children}
    </Button>
  )
}

