import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteLayout from "@/components/SiteLayout";

const inter = Inter({ subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  title: "Taxi Ústí nad Labem | NONSTOP taxislužba 24/7",
  description:
    "Spolehlivá taxislužba v Ústí nad Labem. NONSTOP provoz, komfortní vozy Škoda Superb, přeprava na letiště. Volejte +420 777 036 926.",
  keywords:
    "taxi ústí nad labem, taxi nonstop ústí, taxi letiště praha, taxi drážďany",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body className={inter.className}>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
