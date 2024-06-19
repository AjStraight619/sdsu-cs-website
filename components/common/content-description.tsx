import { ReactNode } from "react";

type ContentDescriptionProps = {
  children: ReactNode;
};

export default function ContentDescription({
  children,
}: ContentDescriptionProps) {
  return <h3 className="text-lg sm:text-xl font-semibold">{children}</h3>;
}
