import type { Metadata } from "next";
import Script from "next/script";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import SitePreferences from "@/components/SitePreferences";
import ScrollReveals from "@/components/ScrollReveals";
import "./multipage.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kynected.co.uk"),
  title: "KYNECTED | Creator Partnerships & Home Lifestyle Services",
  description:
    "Kynected connects creators with brand opportunities and helps individuals and businesses find practical home and lifestyle support.",
  authors: [{ name: "KYNECTED" }],
  icons: { icon: "/images/justK_trans.png" },
  alternates: { canonical: "/" },
  openGraph: {
    title: "KYNECTED | Creator Partnerships & Home Lifestyle Services",
    description: "Creator and brand partnership enquiries, plus practical home and lifestyle services from Kynected.",
    url: "https://kynected.co.uk",
    type: "website",
    locale: "en_GB"
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
      </body>
    </html>
  );
}
