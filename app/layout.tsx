import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";





export const metadata: Metadata = {
  title: "تی-شاپ",
  description: "فروشگاهی برای همه",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa">
      <body>
        {children}
      </body>
    </html>
  );
}
