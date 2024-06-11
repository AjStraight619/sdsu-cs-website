export type SidebarLink = {
  icon: React.ReactElement;
  hasRoute: boolean;
  route?: string;
  label: string;
  hasDropdown: boolean;
  subLinks?: SidebarSubLink[];
  hash?: string;
};

export type SidebarSubLink = Omit<SidebarLink, "icon">;

export type ProfessorsFolder = {
  id: string;
  name: string;
  imageUrl: string;
};


export type ProfessorCard = {
  imageUrl: string
  name: string
  bio: string
  courses?: string[]
}
