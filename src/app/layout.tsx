import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Muhammad Syakir — Developer & AI Student",
  description:
    "Developer & AI Student from Singapore, building at the intersection of AI and web development.",
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
    title: "Muhammad Syakir — Developer & AI Student",
    description:
      "Developer & AI Student building the future, one line of code at a time.",
    url: "https://mdsyakir.com",
    siteName: "mdsyakir",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={kanit.className} suppressHydrationWarning>
      <body
        className="min-h-screen antialiased"
        style={{ fontFamily: "'Kanit', sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
