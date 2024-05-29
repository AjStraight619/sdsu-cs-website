import ActiveSection from "@/components/professor-page/active-section";
import Header from "@/components/professor-page/layout-header";
import Sidebar from "@/components/professor-page/sidebar";
// import SubTopNav from "@/components/class-page/sub-top-nav";
import { Button } from "@/components/ui/button";
import { Select, SelectContent } from "@/components/ui/select";
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

	const [profName, course] = params.slug;

	return (
		<div className="h-screen flex flex-col pt-24">
			<Header course={course} />
			<div className="flex flex-row container gap-x-12">
				<Sidebar course={course} profName={profName} />
				<div className="flex flex-col items-center gap-y-4">
					<ActiveSection profName={profName} course={course} />
					{children}
				</div>
			</div>
		</div>
	);
}
