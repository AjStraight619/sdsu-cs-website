import { ReactNode } from "react";

export default function SubHeading({ children }: { children: ReactNode }) {
	return (
		<h1 className="font-semibold text-xl font-inter text-charcoal-500">
			{children}
		</h1>
	);
}
