import { ReactNode } from "react";
import Heading1 from "../common/Heading1";
import SubHeading from "../common/SubHeading";

interface IClassPageLayout {
	children: ReactNode;
	headingMainText: string;
	headingSubText?: string | undefined;
}

export default function ClassPageLayout({
	children,
	headingMainText,
	headingSubText,
}: IClassPageLayout) {
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
