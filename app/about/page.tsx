import type { Metadata } from "next";
import AboutPage from "@/components/AboutPage";

export const metadata: Metadata = {
  title: "About Kynected | KYNECTED",
  description: "Learn about Kynected and its creator partnerships and home and lifestyle service divisions.",
  alternates: { canonical: "/about" },
};

export default function Page() {
  return <AboutPage />;
}
