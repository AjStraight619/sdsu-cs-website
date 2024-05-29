import CardsLayout from "@/components/class-page/CardsLayout";
import ProfessorCard from "@/components/class-page/ProfessorCard";

export default function ClassPage() {
	return (
		<div>
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
