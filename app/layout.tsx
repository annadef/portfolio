import type React from "react";
import type { Metadata, Viewport } from "next";
import { Syne } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { FloatingDock } from "@/components/ui/floating-dock";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

export const metadata: Metadata = {
  title: "Portfolio Anna De Feo",
  description:
    "Portfolio personale di Anna De Feo - Web Designer & Full Stack Developer",
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
    <html lang="it">
      <body className={`${syne.variable}`}>
        {children}

        <Analytics />

        <FloatingDock
          items={[
            {
              title: "Mail",
              icon: <Mail className="h-full w-full text-inherit" />,
              href: "mailto:annadefeo91@outlook.it",
            },
            {
              title: "Instagram",
              icon: <Instagram className="h-full w-full text-inherit" />,
              href: "https://www.instagram.com/anna_de_feo_?igsh=N2ZweHhuM3lkOTcx&igsi=N2ZweHhuM3lkOTcx",
            },
            {
              title: "LinkedIn",
              icon: <Linkedin className="h-full w-full text-inherit" />,
              href: "https://www.linkedin.com/in/anna-de-feo-201715235/",
            },
            {
              title: "Github",
              icon: <Github className="h-full w-full text-inherit" />,
              href: "https://github.com/annadef",
            },
          ]}
        />
      </body>
    </html>
  );
}
