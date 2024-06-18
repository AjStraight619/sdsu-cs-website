"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function addCourse(formData: FormData) {
  const session = await auth()
  if (!session || !session.user) {
    return {
      error: "You must have a valid session to update course information."
    }
  }
  const courseName = formData.get("courseName")

  try {

    const newCourse = await db.course.create({
      data: {
        professorId: session.user.id,
        title: courseName as string
      }
    })


    return {
      courseName: newCourse.title,
      error: null
    }

  } catch (err) {
    return {
      courseName: null,
      error: "Something went wrong"
    }

  } finally {
    revalidatePath('/admin/dashboard')
  }

}


export async function deleteCourse(courseId: string): Promise<{
  success: boolean,
  error: string | null
}> {
  console.log("In delete course function: ", courseId)
  if (!courseId) {
    return {
      success: false,
      error: "Can't find this course right now, fuck off"
    }
  }
  try {
    const deletedCourse = await db.course.delete({
      where: {
        id: courseId
      }
    })

    console.log("deleted course: ", deletedCourse)
    return {
      success: true,
      error: null
    }
  } catch (err) {
    return {
      success: false,
      error: "Something went wrong deleting the course"
    }

  } finally {
    revalidatePath("/admin/dashboard")
  }
} 
