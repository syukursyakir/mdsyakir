import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./styles.css";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Jack -- 3D Creator",
};

export default function JackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={kanit.className} style={{ fontFamily: "'Kanit', sans-serif" }}>
      {children}
    </div>
  );
}
