"use client"
import React, { useRef } from 'react'
import { CirclePlusIcon, PlusIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Input } from "../ui/input"
import { addCourse, deleteCourse } from "@/actions/courses"
import { useCallback, useEffect, useOptimistic, useState } from "react"
import { useDebouncedCallback } from 'use-debounce'
import { ErrorMessage } from "../ui/form-messages"
import { nanoid } from "nanoid"
import { Label } from "@radix-ui/react-label"
import SubmitButton2 from "../ui/submit-button2"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { motion } from 'framer-motion'
import DeleteCourse from './delete-course'

type ProfessorOptionsProps = {
  courses: Course[] | undefined
  currentCourse: string
}

type Course = {
  id: string
  title: string
  pending?: boolean
}

type Action =
  | { type: "ADD"; payload: Course }
  | { type: "REMOVE"; payload: string };

function reducer(state: Course[] | undefined, action: Action) {
  if (!state) return []
  switch (action.type) {
    case "ADD":
      return [...state, action.payload]
    case "REMOVE":
      return state.filter(course => course.id !== action.payload)
    default:
      return state
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

export default function CourseActions({ courses, currentCourse }: ProfessorOptionsProps) {

  const [input, setInput] = useState("")
  const [optimisticCourses, dispatch] = useOptimistic(courses, reducer)
  const [error, setError] = useState("")
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()


  const handlePathChange = useCallback((course: string) => {
    const params = new URLSearchParams(searchParams)
    if (course) {
      params.set("course", course)
    } else {
      params.delete('course')
    }

    replace(`${pathname}?${params.toString()}`)
  }, [pathname])



  const handleInputChange = (input: string) => {

    validateString(input)
    setInput(input)
  }

  const validateString = useDebouncedCallback((input: string) => {
    setError("")
    const trimmedInput = input.trim()
    if (trimmedInput.length < 2) return
    if (!trimmedInput.startsWith("CS")) {
      setError("Must start with 'CS'")
    }
  }, 1000)

  const handleAddCourse = async (formData: FormData) => {
    setError("")
    const coursename = formData.get("courseName") as string
    const courseExists = optimisticCourses?.find(c => c.title === coursename)
    if (courseExists) {
      setError("This course already exists")
      return
    }
    dispatch({ type: "ADD", payload: { id: nanoid(), title: coursename, pending: true } })
    const { error, courseName } = await addCourse(formData)
    // Close popover here
    console.log("courseName: ", courseName)
    console.log("error: ", error, "type of error: ", typeof error)
    if (error) {
      toast.error('Something went wrong', {
        description: error,
        duration: 2000,

      })
    } else if (courseName) {
      toast("Created course", {
        description: `New course: ${courseName}`,
        duration: 2000
      })
    }
    setInput("")
  }


  // const handleKeyDown = (e: React.KeyboardEvent) => {
  //   e.preventDefault()
  //   const formData = new FormData()
  //   if (e.key !== "Enter") return
  //   if (!input.trim()) {
  //     setError("Must have a name")
  //     return
  //   }
  //   formData.append("courseName", input)
  //   handleAddCourse(formData)
  // }

  const handleDeleteCourse = useCallback(async (formData: FormData) => {
    console.log("in handleDeleteCourse")
    const courseId = formData.get("courseId") as string
    console.log("course id: ", courseId)
    if (!courseId) {
      return
    }

    dispatch({ type: "REMOVE", payload: courseId })
    const { success, error } = await deleteCourse(courseId)
    if (success) {
      toast("Successfully deleted course")
    } else if (error) {
      toast("Something went wrong", {
        description: error
      })
    }
  }, [])



  return (
    <Card className="w-full sm:w-1/2 relative self-start">
      <Popover>
        <PopoverTrigger asChild>
          <Button className="flex items-center gap-x-1 absolute top-2 right-2" variant="outline">
            <CirclePlusIcon size={17} />
            <span>
              Add Course
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className='ml-2'>
          <div className="flex flex-col space-y-2">
            {error && (
              <ErrorMessage message={error} />
            )}
            <form className="space-y-4" action={handleAddCourse}>
              <Label>
                Course name
              </Label>
              <div className="flex items-center gap-x-2">

                <Input value={input} onChange={(e) => handleInputChange(e.target.value)} name="courseName" type="text" />
                <SubmitButton2 className="w-1/4" size="sm" variant="outline">
                  Add
                </SubmitButton2>
              </div>

            </form>

          </div>
        </PopoverContent>
      </Popover>
      <CardHeader>
        <CardTitle>
          My Courses
        </CardTitle>
        <CardDescription>
          Manage your courses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          {/* <Select onValueChange={(value) => handlePathChange(value)}> */}
          {/*   <SelectTrigger className="w-[180px]"> */}
          {/*     <SelectValue placeholder={optimisticCourses?.at(0)?.title ?? "No courses"} /> */}
          {/*   </SelectTrigger> */}
          {/*   <SelectContent> */}
          {/*     {optimisticCourses?.map((course) => ( */}
          {/*       <SelectItem value={course.title} key={course.id}> */}
          {/*         {course.title} */}
          {/*       </SelectItem> */}
          {/*     ))} */}
          {/*   </SelectContent> */}

          {/*    </Select> */}
          <motion.ul
            className="flex flex-col gap-y-3 h-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {optimisticCourses?.map((course) => (
              <motion.li
                key={course.id}
                onClick={() => handlePathChange(course.title)}
                className={`${course.pending ? "text-muted-foreground " : "text-black hover:cursor-pointer"} ${currentCourse === course.title ? "bg-muted" : ""} p-2 rounded-md transition-colors duration-300 relative w-full hover:bg-muted`}
                variants={course.pending ? {} : itemVariants}
                initial={course.pending ? false : "hidden"}
                animate={course.pending ? false : "visible"}
              >
                <div className="h-full flex items-center justify-between">
                  <span className={`${currentCourse === course.title ? "underline text-bright-red" : ""}`}>
                    {course.title}
                  </span>
                  {currentCourse === course.title && (
                    <DeleteCourse courseId={course.id} handleDeleteCourse={handleDeleteCourse} />
                  )}
                </div>
              </motion.li>
            ))}
          </motion.ul>


        </div>

      </CardContent>

    </Card>
  )
}
