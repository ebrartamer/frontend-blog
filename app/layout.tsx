"use client"

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { usePathname } from "next/navigation";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased ` }>
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {!pathname.startsWith('/dashboard') && <Navbar />}
            <main className="px-1">{children}</main>
            {!pathname.startsWith('/dashboard') && ''}
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
