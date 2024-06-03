import MobileClassNav from "@/components/class-page/MobileClassNav";
import SideNav from "@/components/class-page/SideNav";
import { ReactNode } from "react";

export default function ClassLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="lg:hidden">
        <MobileClassNav />
      </div>
      <div className="mt-32 mx-6 mb-6 lg:mx-32 lg:grid grid-cols-12 xl:mx-48 2xl:mx-60">
        <SideNav />
        <div className="lg:col-span-9">{children}</div>
      </div>
    </>
  );
}
