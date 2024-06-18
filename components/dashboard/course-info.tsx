type CourseInfoProps = {
  currentCourseId?: string
  courses: { id: string, title: string }[] | undefined
}

const getCourseInfo = async (currentCourseId: string) => {

}

export default async function CourseInfo({ currentCourse, courses }: CourseInfoProps) {

  // const courseInfo = await getCourseInfo()


  return (
    <div>

    </div>
  )

}
