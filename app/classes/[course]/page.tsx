import CardsLayout from "@/components/class-page/CardsLayout";
import ProfessorCard from "@/components/class-page/ProfessorCard";
import ProfessorCards from "@/components/classes-page/professor-cards";
import { ProfessorsFolder } from "@/lib/types";
// import HeadingSection from "@/components/common/HeadingSection";

import { google } from "googleapis";

const decodedCredentials = Buffer.from(
  process.env.GOOGLE_CREDENTIALS!,
  "base64"
).toString("utf8");

const credentialsJson = JSON.parse(decodedCredentials);

type ClassPageProps = {
  params: {
    course: string;
  };
};

export default async function ClassPage({
  params: { course },
}: ClassPageProps) {
  // At first display all prof cards, and then we can filter by the search params that change based on course selection
  // The selection numbers will can be links to the /profname?course=(CS150, CS160, etc..)

  let professorsFolders: ProfessorsFolder[] = [];

  const auth = new google.auth.GoogleAuth({
    credentials: credentialsJson,
    scopes: ["https://www.googleapis.com/auth/drive"],
  });

  const drive = google.drive({ version: "v3", auth });

  const folderName = course;
  const folderResponse = await drive.files.list({
    q: `name='${folderName}' and mimeType='application/vnd.google-apps.folder'`,
    fields: "files(id, name)",
  });

  if (folderResponse.data.files?.length) {
    const folderId = folderResponse.data.files[0].id;
    console.log(`Found folder with ID: ${folderId}`);

    const professorsFolderResponse = await drive.files.list({
      q: `'${folderId}' in parents and mimeType='application/vnd.google-apps.folder'`,
      fields: "files(id, name)",
    });

    const professorsFoldersData = professorsFolderResponse.data.files || [];

    for (const folder of professorsFoldersData) {
      console.log(`Subfolder: ${folder.name} (ID: ${folder.id})`);

      const imageResponse = await drive.files.list({
        q: `'${folder.id}' in parents and mimeType contains 'image/jpeg'`,
        fields: "files(id, name)",
        pageSize: 1,
      });

      const imageFile = imageResponse.data.files?.[0];
      const imageUrl = imageFile
        ? `https://drive.google.com/uc?export=view&id=${imageFile.id}`
        : "";

      const professorFolder: ProfessorsFolder = {
        id: folder.id || "",
        name: folder.name || "",
        imageUrl: imageUrl,
      };

      professorsFolders.push(professorFolder);
    }
  } else {
    console.log("Folder not found");
  }

  return (
    <div className="flex flex-col gap-8 px-8 container pt-24">
      {/* <HeadingSection
        mainText="Course Name"
        subText="Course Description goes here, typically longer than name"
      /> */}

      <h1 className="text-4xl font-semibold text-muted-foreground self-start mb-4 mt-8">
        Professors
      </h1>
      <ProfessorCards folders={professorsFolders} />
      {/* <CardsLayout>
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
      </CardsLayout> */}
    </div>
  );
}
