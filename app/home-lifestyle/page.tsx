import type { Metadata } from "next";
import HomeLifestylePage from "@/components/HomeLifestylePage";

export const metadata: Metadata = {
  title: "Home & Lifestyle Services | KYNECTED",
  description: "Explore cleaning, concierge, handyman, furniture assembly and everyday electronics support from Kynected.",
  alternates: { canonical: "/home-lifestyle" },
};

export default function Page() {
  return <HomeLifestylePage />;
}
