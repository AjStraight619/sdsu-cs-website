"use client";
import { ReactNode, createContext, useContext, useState } from "react";

export type Material = "Home" | "Syllabus" | "Modules" | null;

type CourseMaterialsContextType = {
  selectedMaterial: Material;
  setSelectedMaterial: (material: Material) => void;
  file: File | null;
  setFile: (file: File | null) => void;
};

const CourseMaterialsContext = createContext<CourseMaterialsContextType | null>(
  null
);

export default function CourseMaterialsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [selectedMaterial, setSelectedMaterial] = useState<Material>("Home");
  const [file, setFile] = useState<File | null>(null);

  return (
    <CourseMaterialsContext.Provider
      value={{
        selectedMaterial,
        setSelectedMaterial,
        file,
        setFile,
      }}
    >
      {children}
    </CourseMaterialsContext.Provider>
  );
}

export const useMaterial = () => {
  const context = useContext<CourseMaterialsContextType | null>(
    CourseMaterialsContext
  );
  if (!context) {
    throw new Error(
      "useMaterial must be used within a CourseMaterialsProvider"
    );
  }
  return context;
};
