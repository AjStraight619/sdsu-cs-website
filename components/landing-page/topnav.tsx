import { ModeToggle } from "../mode-toggle";

export default function Topnav() {
  return (
    <nav className="top-0 h-16 w-full  border-b border-muted-foreground fixed">
      <div className="flex items-center justify-between px-4 h-full">
        <div></div>
        <ModeToggle />
      </div>
    </nav>
  );
}
