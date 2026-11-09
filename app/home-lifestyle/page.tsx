import type { Metadata } from "next";
import HomeLifestylePage from "@/components/HomeLifestylePage";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Cleaning & Home Services | Kynected",
  description:
    "Ask Kynected about home, short-let and office cleaning, concierge errands, minor repairs, furniture assembly and everyday technology support.",
  alternates: { canonical: "/home-lifestyle" },
  openGraph: {
    title: "Cleaning & Home Services | Kynected",
    description:
      "Explore cleaning, concierge, minor repairs, furniture assembly and everyday technology support. Availability depends on service and location.",
    url: "https://kynected.co.uk/home-lifestyle",
    siteName: "Kynected",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Cleaning & Home Services | Kynected",
    description:
      "Cleaning, concierge, minor repairs and practical home support. Availability depends on service and location.",
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              "@id": "https://kynected.co.uk/home-lifestyle#service",
              name: "Home and Lifestyle Services",
              serviceType: [
                "Cleaning services",
                "Personal concierge",
                "Minor home repairs",
                "Furniture assembly",
                "Everyday technology support",
              ],
              description:
                "Kynected offers cleaning, concierge, minor repair, furniture assembly and everyday technology support enquiries. Availability depends on service and location.",
              provider: { "@id": "https://kynected.co.uk/#organization" },
              url: "https://kynected.co.uk/home-lifestyle",
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://kynected.co.uk/" },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Home & Lifestyle",
                  item: "https://kynected.co.uk/home-lifestyle",
                },
              ],
            },
          ],
        }}
      />
      <HomeLifestylePage />
    </>
  );
}
