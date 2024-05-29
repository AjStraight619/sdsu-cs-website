import CardsLayout from "@/components/class-page/CardsLayout";
import ProfessorCard from "@/components/class-page/ProfessorCard";
import HeadingSection from "@/components/common/HeadingSection";

export default function ClassPage() {
	return (
		<div className="flex flex-col gap-8">
			<HeadingSection
				mainText="Course Name"
				subText="Course Description goes here, typically longer than name"
			/>
			<CardsLayout>
				<ProfessorCard
					professorName="Professor Name"
					sectionNumbers={[1, 3, 5]}
				/>
				<ProfessorCard
					professorName="Professor Name"
					sectionNumbers={[2]}
				/>
				<ProfessorCard
					professorName="Professor Name"
					sectionNumbers={[]}
				/>
			</CardsLayout>
		</div>
	);
}
