import "./globals.css";

export const metadata = {
  title: "Shaloz Luxury Store — Timeless Luxury & Style",
  description:
    "Discover the finest luxury bags, designer shoes, dresses, watches, and accessories curated for the discerning few.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
