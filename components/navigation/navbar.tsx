import { auth } from "@/auth";
import Logo from "./logo";
import { ReactNode } from "react";
import { SignOut } from "../ui/sign-out-button";
import { Button } from "../ui/button";
import Link from "next/link";

type NavbarProps = {
  children?: ReactNode
}

export default async function Navbar({ children }: NavbarProps) {
  const session = await auth()
  const userId = session?.user?.id
  return (
    <nav className="fixed top-0 z-50 p-6 flex w-full justify-between lg:px-32 xl:px-48 2xl:px-60 backdrop-blur-md border-b">
      <Logo />
      <div className="flex items-center gap-x-2">

        {session ? (
          <div className='flex items-center gap-x-2'>
            <Button asChild>
              <Link href={`/admin/dashboard/${userId}`}>
                Dashboard
              </Link>
            </Button>
            <SignOut />
          </div>
        ) : (
          <div className='flex items-center gap-x-2'>
            <Button asChild>
              <Link href='/admin/login'>
                Sign In
              </Link>
            </Button>
            <Button asChild>
              <Link href='/admin/register'>
                Register
              </Link>
            </Button>
          </div>
        )}

      </div>
      {/* {children} */}
      {/* <NavLinks /> */}
    </nav >
  );
}
