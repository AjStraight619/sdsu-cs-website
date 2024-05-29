import { ReactNode } from "react";

export default function CardsLayout({ children }: { children: ReactNode }) {
	return (
		<main className="grid grid-flow-row gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
			{children}
		</main>
	);
}
