import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI ROI for Enterprises by Mays School of Business",
  description: "Make AI decisions with finance-grade clarity. Assess the Return on AI (RoAI) for your enterprise initiatives.",
  keywords: ["AI ROI", "Return on AI", "Enterprise AI", "AI Assessment", "Business Analytics"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-background">
          {children}
        </div>
      </body>
    </html>
  );
}
