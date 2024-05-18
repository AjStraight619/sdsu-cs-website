"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useAnimationControls,
} from "framer-motion";

import { Button } from "../ui/button";
import { ChevronRightIcon } from "lucide-react";
import { useEffect, useState } from "react";

type SidebarLink = {
  hasRoute: boolean;
  route?: string;
  label: string;
  hasDropdown: boolean;
  subLinks?: SidebarLink[];
  hash: string;
};

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

const showAnimation = {
  hidden: {
    width: 0,
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
  show: {
    opacity: 1,
    width: "auto",
    transition: {
      duration: 0.5,
    },
  },
};

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  // ? Probably just going to use hashes with the sidebar to navigate to certain sections on the page? And then use top nav for page routing?

  const handleRouteChange = (route: string) => {
    router.replace(`${pathname}/${route}`);
  };

  return (
    <nav className="fixed left-0 w-40 top-16 border-r border-muted-foreground h-full bg-background">
      <ul className="flex flex-col items-center justify-center gap-y-2 w-full p-2">
        {sidebarLinks.map((item, idx) => (
          <div key={idx} className="w-full">
            {item.subLinks ? (
              <SidebarDropdownItem
                subLinks={item.subLinks}
                label={item.label}
                handleRouteChange={() => handleRouteChange(item.route ?? "")}
                hash={item.hash}
              />
            ) : (
              <SidebarItem
                hasRoute={item.hasRoute}
                route={item.route}
                label={item.label}
                handleRouteChange={() => handleRouteChange(item.route ?? "")}
                hash={item.hash}
              />
            )}
          </div>
        ))}
      </ul>
    </nav>
  );
}

type SidebarDropdownItemProps = {
  label: string;
  subLinks: SidebarLink[];
  hash: string;
  handleRouteChange: (route: string) => void;
};

// Sidebar Dropdown component that wraps sidebar items

function SidebarDropdownItem({
  label,
  subLinks,
  handleRouteChange,
  hash,
}: SidebarDropdownItemProps) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const pathname = usePathname();

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  return (
    <div className="w-full flex flex-col">
      <Button
        size="sm"
        className="w-full flex items-center justify-start"
        variant="ghost"
        onClick={toggleDropdown}
      >
        <span className="mr-3">{label}</span>
        <motion.span
          animate={{ rotate: isDropdownOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRightIcon size={15} />
        </motion.span>
      </Button>

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
                  className="text-muted-foreground dark:hover:text-gray-50 transition-colors hover:text-black"
                >
                  <Link href={`${pathname}/${subLink.hash}`}>
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

type SidebarItemProps = {
  hasRoute: boolean;
  route: string | undefined;
  label: string;
  handleRouteChange: (route: string) => void;
  hash: string;
};

// Single Side bar item

function SidebarItem({
  hasRoute,
  route,
  label,
  handleRouteChange,
  hash,
}: SidebarItemProps) {
  const pathname = usePathname();

  return (
    <motion.li
      layout
      variants={showAnimation}
      initial="hidden"
      animate="show"
      exit="hidden"
    >
      <Button
        size="sm"
        className="w-full flex items-center justify-start"
        variant="ghost"
      >
        <Link href={`${pathname}/${hash}`}>{label}</Link>
      </Button>
    </motion.li>
  );
}

// test data

const sidebarLinks: SidebarLink[] = [
  {
    hasRoute: true,
    route: "/syllabus",
    label: "Syllabus",
    hasDropdown: false,
    hash: "#syllabus",
  },
  {
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
    hasRoute: true,
    route: "/syllabus",
    label: "Syllabus",
    hasDropdown: false,
    hash: "#syllabus",
  },
];
