import { Syllabus } from "@prisma/client";
import ContentManagement from "./content-management";
import { addSyllabus } from "@/actions/syllabus";

export default function SyllabusContent({
  syllabus,
}: {
  syllabus: Syllabus | null | undefined;
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
    />
  );
}
