import { Module } from "@prisma/client";
import ContentManagement from "./content-management";

type ModuleContentProps = {
  modules: Module[] | undefined;
};

export default function ModuleContent({ modules }: ModuleContentProps) {
  const handleModuleUpload = async (formData: FormData) => {};

  const contentUrls = modules?.map((m) => m.url) || [];

  return (
    <ContentManagement
      title="Modules"
      description=""
      contentUrls={contentUrls}
      action={handleModuleUpload}
      acceptedFileTypes="application/pdf"
    />
  );
}
