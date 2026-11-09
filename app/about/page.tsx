import type { Metadata } from "next";
import AboutPage from "@/components/AboutPage";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "About Kynected | Creator & Home Support",
  description:
    "Learn how Kynected connects brands with creators and helps people explore practical home and lifestyle support.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Kynected | Creator & Home Support",
    description:
      "Get to know Kynected’s creator and brand partnership work and practical home and lifestyle services.",
    url: "https://kynected.co.uk/about",
    siteName: "Kynected",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "About Kynected | Creator & Home Support",
    description:
      "Learn about Kynected’s creator partnerships and practical home and lifestyle support.",
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
            { "@type": "ListItem", position: 2, name: "About", item: "https://kynected.co.uk/about" },
          ],
        }}
      />
      <AboutPage />
    </>
  );
}
