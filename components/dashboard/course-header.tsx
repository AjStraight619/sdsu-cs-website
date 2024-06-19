import { ReactNode } from "react";

export default function CourseHeader({ children }: { children: ReactNode }) {

  return (
    <h1 className='text-4xl text-muted-foreground font-semibold'>
      {children}
    </h1>
  )

}
