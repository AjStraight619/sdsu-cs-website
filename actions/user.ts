"use server"
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { RegisterSchema } from "@/lib/schemas";
import { User } from "@prisma/client";
import "server-only";
import { z } from "zod";


export const createUser = async (values: z.infer<typeof RegisterSchema>) => {
  const session = await auth()

}
