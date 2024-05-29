import { ReactNode } from "react";

type SubHeaderProps = {
  children: ReactNode;
};

export default function SubHeader({ children }: SubHeaderProps) {
  return (
    <h2 className="text-muted-foreground text-lg font-semibold">{children}</h2>
  );
}
