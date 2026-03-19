import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muhammad Syakir | Developer & AI Student",
  description:
    "Personal portfolio of Muhammad Syakir — Developer, AI Student at Singapore Polytechnic. Building at the intersection of AI and web development.",
  keywords: [
    "Muhammad Syakir",
    "developer",
    "portfolio",
    "Singapore",
    "AI",
    "web development",
    "Singapore Polytechnic",
  ],
  authors: [{ name: "Muhammad Syakir" }],
  openGraph: {
    title: "Muhammad Syakir | Developer & AI Student",
    description:
      "Developer & AI Student building the future, one line of code at a time.",
    url: "https://mdsyakir.com",
    siteName: "mdsyakir",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Syakir | Developer & AI Student",
    description:
      "Developer & AI Student building the future, one line of code at a time.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
