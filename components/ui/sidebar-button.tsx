import { ReactElement, ReactNode } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

type SidebarButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
};
export default function SidebarButton({
  children,
  onClick,
  className,
}: SidebarButtonProps) {
  return (
    <Button
      className={cn("", className)}
      onClick={onClick}
      variant="ghost"
      size="sm"
    >
      {children}
    </Button>
  );
}
