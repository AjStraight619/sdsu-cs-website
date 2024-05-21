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
