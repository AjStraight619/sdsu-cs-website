import { ReactNode } from "react";

export default function SubHeading({ children }: { children: ReactNode }) {
	return (
		<h1 className="font-semibold text-xl font-sans text-charcoal-500">
			{children}
		</h1>
	);
}
