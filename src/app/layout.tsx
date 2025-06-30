import type { Metadata } from "next";
import { Roboto as FontSans } from "next/font/google";
import "./globals.css";

const fontSans = FontSans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});


export const metadata: Metadata = {
  title: "Summo - AI PDF Summarizer",
  description: "Save hours of reading time. Summo is a tool that helps you summarize articles and documents using AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
