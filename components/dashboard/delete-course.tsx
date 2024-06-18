"use client"
import { useSearchParams } from "next/navigation";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { CircleMinusIcon } from "lucide-react";
import SubmitButton2 from "../ui/submit-button2";
type DeleteCourseProps = {
  courseId: string
  handleDeleteCourse: (formData: FormData) => void
  className?: string
}

export default function DeleteCourse({ courseId, handleDeleteCourse, className }: DeleteCourseProps) {

  console.log("Course id: ", courseId)

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="flex items-center gap-x-2" variant='outline'>
          <CircleMinusIcon size={15} />
          <span>
            Delete
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this course.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>
            <form action={async (formData) => {
              formData.append("courseId", courseId)
              handleDeleteCourse(formData)
            }}>

              <SubmitButton2>
                Delete Course
              </SubmitButton2>
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
