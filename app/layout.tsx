import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Digital Vision - Schweizer Digitalagentur | Webentwicklung & E-Commerce",
  description: "Professionelle digitale Lösungen aus der Schweiz. Webentwicklung, E-Commerce, Cloud-Hosting mit höchsten Schweizer Qualitätsstandards. DSGVO-konform auf Schweizer Servern.",
  keywords: [
    "Schweizer Digitalagentur",
    "Webentwicklung Schweiz", 
    "E-Commerce Lösungen",
    "Cloud Hosting Schweiz",
    "DSGVO konform",
    "TWINT Integration",
    "PostFinance",
    "Schweizer Qualität",
    "Digital Marketing Schweiz",
    "Zürich Webagentur"
  ],
  authors: [{ name: "Digital Vision Team" }],
  creator: "Digital Vision AG",
  publisher: "Digital Vision",
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
    type: "website",
    locale: "de_CH",
    url: "https://digitalvision.ch",
    title: "Digital Vision - Schweizer Digitalagentur",
    description: "Professionelle digitale Lösungen aus der Schweiz. Webentwicklung, E-Commerce, Cloud-Hosting mit höchsten Schweizer Qualitätsstandards.",
    siteName: "Digital Vision",
    images: [
      {
        url: "https://digitalvision.ch/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Digital Vision - Schweizer Digitalagentur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Vision - Schweizer Digitalagentur",
    description: "Professionelle digitale Lösungen aus der Schweiz. Webentwicklung, E-Commerce, Cloud-Hosting mit höchsten Schweizer Qualitätsstandards.",
    images: ["https://digitalvision.ch/og-image.jpg"],
  },
  verification: {
    google: "your-google-verification-code",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
