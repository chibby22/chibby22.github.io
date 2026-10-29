import type { Metadata } from "next";
import HomePage from "@/components/HomePage";

export const metadata: Metadata = {
  title: "KYNECTED | Creator Partnerships & Everyday Support",
  description: "Kynected helps brands connect with creators and individuals and businesses find practical everyday support.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return <HomePage />;
}
