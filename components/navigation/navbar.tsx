import Logo from "./logo";
import NavLinks from "./navlinks";

export default function Navbar() {
	return (
		<nav className="fixed top-0 z-50 p-6 flex w-full justify-between bg-white">
			<Logo />
			<NavLinks />
		</nav>
	);
}
