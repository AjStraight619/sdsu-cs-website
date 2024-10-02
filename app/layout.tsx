import './globals.css';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';
import Navbar from '@/components/navigation/navbar';
import { Inter } from 'next/font/google';
import { Poppins } from 'next/font/google';
import TypeofUser from '@/components/common/typeof-user';

import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { extractRouterConfig } from 'uploadthing/server';

import { ourFileRouter } from '@/app/api/uploadthing/core';

const fontPoppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['500'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning className="!scroll-smooth">
        <body
          className={cn(
            'min-h-screen font-inter antialiased',
            inter.variable,
            fontPoppins.variable,
          )}
        >
          <NextSSRPlugin
            /**
             * The `extractRouterConfig` will extract **only** the route configs
             * from the router to prevent additional information from being
             * leaked to the client. The data passed to the client is the same
             * as if you were to fetch `/api/uploadthing` directly.
             */
            routerConfig={extractRouterConfig(ourFileRouter)}
          />

          <TypeofUser />
          <Navbar />
          <main>{children}</main>
          <Toaster />
        </body>
      </html>
    </>
  );
}
