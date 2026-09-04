import type React from "react";
import type { Metadata, Viewport } from "next";
import { Geist, Syne } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

export const metadata: Metadata = {
  title: "Anna De Feo | Full Stack Developer & Web Designer",
  description:
    "Anna De Feo is a web designer and full-stack developer specializing in websites, digital interfaces, and web applications.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${syne.variable}`}>
        {children}

        <Analytics />
      </body>
    </html>
  );
}
