import ActiveSection from "@/components/professor-page/active-section";
import Header from "@/components/professor-page/header";
import Sidebar from "@/components/professor-page/sidebar";
import { useCourse } from "@/hooks/useCourse";

type ProfessorPageProps = {
  params: {
    profName: string;
  };
  searchParams: {
    option: string;
  };
};

export default function ProfessorPage({
  params: { profName },
  searchParams: { option },
}: ProfessorPageProps) {
  return (
    <div className="h-screen flex flex-col pt-24">
      <Header />
      <div className="flex flex-row container gap-x-12">
        <Sidebar profName={profName} />
        <div className="flex flex-col items-center gap-y-4">
          <ActiveSection />
        </div>
      </div>
    </div>
  );
}
