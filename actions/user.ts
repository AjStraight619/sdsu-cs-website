"use server"

import { db } from "@/lib/db";
import { RegisterSchema } from "@/lib/schemas";
import { z } from "zod";
import { hash } from "bcryptjs";
import { getErrorMessage } from "@/lib/utils";

import { nanoid } from "nanoid"
import { addHours } from 'date-fns';
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




