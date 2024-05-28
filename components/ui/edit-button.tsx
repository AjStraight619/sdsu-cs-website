import { ReactNode } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

type EditButtonProps = {
  onClick: () => void;
  isEditing: boolean;
  children: ReactNode;
  className?: string;
};

export default function EditButton({
  onClick,
  isEditing,
  children,
  className,
}: EditButtonProps) {
  return (
    <Button
      className={cn("absolute top-2 right-2", className)}
      size="icon"
      variant={isEditing ? "default" : "ghost"}
      onClick={onClick}
    >
      {isEditing ? "Save" : children}
    </Button>
  );
}
