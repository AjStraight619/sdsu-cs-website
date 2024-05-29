import Logo from "./logo";
import NavLinks from "./navlinks";

export default function Navbar() {
	return (
		<nav className="flex w-full justify-between">
			<Logo />
			<NavLinks />
		</nav>
	);
}
