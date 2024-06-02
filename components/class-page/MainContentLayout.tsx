import { ReactNode } from "react";
import Heading1 from "../common/Heading1";
import SubHeading from "../common/SubHeading";

interface IMainContentLayout {
	children: ReactNode;
	headingMainText: string;
	headingSubText?: string | undefined;
}

export default function MainContentLayout({
	children,
	headingMainText,
	headingSubText,
}: IMainContentLayout) {
	return (
		<div className="flex flex-col gap-12">
			<div className="flex flex-col gap-2">
				<Heading1>{headingMainText}</Heading1>
				{headingSubText && <SubHeading>{headingSubText}</SubHeading>}
			</div>
			{children}
		</div>
	);
}
