import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Background from "./components/Background";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ArchiveSearch",
  description: "Discover the world's knowledge through advanced search",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    
      <body
        className={`${inter.className} relative min-h-screen w-full text-white overflow-x-hidden`}
      >
        <Background />
        {children}

        <footer
          className="absolute bottom-0 left-0 right-0 z-10 p-4 
                         flex flex-col sm:flex-row items-center justify-center 
                         gap-1 sm:gap-2 text-center text-xs text-gray-500"
        >
          <span>© 2025 ArchiveSearch. All rights reserved.</span>
          <span className="hidden sm:inline">|</span>
          <Link
            href="/docs"
            className="p-1 rounded-md font-semibold text-cyan-400 
                       transition-all duration-300 hover:text-cyan-300 
                       hover:shadow-[0_0_15px_2px_rgba(6,182,212,0.5)] 
                       focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            Click here to visit our docs
          </Link>
        </footer>

        <div id="modal-root" />
      </body>
    </html>
  );
}
