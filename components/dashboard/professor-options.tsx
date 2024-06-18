"use client"
import { CirclePlusIcon, PlusIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Input } from "../ui/input"
import { Separator } from "../ui/separator"
import { addCourses } from "@/actions/courses"
import { useState } from "react"
import { useDebouncedCallback } from 'use-debounce'
type ProfessorOptionsProps = {
  professorId: string

}

export default function ProfessorCourses({ professorId }: ProfessorOptionsProps) {

  const [input, setInput] = useState("")
  const [courses, setCourses] = useState<string>([])
  const [error, setError] = useState("")

  const handleInputChange = (input: string) => {

  }

  const validateString = useDebouncedCallback((input: string) => {
    setError("")
    const trimmedInput = input.trim()

    if (!trimmedInput.startsWith("CS")) {
      setError("")
    }

  })


  const handleAddCourse = (course: string) => {
    setCourses(prevCourses => [...prevCourses, course])
  }

  return (
    <div className="flex flex-row items-center gap-x-4 h-8">
      <Separator orientation="vertical" />

      <Popover>
        <PopoverTrigger asChild>
          <Button className="flex items-center gap-x-1" variant="outline">
            <PlusIcon size={20} />
            <span>
              Add Class
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <form action={addCourses}>
            <Input value={input} onChange={(e) => handleInputChange(e.target.value)} name="courseName" type="text" />

          </form>
        </PopoverContent>
      </Popover>

    </div>
  )
}
