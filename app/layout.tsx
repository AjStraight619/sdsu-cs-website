import "./globals.css";

import { ThemeProvider } from "@/providers/theme-provider";
import { ReactNode } from "react";

import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
// import Topnav from "@/components/landing-page/topnav";
import { ModeToggle } from "@/components/mode-toggle";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Topnav />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}

function Topnav() {
  return (
    <nav className="top-0 h-16 w-full  border-b border-muted-foreground fixed">
      <div className="flex items-center justify-between px-4 h-full">
        <div></div>
        <ModeToggle />
      </div>
    </nav>
  );
}
