import ActiveSection from "@/components/class-page/active-section";
import Sidebar from "@/components/class-page/sidebar";
import { classOptions } from "@/lib/data";
import Link from "next/link";
import { ReactNode } from "react";

type ClassLayoutProps = {
  children: ReactNode;
  params: {
    slug: string[];
  };
};

export default function ClassLayout({ children, params }: ClassLayoutProps) {
  console.log("Layout params: ", params);
  // ? Fetch certain modules and other fields that are unique and pass them to the Sidebar component.
  // ? Query google api FOR certain information, no need to fetch everything here, this is independent of each class

  const [classCode, ...otherRoutes] = params.slug;

  return (
    <div className="h-screen flex flex-col pt-24">
      <SubTopNav />
      <div className="flex flex-row container gap-x-12">
        <Sidebar classCode={classCode} otherRoutes={otherRoutes} />
        <ActiveSection classCode={classCode} />
        {children}
      </div>
    </div>
  );
}

function SubTopNav() {
  return (
    <div className="container flex flex-row items-center justify-between mb-8">
      <h1>
        <span className="text-red-400">SDSU </span>
        <span>CS</span>
      </h1>
      <ul className="flex flex-row items-center gap-x-2">
        {classOptions.map((option, idx) => (
          <li key={idx}>
            <Link
              className="text-muted-foreground hover:text-primary-foreground transition-colors duration-150"
              href={`/class${option.route}/home`}
            >
              {option.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
