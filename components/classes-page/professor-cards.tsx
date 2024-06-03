import { ProfessorsFolder } from "@/lib/types";
import ProfessorCard from "./professor-card";

type ProfessorsCardProps = {
  folders: ProfessorsFolder[];
};

export default function ProfessorCards({ folders }: ProfessorsCardProps) {
  const fillerFolders: ProfessorsFolder[] = [
    { id: "1", name: "John Doe", imageUrl: "/base_profile_picture.jpg" },
    { id: "2", name: "Jane Smith", imageUrl: "/base_profile_picture.jpg" },
    {
      id: "3",
      name: "Alice Johnson",
      imageUrl: "/base_profile_picture.jpg",
    },
    { id: "4", name: "Bob Brown", imageUrl: "/base_profile_picture.jpg" },
    // Add more filler data as needed
  ];

  const combinedFolders = [...folders, ...fillerFolders];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {combinedFolders.map((folder) => (
        <ProfessorCard key={folder.id} folder={folder} />
      ))}
    </section>
  );
}
