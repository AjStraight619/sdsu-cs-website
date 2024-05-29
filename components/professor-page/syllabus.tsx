import { ReactNode } from "react";

// ! We are going to be using markdown I believe for displaying the syllabus because all of the syllabus material
// ! We will dump the markdown in the syllabus wrapper

export default function Syllabus() {
  return (
    <SyllabusWrapper>
      <SyllabusHeader>Syllabus (Spring 24)</SyllabusHeader>
    </SyllabusWrapper>
  );
}

function SyllabusHeader({ children }: { children: ReactNode }) {
  return <h2 className="font-poppins">{children}</h2>;
}

function SyllabusWrapper({ children }: { children: ReactNode }) {
  return <div className="bg-white p-4 rounded-md shadow-lg">{children}</div>;
}

// function SyllabusBody({children}: {children: ReactNode}) {
//     return (

//     )
// }
