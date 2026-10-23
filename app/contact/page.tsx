import type { Metadata } from "next";
import ContactPage from "@/components/ContactPage";

export const metadata: Metadata = {
  title: "Contact & Consultations | KYNECTED",
  description: "Contact Kynected about creator representation, brand collaborations or home and lifestyle services.",
  alternates: { canonical: "/contact" },
};

export default function Page() {
  return <ContactPage />;
}
