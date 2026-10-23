import type { Metadata } from "next";
import CreatorPartnershipsPage from "@/components/CreatorPartnershipsPage";

export const metadata: Metadata = {
  title: "Creator & Brand Partnerships | KYNECTED",
  description: "Explore creator representation, brand outreach, influencer discovery and campaign partnership support from Kynected.",
  alternates: { canonical: "/creator-partnerships" },
};

export default function Page() {
  return <CreatorPartnershipsPage />;
}
