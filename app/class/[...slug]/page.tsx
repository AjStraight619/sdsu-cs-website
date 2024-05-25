import Syllabus from "@/components/class-page/syllabus";

type ClassPageProps = {
  params: {
    slug: string[];
  };
};

export default async function ClassPage({ params: { slug } }: ClassPageProps) {
  const [classCode, ...otherRoutes] = slug;

  console.log("slug: ", slug);

  // All class related materials will be displayed here. The headings and sidebar are currently in the layout.tsx, we can also move them here if it is easier..

  return (
    <div>
      <Syllabus />
    </div>
  );
}
