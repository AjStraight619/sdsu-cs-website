import { ReactNode } from "react";

export default function Heading1({ children }: { children: ReactNode }) {
	return (
		<h1 className="font-bold text-4xl font-inter text-charcoal-950">
			{children}
		</h1>
	);
}
