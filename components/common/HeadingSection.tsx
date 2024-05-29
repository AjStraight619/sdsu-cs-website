import Heading1 from "./Heading1";
import SubHeading from "./SubHeading";

interface IHeadingSection {
	mainText: string;
	subText: string;
}

export default function HeadingSection({ mainText, subText }: IHeadingSection) {
	return (
		<div className="flex flex-col gap-2">
			<Heading1>{mainText}</Heading1>
			<SubHeading>{subText}</SubHeading>
		</div>
	);
}
