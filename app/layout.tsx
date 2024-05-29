import "./globals.css";
import { ReactNode } from "react";
import { Inter as FontSans, Inter, Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/navigation/navbar";

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

const fontPoppins = Poppins({
	subsets: ["latin"],
	variable: "--font-poppins",
	weight: ["500"],
});

const fontInter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<html lang="en" suppressHydrationWarning className="!scroll-smooth">
				<body
					className={cn(
						"min-h-screen m-6 font-sans antialiased",
						fontSans.variable,
						fontPoppins.variable
					)}
				>
					<Navbar />
					<main>{children}</main>
					<Toaster />
				</body>
			</html>
		</>
	);
}

function Topnav() {
	return (
		<nav className="top-0 h-16 w-full  border-b border-muted-foreground fixed bg-background">
			<div className="flex items-center justify-between px-4 h-full">
				<div></div>
				{/* <ModeToggle /> */}
			</div>
		</nav>
	);
}
