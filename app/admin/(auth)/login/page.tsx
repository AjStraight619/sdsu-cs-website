import React from "react";
import LoginForm from "./_login-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await auth();
  if (session && session.user) {
    redirect(`/admin/dashboard/${session.user.id}`);
  }

  return <LoginForm />;
}
