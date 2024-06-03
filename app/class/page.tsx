import CardsLayout from "@/components/class-page/CardsLayout";
import ProfessorCard from "@/components/class-page/ProfessorCard";
import Heading1 from "@/components/common/Heading1";
import SubHeading from "@/components/common/SubHeading";

export default async function ClassPage() {
  return (
    <div className="mt-32 mx-6 mb-16 lg:mx-32 xl:mx-48 2xl:mx-60">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <Heading1>Course Name</Heading1>
          <SubHeading>
            Course Description goes here, typically goes longer than name
          </SubHeading>
        </div>
        <CardsLayout>
          <ProfessorCard
            professorName="Professor Name"
            sectionNumbers={[1, 3, 5]}
          />
          <ProfessorCard professorName="Professor Name" sectionNumbers={[2]} />
          <ProfessorCard professorName="Professor Name" sectionNumbers={[]} />
          <ProfessorCard
            professorName="Professor Name"
            sectionNumbers={[1, 3, 5]}
          />
          <ProfessorCard professorName="Professor Name" sectionNumbers={[2]} />
        </CardsLayout>
      </div>
    </div>
  );
}
