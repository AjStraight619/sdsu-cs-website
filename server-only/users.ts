import "server-only"
import { db } from "@/lib/db";
import { User } from "@prisma/client";

// Files marked with server-only do not mutate data

export const getUserByEmail = async (
  email: string
): Promise<User | undefined> => {
  console.log("in getUserByEmail function ");
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    console.log("(In getUserByEmail function), user: ", { user });
    if (!user) return;
    return user;
  } catch (err) {
    // TODO: Implement getErrorMessage util function.
    throw new Error("Something went wrong");
  }
};
