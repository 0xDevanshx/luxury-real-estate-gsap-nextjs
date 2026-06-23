import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "./providers/SmoothScrollProvider";
import GlobalInteractiveLayer from "@/components/global/GlobalInteractiveLayer";
import StickyHeader from "@/components/global/StickyHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Luxe Estates | Pinnacle Architectural Design",
  description: "The intersection of high fashion and pinnacle architectural design. Navigate the ultra-luxury market with unparalleled precision.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        <SmoothScrollProvider>
          <GlobalInteractiveLayer />
          <StickyHeader />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
