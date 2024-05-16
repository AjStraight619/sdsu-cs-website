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
      <html lang="en" suppressHydrationWarning className="!scroll-smooth">
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
            <div className="pointer-events-none absolute inset-x-0 transform-gpu overflow-hidden blur-3xl sm:-top-80 -z-10">
              <div
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
                className="relative left-[calc(50%)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-red-400 to-red-200 opacity-50 dark:opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              ></div>
            </div>
            <Topnav />
            <main>{children}</main>
          </ThemeProvider>
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
        <ModeToggle />
      </div>
    </nav>
  );
}
