import SiteClient from "@/components/SiteClient";

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "KYNECTED",
  description:
    "Professional services and free community events in Manchester including PS5 cleaning, laptop repair, phone repair, Airbnb cleaning, handyman, advice, parcel collection and more.",
  url: "https://kynected.co.uk",
  telephone: "+447440034201",
  email: "kynectedsolutions@outlook.com",
  priceRange: "£",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Manchester",
    addressRegion: "Greater Manchester",
    addressCountry: "GB"
  },
  geo: { "@type": "GeoCoordinates", latitude: "53.4808", longitude: "-2.2426" },
  areaServed: { "@type": "City", name: "Manchester" }
};

const faq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do you offer PS5 cleaning in Manchester?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We clean PS5 consoles, PCs, laptops and other electronics across Manchester including internal dust removal, fan cleaning and surface cleaning."
      }
    },
    {
      "@type": "Question",
      name: "Do you offer Airbnb cleaning in Manchester?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Airbnb turnaround cleaning across Manchester with flexible scheduling to fit your guest bookings."
      }
    }
  ]
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <SiteClient />
    </>
  );
}
