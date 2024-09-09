"use client";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Session } from "next-auth";
import Link from "next/link";
import { Button } from "../ui/button";
import { SignOut } from "../ui/sign-out-button";
import { useEffect, useState } from "react";

type AuthProps = {
  session: Session | null;
};

export default function Auth({ session }: AuthProps) {
  const [userType] = useLocalStorage<string | null>("user", null);
  const [isClient, setIsClient] = useState(false);

  const userId = session?.user.id;

  console.log("Session: ", session);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    console.log("Auth userType:", userType);
  }, [userType]);

  if (!isClient) {
    console.log("Not client side rendered, returning null...");
    return null;
  }

  return (
    <div className="flex items-center gap-x-2">
      {session && userType === "Professor" ? (
        <div className="flex items-center gap-x-2">
          <Button asChild>
            <Link href={`/admin/dashboard/${userId}`}>Dashboard</Link>
          </Button>
          <SignOut />
        </div>
      ) : userType === "Professor" ? (
        <div className="flex items-center gap-x-2">
          <Button asChild>
            <Link href="/admin/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/admin/register">Register</Link>
          </Button>
        </div>
      ) : null}
    </div>
  );
}
