"use client";

import { FileText, Folder, Home } from "lucide-react";
import { usePathname } from "next/navigation";

export default function MobileClassNav() {
	// Get the full pathname
	const pathname: string = usePathname();

	// Function that checks if a specified subpath is in the full pathname
	const isActive = (subpath: string) => pathname.includes(subpath);

	return (
		<nav className="py-4 fixed bottom-0 z-50 grid grid-cols-3 w-full justify-between bg-charcoal-50 border-t border-t-charcoal-200">
			<button className="w-full flex justify-center items-center">
				<Home
					className={`${
						isActive("home")
							? "stroke-bright-red"
							: "stroke-charcoal-600"
					}`}
				/>
			</button>
			<button className="w-full flex justify-center items-center">
				<Folder
					className={`${
						isActive("modules")
							? "stroke-bright-red"
							: "stroke-charcoal-600"
					}`}
				/>
			</button>
			<button className="w-full flex justify-center items-center">
				<FileText
					className={`${
						isActive("syllabus")
							? "stroke-bright-red"
							: "stroke-charcoal-600"
					}`}
				/>
			</button>
		</nav>
	);
}
