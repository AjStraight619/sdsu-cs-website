import { ReactNode } from "react";
import HeadingSection from "../common/HeadingSection";

interface IClassPageLayout {
	children: ReactNode;
	headingMainText: string;
	headingSubText: string;
}

export default function ClassPageLayout({
	children,
	headingMainText,
	headingSubText,
}: IClassPageLayout) {
	return (
		<div className="flex flex-col gap-12">
			<HeadingSection
				mainText={headingMainText}
				subText={headingSubText}
			/>
			{children}
		</div>
	);
}
