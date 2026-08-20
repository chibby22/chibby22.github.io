import type { Metadata } from "next";
import Script from "next/script";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kynected.co.uk"),
  title: "KYNECTED | Cleaning, Repairs & Professional Services in Manchester",
  description:
    "Kynected offers trusted professional services and free community events in Manchester. PS5 cleaning, laptop repair, phone repair, Airbnb cleaning, handyman, advice, parcel collection and more.",
  authors: [{ name: "KYNECTED" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "KYNECTED | Cleaning, Repairs & Community Events in Manchester",
    description:
      "Professional services and free community events in Manchester. PS5 cleaning, laptop repair, Airbnb cleaning, parcel collection, advice and more.",
    url: "https://kynected.co.uk",
    type: "website",
    locale: "en_GB"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script src="https://kit.fontawesome.com/529b0fabf6.js" crossOrigin="anonymous" strategy="afterInteractive" />
      </body>
    </html>
  );
}
