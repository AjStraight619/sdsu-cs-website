import "./globals.css";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/navigation/navbar";
import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";

const fontPoppins = Poppins({
	subsets: ["latin"],
	variable: "--font-poppins",
	weight: ["500"],
});

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<html lang="en" suppressHydrationWarning className="!scroll-smooth">
				<body
					className={cn(
						"min-h-screen font-inter antialiased",
						inter.variable,
						fontPoppins.variable
					)}
				>
					<Navbar />
					<main>{children}</main>
					{/* <Toaster /> */}
				</body>
			</html>
		</>
	);
}
