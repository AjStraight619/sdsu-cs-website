"use client";
import { useEditing } from "@/hooks/useEditing";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import EditButton from "../ui/edit-button";
import { PencilIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function Syllabus() {
  const { isEditing, toggleEditing } = useEditing();
  return (
    <Card className="min-w-[20rem] self-start max-w-[30rem] relative">
      <CardHeader>
        <CardTitle>Syllabus</CardTitle>
        <EditButton onClick={toggleEditing} isEditing={isEditing}>
          <PencilIcon size={20} />
        </EditButton>
      </CardHeader>

      <ScrollArea>
        <CardContent className="max-h-[24rem]">
          Lorem velit incididunt cupidatat laborum incididunt proident laboris
          commodo officia consectetur eu est qui. Laborum ut ut sit mollit
          adipisicing enim ex ex ad velit tempor reprehenderit. Consequat aliqua
          dolor aute consequat. Officia ullamco ex irure proident est elit
          cupidatat nisi voluptate esse nulla exercitation est aliqua. Dolor qui
          nulla officia amet non occaecat labore aliquip aute id. Minim deserunt
          laboris quis cupidatat proident fugiat enim sint fugiat. Aliquip
          laboris in qui eiusmod tempor mollit. In nisi Lorem ut tempor amet
          amet ullamco irure velit in magna consequat magna est. Do fugiat
          deserunt anim dolore commodo aliquip pariatur. Eu cupidatat dolor
          labore ullamco. Voluptate nisi irure sit sit qui incididunt enim irure
          amet consectetur. Velit proident aliquip laborum dolore adipisicing
          minim velit anim labore ad ut sunt reprehenderit amet. Aliqua minim
          consectetur elit eu sint enim excepteur id est sunt fugiat culpa sit.
          Non qui veniam sit esse aliqua exercitation quis velit esse ut qui.
          Proident sunt ex pariatur laboris ullamco minim sunt proident enim
          esse do deserunt. Exercitation enim minim exercitation in. Cupidatat
          ea mollit et pariatur ex aliquip dolor aliquip ipsum nisi. Non sit sit
          eiusmod adipisicing. Consequat qui sint incididunt aute enim duis.
          Tempor reprehenderit ipsum do magna.
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
