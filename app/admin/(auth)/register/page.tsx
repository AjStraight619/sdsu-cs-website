import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";
import RegisterForm from "./_register-form";
import { wait } from "@/lib/utils";

export default async function Register() {
  await wait(5000);
  const session = await auth();
  let user;
  if (session && session.user) {
    user = session.user;
    redirect(`/admin/dashboard/${user.id}`);
  }
  return <RegisterForm />;
}
