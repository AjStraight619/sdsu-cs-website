import { db } from "@/lib/db";

type ProfessorPageProps = {
  params: {
    id: string;
  };
};

export default async function ProfessorPage({ params }: ProfessorPageProps) {
  const { id } = params;

  const professor = await db.user.findUnique({
    where: {
      id: id,
    },
    include: {
      courses: true,
    },
  });

  return (
    <div className="mt-24 flex items-center justify-center">
      {professor?.courses.map((c) => (
        <div key={c.id}>{c.title}</div>
      ))}
    </div>
  );
}
