import ActiveSection from "@/components/professor-page/active-section";
import Sidebar from "@/components/professor-page/sidebar";
import { headers } from "next/headers";
import { Readable } from "stream";
import { Buffer } from "buffer";
import {
  getFolderByName,
  listFilesAndFolders,
  getFileContent,
} from "@/lib/drive-service";

async function streamToString(stream: Readable): Promise<string> {
  const chunks: Uint8Array[] = [];
  return new Promise((resolve, reject) => {
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });
}

type ProfessorPageProps = {
  params: {
    profName: string;
  };
  searchParams: {
    option: string;
  };
};

export default async function ProfessorPage({
  params: { profName },
  searchParams: { option },
}: ProfessorPageProps) {
  const headerList = headers();
  const pathname = headerList.get("x-current-path");

  const decodedPathname = decodeURIComponent(pathname!);
  console.log("pathname: ", decodedPathname);

  const [course, professorName] = decodedPathname.split("/").slice(2);

  const courseFolder = await getFolderByName(course);
  if (!courseFolder) {
    console.error("Course folder not found");
    return <div>Course folder not found</div>;
  }

  const professorFolder = await getFolderByName(professorName, courseFolder.id);
  if (!professorFolder || !professorFolder.id) {
    console.error("Professor folder not found");
    return <div>Professor folder not found</div>;
  }

  const filesAndFolders = await listFilesAndFolders(professorFolder.id);

  const homeFolder = filesAndFolders.find((folder) => folder.name === "Home");
  let markdownContent = "";
  if (homeFolder && homeFolder.id) {
    const homeFolderContents = await listFilesAndFolders(homeFolder.id);
    const markdownFile = homeFolderContents.find((file) =>
      file?.name?.endsWith(".md")
    );
    if (markdownFile && markdownFile.id) {
      const fileContent = await getFileContent(markdownFile.id);
      markdownContent = await streamToString(fileContent as Readable);
      console.log("markdown content: ", markdownContent);
    }
  }

  return (
    <div className="h-screen flex flex-col pt-32">
      {/* <Header /> */}
      <div className="flex flex-row container gap-x-12">
        <Sidebar />
        <div className="flex flex-col items-center gap-y-4">
          <ActiveSection
            filesAndFolders={filesAndFolders}
            markdownContent={markdownContent}
          />
        </div>
      </div>
    </div>
  );
}
