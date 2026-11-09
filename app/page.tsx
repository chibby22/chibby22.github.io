import type { Metadata } from "next";
import HomePage from "@/components/HomePage";

export const metadata: Metadata = {
  title: "Creator Partnerships & Home Services | Kynected",
  description:
    "Kynected connects brands with creators and helps creators explore partnerships, alongside cleaning and practical home and lifestyle support.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Creator Partnerships & Home Services | Kynected",
    description:
      "Connect with Kynected about creator and brand partnerships, cleaning, and practical home and lifestyle support.",
    url: "https://kynected.co.uk/",
    siteName: "Kynected",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Creator Partnerships & Home Services | Kynected",
    description:
      "Creator and brand partnerships, cleaning and practical home and lifestyle support from Kynected.",
  },
};

export default function Home() {
  return <HomePage />;
}
