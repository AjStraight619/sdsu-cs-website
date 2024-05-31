import Logo from "./logo";
import NavLinks from "./navlinks";

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 p-6 flex w-full justify-between bg-white lg:px-32 xl:px-48 2xl:px-60">
      <Logo />
      <NavLinks />
    </nav>
  );
}
