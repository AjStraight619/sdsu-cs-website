import { ReactNode } from "react";

export default function Heading3({ children }: { children: ReactNode }) {
	return (
		<h3 className="font-bold text-2xl font-inter leading-none text-charcoal-950">
			{children}
		</h3>
	);
}
