"use client";

import { Home, Folder, FileText, LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";

export default function SideNav() {
	return (
		<div className="hidden w-full lg:flex flex-col gap-4 lg:col-span-3">
			<NavItem icon={Home} subpath="home" label="Home" />
			<NavItem icon={Folder} subpath="module" label="Modules" />
			<NavItem icon={FileText} subpath="syllabus" label="Syllabus" />
		</div>
	);
}

interface INavItem {
	icon: LucideIcon;
	subpath: string;
	label: string;
}

const NavItem = ({ icon: Icon, subpath, label }: INavItem) => {
	const pathname: string = usePathname();

	// Function that checks if a specified subpath is in the full pathname
	const isActive = pathname.includes(subpath);

	return (
		<button className="w-full flex gap-2 py-1 items-center">
			<Icon
				className={`${
					isActive ? "stroke-bright-red" : "stroke-charcoal-600"
				}`}
			/>
			<span
				className={`font-semibold font-inter text-xl ${
					isActive ? "text-bright-red" : "text-charcoal-600"
				}`}
			>
				{label}
			</span>
		</button>
	);
};
