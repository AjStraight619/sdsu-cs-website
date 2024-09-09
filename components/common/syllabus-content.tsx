import { Syllabus } from "@prisma/client";
import ContentManagement from "./content-management";
import { addSyllabus } from "@/actions/syllabus";

export default function SyllabusContent({
  syllabus,
  userId,
}: {
  syllabus: Syllabus | null | undefined;
  userId: string;
}) {
  const handleSyllabusSubmit = async (formData: FormData) => {
    return addSyllabus(formData);
  };

  const contentUrls = syllabus ? [syllabus.url] : [];

  return (
    <ContentManagement
      title="Syllabus"
      contentUrls={contentUrls}
      action={handleSyllabusSubmit}
      acceptedFileTypes="application/pdf"
      userId={userId}
    />
  );
}
