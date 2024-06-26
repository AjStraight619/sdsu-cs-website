"use client";

import { Material, useMaterial } from "@/context/course-materials-context";
import React from "react";
import { Separator } from "../ui/separator";

const materialOptions: Material[] = ["Home", "Syllabus", "Modules"];

export default function CourseMaterialsSelection() {
  const { setSelectedMaterial, selectedMaterial, setFile } = useMaterial();
  const handleSelectionChange = (option: Material) => {
    setFile(null);
    setSelectedMaterial(option);
  };

  return (
    <nav aria-label="Course materials">
      <ul className="flex flex-row gap-x-2 h-8">
        {materialOptions.map((option, idx) => (
          <li key={idx} className="h-full flex flex-row gap-x-2">
            <button
              className={`text-2xl font-semibold ${
                selectedMaterial === option ? "text-bright-red underline" : ""
              }`}
              onClick={() => handleSelectionChange(option)}
            >
              {option}
            </button>
            {idx <= 1 && <Separator orientation="vertical" />}
          </li>
        ))}
      </ul>
    </nav>
  );
}
