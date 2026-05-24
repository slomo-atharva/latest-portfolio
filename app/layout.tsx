import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteLoader } from "@/components/ui/site-loader";
import "./globals.css";

const dmSans = localFont({
  src: [
    {
      path: "../public/fonts/dm-sans-300.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/dm-sans-400.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/dm-sans-500.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/dm-sans-600.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Siddhant | Product Designer",
  description:
    "A product designer building thoughtful consumer experiences with polished motion and sharp visual systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} antialiased`}>
        <SiteLoader />
        {children}
      </body>
    </html>
  );
}
