import { ReactNode } from "react";

export default function Heading2({ children }: { children: ReactNode }) {
	return (
		<h2 className="font-bold text-3xl font-inter leading-none text-charcoal-950">
			{children} 
		</h2>
	);
}
