import { Menu } from "lucide-react";
import Link from "next/link";

export default function NavLinks() {
	return (
		<div>
			<Menu className="sm:hidden" />
			<div className="hidden gap-4 sm:flex">
				<NavLink href="/class/CS150" text="CS150" />
				<NavLink href="/class/CS160" text="CS160" />
				<NavLink href="/class/CS210" text="CS210" />
			</div>
		</div>
	);
}

interface INavLink {
	href: string;
	text: string;
}

function NavLink({ href, text }: INavLink) {
	return (
		<Link
			className="font-medium font-sans text-charcoal-950 text-base"
			href={href}
		>
			{text}
		</Link>
	);
}
