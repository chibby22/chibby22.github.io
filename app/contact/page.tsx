import type { Metadata } from "next";
import ContactPage from "@/components/ContactPage";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Contact Kynected | Creator & Home Services",
  description:
    "Contact Kynected about creator and brand partnerships, cleaning, or practical home and lifestyle support.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Kynected | Creator & Home Services",
    description:
      "Tell Kynected what you need help with, from creator partnerships to cleaning and practical home support.",
    url: "https://kynected.co.uk/contact",
    siteName: "Kynected",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact Kynected | Creator & Home Services",
    description:
      "Contact Kynected about creator partnerships, cleaning and home services.",
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://kynected.co.uk/" },
            {
              "@type": "ListItem",
              position: 2,
              name: "Contact",
              item: "https://kynected.co.uk/contact",
            },
          ],
        }}
      />
      <ContactPage />
    </>
  );
}
