import { ReactNode } from "react";

type HeaderProps = {
  children: ReactNode;
};

export default function Header({ children }: HeaderProps) {
  return (
    <h1 className="text-3xl font-semibold text-center capitalize">
      {children}
    </h1>
  );
}
