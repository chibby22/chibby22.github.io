import type { Metadata } from "next";
import HomePage from "@/components/HomePage";

export const metadata: Metadata = {
  title: "Connections That Make Life Easier | KYNECTED",
  description: "Kynected connects creators with brand opportunities and helps people find practical home and lifestyle support.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return <HomePage />;
}
