import { ReactNode } from "react";

type ContentHeaderProps = {
  children: ReactNode;
};

export default function ContentHeader({ children }: ContentHeaderProps) {
  return <h2 className="text-xl sm:text-2xl font-semibold">{children}</h2>;
}
