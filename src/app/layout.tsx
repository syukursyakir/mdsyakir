import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Jack -- 3D Creator",
  description:
    "3D Creator portfolio — branding, web design, and unforgettable digital experiences.",
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
