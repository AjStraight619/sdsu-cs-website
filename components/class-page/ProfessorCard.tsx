interface IProfessorCard {
	professorName: string;
	sectionNumbers: number[];
}

export default function ProfessorCard({
	professorName,
	sectionNumbers,
}: IProfessorCard) {
	return (
		<div className="w-full flex items-center gap-4 px-8 py-6 bg-charcoal-50 border border-charcoal-300 rounded-xl hover:border-charcoal-400 hover:bg-charcoal-100 hover:cursor-pointer">
			<img
				className="aspect-square w-20 h-20 rounded-full"
				// TODO: Change this to dynamic picture
				src="/base_profile_picture.jpg"
				alt="A profile picture that is grayed out, indicating an empty profile picture."
			/>
			<div className="font-inter flex flex-col">
				<span className="text-charcoal-950 font-bold text-2xl">
					{professorName}
				</span>
				<span className="uppercase text-charcoal-600 font-bold text-lg">
					{createSectionNumbersText(sectionNumbers)}
				</span>
			</div>
		</div>
	);
}

function createSectionNumbersText(sectionNumbers: number[]): string {
	if (sectionNumbers.length === 1) {
		// Can index the 0th element since there is only one section
		return `Section ${sectionNumbers[0]}`;
	} else if (sectionNumbers.length > 1) {
		return `Sections ${sectionNumbers.join(", ")}`;
	} else {
		// If there are 0 section numbers, either our parsing algorithm is wrong or a professor did not format their file name correctly
		return `Section not provided.`;
	}
}
