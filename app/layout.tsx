import type { Metadata } from "next";
import Script from "next/script";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import SitePreferences from "@/components/SitePreferences";
import ScrollReveals from "@/components/ScrollReveals";
import JsonLd from "@/components/JsonLd";
import "./multipage.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kynected.co.uk"),
  title: "Kynected | Creator Partnerships & Home Services",
  description:
    "Kynected connects brands with creators and helps creators explore partnerships, alongside cleaning and practical home and lifestyle support.",
  authors: [{ name: "KYNECTED" }],
  icons: { icon: "/images/justK_trans.png" },
  alternates: { canonical: "/" },
  openGraph: {
    title: "Kynected | Creator Partnerships & Home Services",
    description:
      "Kynected connects brands with creators and helps creators explore partnerships, alongside cleaning and practical home and lifestyle support.",
    url: "https://kynected.co.uk",
    type: "website",
    siteName: "Kynected",
    locale: "en_GB",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <Script id="kynected-theme-init" strategy="beforeInteractive">
          {`try {
            const savedTheme = localStorage.getItem("kynected-theme");
            const theme = savedTheme === "light" || savedTheme === "dark"
              ? savedTheme
              : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            document.documentElement.dataset.theme = theme;
          } catch {
            document.documentElement.dataset.theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
          }`}
        </Script>
        <a className="kn-skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <SitePreferences />
        <ScrollReveals />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://kynected.co.uk/#organization",
                name: "Kynected",
                url: "https://kynected.co.uk/",
                logo: "https://kynected.co.uk/images/justK_trans.png",
                email: "kynectedsolutions@outlook.com",
                telephone: "+447440034201",
                sameAs: [
                  "https://www.facebook.com/share/1BMqi7Eixs/?mibextid=wwXIfr",
                  "https://www.instagram.com/kynectedd/",
                ],
                contactPoint: {
                  "@type": "ContactPoint",
                  contactType: "customer enquiries",
                  email: "kynectedsolutions@outlook.com",
                  telephone: "+447440034201",
                  availableLanguage: "English",
                },
              },
              {
                "@type": "WebSite",
                "@id": "https://kynected.co.uk/#website",
                name: "Kynected",
                url: "https://kynected.co.uk/",
                publisher: { "@id": "https://kynected.co.uk/#organization" },
                inLanguage: "en-GB",
              },
            ],
          }}
        />
      </body>
    </html>
  );
}
