"use server"

import { db } from "@/lib/db";
import { RegisterSchema } from "@/lib/schemas";
import { z } from "zod";
import { hash } from "bcryptjs";
import { getErrorMessage } from "@/lib/utils";
import { getUserByEmail } from "@/server-only/users";
import { nanoid } from "nanoid";
import { addHours } from "date-fns";
import { sendEmail } from "./send-email";

export const createUser = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedValues = RegisterSchema.safeParse(values);


  if (!validatedValues.success) {
    return {
      success: false,
      data: null,
      error: {
        message: getErrorMessage(validatedValues.error)
      }
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
      }
    });

    console.log('new user: ', newUser)

    // 
    // const verificationToken = nanoid();
    // const expiresAt = addHours(new Date(), 24);

    // await db.verificationToken.create({
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
  console.log("Name: ", name, "Email: ", email, "Password: ", password)
  if (!name || !email || !password) {
    console.error("Form data is incomplete");
    return {
      user: null,
      error: "Form data is incomplete",
    };
  }
  // Check if the user already exists
  try {
    console.log("getting user by email...")
    const user = await getUserByEmail(email);
    if (user?.id && user?.emailVerified) {
      return {
        user: null,
        error: "User already exists",
      };
    }
  } catch (err) {
    console.error("Error fetching user by email:", err);
    return {
      user: null,
      error: "An error occurred while checking user existence",
    };
  }

  // Hash the password
  let hashedPassword;
  try {
    console.log("hashing password")
    hashedPassword = await hash(password, 12);
  } catch (err) {
    console.error("Error hashing password:", err);
    return {
      user: null,
      error: "An error occurred while hashing the password",
    };
  }




  // Create a new user
  let newUser;
  try {
    console.log("creating new user: ", newUser)
    newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const verificationToken = nanoid();
    const expiresAt = addHours(new Date(), 24);

    await db.verificationToken.create({
      data: {
        token: verificationToken,
        userId: newUser.id,
        expiresAt,
      }
    });

    await sendEmail(newUser.email, verificationToken, newUser.id);

    return {
      user: newUser,
      error: null
    }
  } catch (err) {
    console.error("Error creating new user:", err);
    return {
      user: null,
      error: "An error occurred while creating the user",
    };
  }
}


