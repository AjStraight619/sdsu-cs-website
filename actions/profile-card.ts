"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { ProfileSchema } from "@/lib/schemas";
import { getS3FileURL } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function updateProfileCard(data: FormData) {
  const session = await auth();
  if (!session || !session.user) {
    return { failure: "Not authenticated" };
  }
  const formData = Object.fromEntries(data);
  const parsedData = ProfileSchema.safeParse(formData);

  if (!parsedData.success) {
    console.log("Not a successful parse...");
    return { failure: "Invalid data format" };
  }

  const fileUrl = getS3FileURL("profile-image", session.user.id);
  console.log("fileUrl: ", fileUrl);

  try {
    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: formData.name as string,
        image: fileUrl,
        bio: formData.bio as string,
      },
    });

    console.log("updated profile");

    return {
      success: "Successfully updated profile.",
    };
  } catch (err) {
    console.error(err);
    return { failure: "Failed to update profile." };
  } finally {
    revalidatePath(`/admin/dashboard/[userId]`, "page");
  }
}
