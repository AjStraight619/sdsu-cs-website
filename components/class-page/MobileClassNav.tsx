"use client";

import { FileText, Folder, Home, LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";

export default function MobileClassNav() {
	return (
		<nav className="py-4 fixed bottom-0 z-50 grid grid-cols-3 w-full justify-between bg-charcoal-50 border-t border-t-charcoal-200">
			<NavButton icon={Home} subpath="home" />
			<NavButton icon={Folder} subpath="module" />
			<NavButton icon={FileText} subpath="syllabus" />
		</nav>
	);
}

interface INavButton {
	icon: LucideIcon;
	subpath: string;
}

const NavButton = ({ icon: Icon, subpath }: INavButton) => {
	const pathname: string = usePathname();

	// Function that checks if a specified subpath is in the full pathname
	const isActive = pathname.includes(subpath);

	return (
		<button className="w-full flex justify-center items-center">
			<Icon
				className={`${
					isActive ? "stroke-bright-red" : "stroke-charcoal-600"
				}`}
			/>
		</button>
	);
};
