import Link from "next/link";
import React from "react";

const classes = [
  { name: "Prof.A", link: "/profA" },
  { name: "Prof.B", link: "/profB" },
  { name: "Prof.C", link: "/profC" },
];

type ClassListProps = {
  professors: ProfessorInfo[];
};

type ProfessorInfo = {
  id: string;
  name: string | null;
};

const ClassList = ({ professors }: ClassListProps) => {
  return (
    <div className="classList">
      <h2 className="capitalize font-poppins pb-5">
        Participating Professors...
      </h2>

      <ul className="capitalize">
        {professors.map((p) => (
          <li key={p.id}>
            <Link href={`/professor/${p.id}`}>{p.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassList;
