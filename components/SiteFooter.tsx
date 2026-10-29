"use client";

import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="kn-footer">
      <div className="kn-footer-main">
        <div className="kn-footer-brand">
          <Link href="/" className="kn-footer-wordmark">KYNECTED<span>.</span></Link>
          <p>One call for every solution! </p>
        </div>
        <div className="kn-footer-links">
          <div><span className="kn-footer-label">Explore</span><Link href="/">Home</Link><Link href="/creator-partnerships">Creator Partnerships</Link><Link href="/home-lifestyle">Home & Lifestyle</Link></div>
          <div><span className="kn-footer-label">Kynected</span><Link href="/about">About</Link><Link href="/contact">Contact</Link></div>
          <div><span className="kn-footer-label">Follow Kynected</span><a href="https://www.facebook.com/share/1BMqi7Eixs/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">Facebook</a><a href="https://www.instagram.com/kynectedd/" target="_blank" rel="noopener noreferrer">Instagram</a></div>
          <div><span className="kn-footer-label">Get in touch</span><a href="mailto:kynectedsolutions@outlook.com">kynectedsolutions@outlook.com</a><a href="tel:+447440034201">07440 034201</a><button type="button" onClick={() => window.dispatchEvent(new Event("kynected:open-cookie-preferences"))}>Cookie Preferences</button></div>
        </div>
      </div>
      <div className="kn-footer-bottom"><span>© {new Date().getFullYear()} Kynected. All rights reserved.</span><span>Manchester, United Kingdom</span></div>
    </footer>
  );
}
