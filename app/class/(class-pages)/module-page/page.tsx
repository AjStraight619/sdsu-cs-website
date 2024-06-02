import MainContentLayout from "@/components/class-page/MainContentLayout";
import Heading3 from "@/components/common/Heading3";
import { ReactNode } from "react";

export default function ModulePage() {
	return (
		<MainContentLayout headingMainText="Module Name Here">
			<ContentSectionWrapper headingText="About the module">
				<>{/* Markdown Info here from each module */}</>
			</ContentSectionWrapper>
			<ContentSectionWrapper headingText="Slides">
				<>{/* PDF Slides go here */}</>
			</ContentSectionWrapper>
			<ContentSectionWrapper headingText="Videos">
				<>{/* Lecture video mp4s go here */}</>
			</ContentSectionWrapper>
		</MainContentLayout>
	);
}

interface IContentSectionWrapper {
	headingText: string;
	children: ReactNode;
}

function ContentSectionWrapper({
	headingText,
	children,
}: IContentSectionWrapper) {
	return (
		<div className="flex flex-col gap-2">
			<Heading3>{headingText}</Heading3>
			{children}
		</div>
	);
}
