import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Craft and Code | Enterprise Software Development Company",
  description:
    "Craft and Code is a premier enterprise software development agency in Bangalore, India. We engineer scalable digital products, cloud platforms, and custom software solutions for global leaders.",
  keywords: [
    "Craft and Code",
    "Software Development Company",
    "Enterprise Software Solutions",
    "Custom Software Development Bangalore",
    "Full-Stack Web Development",
    "Digital Product Engineering",
  ],
  authors: [{ name: "Craft and Code" }],
  creator: "Craft and Code",
  openGraph: {
    title: "Craft and Code | Enterprise Software Development Company",
    description:
      "Architecting high-impact digital products, cloud platforms, and enterprise software solutions.",
    url: "https://craftandcode.com",
    siteName: "Craft and Code",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Craft and Code | Enterprise Software Engineering",
    description:
      "Driving business growth with scalable enterprise-grade software solutions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
