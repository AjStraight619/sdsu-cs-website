import CardsLayout from "@/components/class-page/CardsLayout";
import ProfessorCard from "@/components/class-page/ProfessorCard";
import HeadingSection from "@/components/common/HeadingSection";

type ClassPageProps = {
  searchParams: {
    course: string;
  };
};

export default function ClassPage({
  searchParams: { course },
}: ClassPageProps) {
  // At first display all prof cards, and then we can filter by the search params that change based on course selection
  // The selection numbers will can be links to the /profname?course=(CS150, CS160, etc..)

  const professorList = [];
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
        <ProfessorCard professorName="Professor Name" sectionNumbers={[2]} />
        <ProfessorCard professorName="Professor Name" sectionNumbers={[]} />
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
        <ProfessorCard professorName="Professor Name" sectionNumbers={[]} />
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
        <ProfessorCard professorName="Professor Name" sectionNumbers={[]} />
        <ProfessorCard
          professorName="Professor Name"
          sectionNumbers={[1, 3, 5]}
        />
        <ProfessorCard professorName="Professor Name" sectionNumbers={[2]} />
        <ProfessorCard professorName="Professor Name" sectionNumbers={[]} />
      </CardsLayout>
    </div>
  );
}
