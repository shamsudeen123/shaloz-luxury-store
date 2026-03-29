import { Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata = {
  title: "Luxe Collection — Timeless Luxury & Style",
  description:
    "Discover the finest luxury bags, designer shoes, dresses, watches, and accessories curated for the discerning few.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  );
}
