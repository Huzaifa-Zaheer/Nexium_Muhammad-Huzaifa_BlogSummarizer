import type { Metadata } from "next";
import { Source_Sans_3 as FontSans } from "next/font/google";
import "./globals.css";

const fontSans = FontSans ({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});


export const metadata: Metadata = {
  title: "SnapSummary - Blog & PDF Summarizer | AI-Powered Article Summaries",
  description:
    "SnapSummary is an AI-powered web app for summarizing blogs, articles, and PDF documents. Instantly get concise, SEO-friendly summaries to save time and boost productivity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${fontSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
