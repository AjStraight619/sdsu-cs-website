"use client";

import { usePathname } from "next/navigation";

type SidebarLink = {
  hasRoute: boolean;
  route?: string;
  label: string;
  hasDropdown: boolean;
  subLinks?: SidebarLink[]; // Added field for nested dropdowns
};

const sidebarLinks: SidebarLink[] = [
  {
    hasRoute: true,
    route: "/syllabus",
    label: "Syllabus",
    hasDropdown: false,
  },
  {
    hasRoute: false,
    label: "Modules",
    hasDropdown: true,
    subLinks: [
      // Example nested dropdown
      {
        hasRoute: true,
        route: "/modules/module1",
        label: "Module 1",
        hasDropdown: false,
      },
      {
        hasRoute: true,
        route: "/modules/module2",
        label: "Module 2",
        hasDropdown: false,
      },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed left-0 w-40 top-16 border-r border-muted-foreground h-full bg-background">
      <div className="flex flex-col items-center">
        <div></div>
      </div>
    </aside>
  );
}
