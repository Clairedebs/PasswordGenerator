import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavBar } from "./components/Navbar";
import { ThemeProvider } from "./components/theme-provider";
import { WavyBackground } from "./components/wavy-background";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Randly",
  description: "A password storage and generator",
  authors: [
    {
      name: "Claire Deborah"
    },
  ],
  keywords: [
    "password",
    "storage",
    "generator"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <WavyBackground
        speed="slow"
        containerClassName="fixed inset-0 -z-10 pointer-events-none "
      />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem 
        disableTransitionOnChange
      >
        <Toaster />
        <NavBar/>
        {children}
      </ThemeProvider>
      </body>
    </html>
  );
}
