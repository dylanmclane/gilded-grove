import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import ConditionalNavigation from "./components/ConditionalNavigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gilded Grove",
  description: "Discreet estate inventory management for modern luxury.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased font-sans">
        <ConditionalNavigation />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
