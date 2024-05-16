import "./globals.css";

import { ThemeProvider } from "@/providers/theme-provider";
import { ReactNode } from "react";

import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import Topnav from "@/components/landing-page/topnav";

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
