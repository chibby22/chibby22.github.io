import type { Metadata } from "next";
import CreatorPartnershipsPage from "@/components/CreatorPartnershipsPage";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Influencer & Brand Partnerships | Kynected",
  description:
    "Kynected helps brands find and approach creators for promotional collaborations, and supports creators seeking brand opportunities.",
  alternates: { canonical: "/creator-partnerships" },
  openGraph: {
    title: "Influencer & Brand Partnerships | Kynected",
    description:
      "Creator sourcing, brand outreach and partnership support for creators and businesses exploring promotional collaborations.",
    url: "https://kynected.co.uk/creator-partnerships",
    siteName: "Kynected",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Influencer & Brand Partnerships | Kynected",
    description:
      "Creator sourcing, brand outreach and partnership support from Kynected.",
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
              "@id": "https://kynected.co.uk/creator-partnerships#service",
              name: "Creator and Brand Partnerships",
              serviceType: ["Creator partnerships", "Influencer marketing support", "Brand outreach"],
              description:
                "Kynected helps brands identify and approach creators for promotional collaborations and supports creators exploring brand opportunities.",
              provider: { "@id": "https://kynected.co.uk/#organization" },
              url: "https://kynected.co.uk/creator-partnerships",
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://kynected.co.uk/" },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Creator Partnerships",
                  item: "https://kynected.co.uk/creator-partnerships",
                },
              ],
            },
          ],
        }}
      />
      <CreatorPartnershipsPage />
    </>
  );
}
