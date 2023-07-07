import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Interlude - Unlock the Power of High-Quality Breaks",
  openGraph: {
    title: "Interlude - Unlock the Power of High-Quality Breaks",
    description:
      "Revolutionize productivity and well-being with Interlude. Empowering individuals and organizations to embrace rejuvenating breaks for optimal performance.",
  },
  keywords: [
    "high-quality breaks",
    "productivity",
    "well-being",
    "rejuvenating breaks",
    "optimal performance",
    "Interlude",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
