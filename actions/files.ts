"use server";

import { db } from "@/lib/db";

export async function fileImageUpload(userId: string, fileUrl: string) {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    console.log("User not found ");
  }

  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      image: fileUrl,
    },
  });
}
