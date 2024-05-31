import { Menu } from "lucide-react";
import Link from "next/link";
import NavLink from "./navlink";

export default function NavLinks() {
  return (
    <div>
      <Menu className="sm:hidden" />
      <div className="hidden gap-4 sm:flex">
        <NavLink href="/classes?course=CS150" text="CS150" />
        <NavLink href="/classes?course=CS160" text="CS160" />
        <NavLink href="/classes?course=CS210" text="CS210" />
      </div>
    </div>
  );
}
