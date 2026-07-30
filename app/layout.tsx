import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import JsonLd from "@/components/json-ld";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.craftandcode.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Craft and Code | Enterprise Software Development Company",
    template: "%s | Craft and Code",
  },
  description:
    "Craft and Code is a premier enterprise software development agency in Bangalore, India. We engineer scalable digital products, cloud platforms, and custom software solutions for global leaders.",
  keywords: [
    "Craft and Code",
    "Software Development Company",
    "Enterprise Software Solutions",
    "Custom Software Development Bangalore",
    "Full-Stack Web Development",
    "Digital Product Engineering",
    "Odoo ERP Customization",
    "ERPNext Development",
    "Cloud DevOps Engineering",
  ],
  authors: [{ name: "Craft and Code", url: siteUrl }],
  creator: "Craft and Code",
  publisher: "Craft and Code",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Craft and Code | Enterprise Software Development Company",
    description:
      "Architecting high-impact digital products, cloud platforms, and enterprise software solutions.",
    url: siteUrl,
    siteName: "Craft and Code",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/craft%20and%20code%20logo.png",
        width: 1200,
        height: 630,
        alt: "Craft and Code Enterprise Software Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Craft and Code | Enterprise Software Engineering",
    description:
      "Driving business growth with scalable enterprise-grade software solutions.",
    images: ["/craft%20and%20code%20logo.png"],
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
      className={`${plusJakartaSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <JsonLd />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}


