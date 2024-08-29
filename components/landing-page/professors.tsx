import { db } from "@/lib/db";
import React from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

const Professors = async () => {
  const professors = await db.user.findMany({
    select: {
      id: true,
      name: true,
      image: true,
    },
  });

  console.log("Professors: ", professors);
  console.log("Number of professors: ", professors.length);

  return (
    <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards items={professors} />
    </div>
  );
};

export default Professors;
