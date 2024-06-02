"use client";

import { Home, Folder, FileText } from "lucide-react";
import { usePathname } from "next/navigation";

export default function SideNav() {
	// Get the full pathname
	const pathname: string = usePathname();

	// Function that checks if a specified subpath is in the full pathname
	const isActive = (subpath: string) => pathname.includes(subpath);

	return (
		<div className="hidden w-full lg:flex flex-col gap-4 lg:col-span-3">
			<button className="w-full flex gap-2 py-1 items-center">
				<Home
					className={`${
						isActive("home")
							? "stroke-bright-red"
							: "stroke-charcoal-600"
					}`}
				/>
				<span
					className={`font-semibold font-inter text-xl ${
						isActive("home")
							? "text-bright-red"
							: "text-charcoal-600"
					}`}
				>
					Home
				</span>
			</button>
			<button className="w-full flex gap-2 py-1 items-center">
				<Folder
					className={`${
						isActive("module")
							? "stroke-bright-red"
							: "stroke-charcoal-600"
					}`}
				/>
				<span
					className={`font-semibold font-inter text-xl ${
						isActive("module")
							? "text-bright-red"
							: "text-charcoal-600"
					}`}
				>
					Modules
				</span>
			</button>
			<button className="w-full flex gap-2 py-1 items-center">
				<FileText
					className={`${
						isActive("syllabus")
							? "stroke-bright-red"
							: "stroke-charcoal-600"
					}`}
				/>
				<span
					className={`font-semibold font-inter text-xl ${
						isActive("syllabus")
							? "text-bright-red"
							: "text-charcoal-600"
					}`}
				>
					Syllabus
				</span>
			</button>
		</div>
	);
}
