"use client";

import Link from "next/link";

import { AnimatePresence, motion } from "framer-motion";

import { Button } from "../ui/button";
import {
  ChevronRightIcon,
  FileTextIcon,
  FolderIcon,
  HomeIcon,
} from "lucide-react";
import React, { ReactElement, useState } from "react";
import SidebarButton from "../ui/sidebar-button";
import { SidebarLink, SidebarSubLink } from "@/lib/types";
import { useActiveCourse } from "@/hooks/useActiveCourse";
import { useActiveProfessor } from "@/hooks/useActiveProfessor";
import { usePathname, useSearchParams } from "next/navigation";

// framer-motion variants for sidebar items

const menuAnimation = {
  hidden: {
    opacity: 0,
    height: 0,
    padding: 0,
    transition: { duration: 0.1, when: "afterChildren" },
  },
  show: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      when: "beforeChildren",
    },
  },
};

const menuItemAnimation = {
  hidden: (idx: number) => ({
    padding: 0,
    x: "-100%",
    transition: {
      duration: (idx + 1) * 0.1,
    },
  }),
  show: (idx: number) => ({
    x: 0,
    transition: {
      duration: (idx + 1) * 0.1,
    },
  }),
};

export default function Sidebar() {
  // ? Probably just going to use hashes with the sidebar to navigate to certain sections on the page? And then use top nav for page routing?

  return (
    // <nav className="fixed left-0 w-40 top-16 border-r border-muted-foreground h-full bg-background">
    <aside>
      <ul className="flex flex-col items-center justify-start gap-y-2 p-2">
        {sidebarLinks.map((item, idx) => (
          <div key={idx} className="w-full">
            {item.subLinks ? (
              <SidebarDropdownItem
                subLinks={item.subLinks}
                label={item.label}
                hash={item.hash}
                icon={item.icon}
              />
            ) : (
              <SidebarItem
                hasRoute={item.hasRoute}
                route={item.route}
                label={item.label}
                hash={item.hash}
                icon={item.icon}
              />
            )}
          </div>
        ))}
      </ul>
    </aside>
  );
}

type SidebarDropdownItemProps = {
  label: string;
  subLinks: SidebarSubLink[];
  hash?: string;
  icon: ReactElement;
};

// Sidebar Dropdown component that wraps sidebar items

function SidebarDropdownItem({
  label,
  subLinks,
  hash,
  icon,
}: SidebarDropdownItemProps) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  // const course = useActiveCourse()
  // const professor =
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const section = searchParams.get("section");

  return (
    <div className="w-full flex flex-col">
      <SidebarButton
        className={`  transition-colors hover:text-charcoal-900 flex items-center gap-x-2 ${
          section?.toLowerCase() === label.toLowerCase()
            ? "text-bright-red underline"
            : "text-muted-foreground"
        }`}
        onClick={toggleDropdown}
      >
        <span>{icon}</span>
        <span>{label}</span>
        <motion.span
          animate={{ rotate: isDropdownOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRightIcon size={15} />
        </motion.span>
      </SidebarButton>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.ul
            layout
            variants={menuAnimation}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex flex-col items-center space-y-1 text-sm mt-2"
          >
            {subLinks.map((subLink, idx) => (
              <motion.li
                variants={menuItemAnimation}
                key={idx}
                custom={idx}
                layout
              >
                <Button
                  size="sm"
                  variant="link"
                  className={`  transition-colors hover:text-charcoal-900 ${
                    section?.toLowerCase() === label.toLowerCase()
                      ? "text-bright-red"
                      : "text-muted-foreground"
                  }`}
                >
                  <Link
                    className="w-full"
                    href={`${pathname}?section=${label}`}
                  >
                    {subLink.label}
                  </Link>
                </Button>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export type SidebarItemProps = {
  hasRoute: boolean;
  route: string | undefined;
  label: string;
  hash?: string;
  icon: ReactElement;
};

// Single Side bar item

function SidebarItem({
  hasRoute,
  route,
  label,
  hash,
  icon,
}: // course,
SidebarItemProps) {
  const searchParams = useSearchParams();
  const section = searchParams.get("section");
  const pathname = usePathname();
  return (
    <motion.li>
      <Button
        variant="link"
        className={`  transition-colors hover:text-charcoal-900 ${
          section?.toLowerCase() === label.toLowerCase()
            ? "text-bright-red underline"
            : "text-muted-foreground"
        }`}
      >
        <Link
          className="w-full flex items-center gap-x-2"
          href={`${pathname}?section=${label}`}
        >
          <span>{icon}</span>
          <span>{label}</span>
        </Link>
      </Button>
    </motion.li>
  );
}

// test data

const sidebarLinks: SidebarLink[] = [
  {
    icon: React.createElement(HomeIcon, {
      size: 20,
    }),
    hasRoute: true,
    route: "/home",
    label: "Home",
    hasDropdown: false,
    hash: "#home",
  },
  {
    icon: React.createElement(FolderIcon, {
      size: 20,
    }),
    hasRoute: false,
    label: "Modules",
    hasDropdown: true,
    hash: "#modules",
    subLinks: [
      {
        hasRoute: true,
        route: "/modules/module1",
        label: "Module 1",
        hasDropdown: false,
        hash: "#module-1",
      },
      {
        hasRoute: true,
        route: "/modules/module2",
        label: "Module 2",
        hasDropdown: false,
        hash: "#module-2",
      },
    ],
  },
  {
    icon: React.createElement(FileTextIcon, {
      size: 20,
    }),
    hasRoute: true,
    route: "/syllabus",
    label: "Syllabus",
    hasDropdown: false,
    hash: "#syllabus",
  },
];
