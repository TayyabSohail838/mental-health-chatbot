import { Geist, Geist_Mono } from "next/font/google";
import React from "react";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main
      className={`${geistSans.className} ${geistMono.className} flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black md:px-50`}
    >
      {children}
    </main>
  );
};

export default Layout;
