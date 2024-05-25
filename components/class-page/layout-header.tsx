"use client";

import { classOptions } from "@/lib/data";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Link from "next/link";

type HeaderProps = {
  course: string;
};

export default function Header({ course }: HeaderProps) {
  return (
    <div className="container flex flex-row items-center justify-between mb-8">
      <h1>
        <span className="text-red-400">SDSU </span>
        <span>CS</span>
      </h1>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Class" />
        </SelectTrigger>
        <SelectContent>
          <ul>
            {classOptions.map((option, idx) => (
              <li key={idx}>
                {/* <Link
                  className="text-muted-foreground hover:text-black transition-colors duration-150"
                  href={`/class${option.route}/home`}
                >
                  {option.name}
                </Link> */}
                <SelectItem value={option.name}>{option.name}</SelectItem>
              </li>
            ))}
          </ul>
          {/* <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem> */}
        </SelectContent>
      </Select>
    </div>
  );
}

//   <ul className="flex flex-row items-center gap-x-2">
//     {classOptions.map((option, idx) => (
//       <li key={idx}>
//         <Link
//           className="text-muted-foreground hover:text-black transition-colors duration-150"
//           href={`/class${option.route}/home`}
//         >
//           {option.name}
//         </Link>
//       </li>
//     ))}
//   </ul>
