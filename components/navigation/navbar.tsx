import { auth } from "@/auth";
import Logo from "./logo";
import Auth from "./auth";
import UserType from "./user-type";

export default async function Navbar() {
  const session = await auth();
  const userId = session?.user?.id;
  return (
    <nav className="fixed top-0 z-50 p-6 flex w-full justify-between lg:px-32 xl:px-48 2xl:px-60 backdrop-blur-md border-b">
      <Logo />
      <div className="flex flex-row items-center gap-x-2">
        <UserType />
        <Auth session={session} />
      </div>
    </nav>
  );
}
