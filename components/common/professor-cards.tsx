
// This implementation is for the db, it is in common directory because we will use these cards for display on the classes-page as well.
import { TProfessorCard } from "@/lib/types";
import { Card, CardHeader, CardTitle } from "../ui/card";
import ProfessorCard from "./professor-card"
type ProfessorCardsProps = {
  professorCards: TProfessorCard[]
}// Will take in all of the professor cards
export default function ProfessorCards({ professorCards }: ProfessorCardsProps) {
  return (
    <>
      {professorCards.map((card, idx) => (
        <ProfessorCard key={idx} />
      ))}
    </>
  )
}
