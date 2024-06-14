"use client"

import { Separator } from "../ui/separator"

type Option = "Home" | "Syllabus" | "Modules"

const options: Option[] = ["Home", "Syllabus", "Modules"]

export default function Options() {
  const [option, setOption] = useState<Option>("Home")

  return (
    <div className="flex flex-row gap-x-2 items-center h-8">
      {options.map((opt, idx) => (
        <div key={idx}>
          <div>
            {opt}
          </div>

          <Separator orientation="vertical" />
        </div>
      ))}

    </div>
  )

}



