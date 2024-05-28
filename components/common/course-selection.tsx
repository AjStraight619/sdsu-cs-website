import { classOptions } from "@/lib/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function CourseSelection() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={classOptions[0].name} />
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
  );
}
