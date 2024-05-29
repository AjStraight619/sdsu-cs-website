import { ReactNode } from "react";

export default function Heading2({ children }: { children: ReactNode }) {
	return (
		<h3 className="font-bold text-2xl font-sans text-charcoal-950">
			{children}
		</h3>
	);
}
