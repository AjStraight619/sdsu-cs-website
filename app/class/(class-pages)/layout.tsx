import MobileClassNav from "@/components/navigation/MobileClassNav";
import { ReactNode } from "react";

export default function ClassLayout({ children }: { children: ReactNode }) {
	return (
		<div>
			<MobileClassNav />
			<div className="mt-32 mx-6 mb-6 lg:mx-32 xl:mx-48 2xl:mx-60">
				{children}
			</div>
		</div>
	);
}
