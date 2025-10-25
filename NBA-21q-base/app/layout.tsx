import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NBA 21 Questions",
  description: "Guess the NBA player in 21 questions — AI-assisted",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-gray-100 antialiased">{children}</body>
    </html>
  );
}
