import Sidebar from "@/components/class-page/sidebar";
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

  const [...routes] = params.slug;
  console.log("routess: ", routes);

  return (
    <div>
      <Sidebar />
      {children}
    </div>
  );
}
