"use server";

import { db } from "@/lib/db";
import { RegisterSchema } from "@/lib/schemas";
import { z } from "zod";
import { hash } from "bcryptjs";
// import { getErrorMessage } from "@/lib/utils";
import { getUserByEmail } from "@/server-only/users";
import { nanoid } from "nanoid";
import { addHours } from "date-fns";
import { sendEmail } from "./send-email";
import { signIn } from "@/auth";
import { revalidatePath } from "next/cache";

export const createUser = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedValues = RegisterSchema.safeParse(values);

  if (!validatedValues.success) {
    return {
      success: false,
      data: null,
      error: {
        message: "Something went wrong",
      },
    };
  }

  const { name, email, password } = validatedValues.data;
  const hashedPassword = await hash(password, 12);

  try {
    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    console.log("new user: ", newUser);

    //
    // const verificationToken = nanoid();
    // const expiresAt = addHours(new Date(), 24);

    //   data: {
    //     token: verificationTokenR
    //     userId: newUser.id,
    //     expiresAt,
    //   }
    // });

    /*    await sendEmail(newUser.email, verificationToken, newUser.id); */

    return {
      success: true,
      data: newUser,
      error: null,
    };
  } catch (error) {
    console.error("Error creating new user:", error);
    return {
      success: false,
      data: null,
      error: {
        message: "Error creating new user",
      },
    };
  }
};

export async function createUserFD(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  console.log("Name: ", name, "Email: ", email, "Password: ", password);
  if (!name || !email || !password) {
    console.error("Form data is incomplete");
    return {
      user: null,
      error: "Form data is incomplete",
    };
  }

  try {
    // Run the check for existing user and password hashing in parallel
    const [existingUser, hashedPassword] = await Promise.all([
      getUserByEmail(email),
      hash(password, 12),
    ]);

    if (existingUser?.id && existingUser?.emailVerified) {
      return {
        user: null,
        error: "User already exists",
      };
    }

    // Create a new user
    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const verificationToken = nanoid();
    const expiresAt = addHours(new Date(), 24);

    // Create verification token and send email in parallel
    await Promise.all([
      db.verificationToken.create({
        data: {
          token: verificationToken,
          userId: newUser.id,
          expiresAt,
        },
      }),
      sendEmail(newUser.email, verificationToken, newUser.id),
    ]);

    console.log("New user created: ", newUser);
    return {
      user: newUser,
      error: null,
    };
  } catch (err) {
    console.error("Error occurred:", err);
    return {
      user: null,
      error: "An error occurred while processing the request",
    };
  }
}

export const login = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  await signIn("credentials", { email, password });
  revalidatePath("/admin/login");
};
