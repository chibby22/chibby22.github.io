"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/creator-partnerships", label: "Creator Partnerships" },
  { href: "/home-lifestyle", label: "Home & Lifestyle" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="kn-header">
      <div className="kn-header-inner">
        <Link className="kn-brand" href="/" aria-label="Kynected home" onClick={() => setMenuOpen(false)}>
          <span className="kn-brand-mark"><Image src="/images/K_LOGO.png" alt="" width={48} height={48} priority /></span>
          <span className="kn-brand-word">KYNECTED<span>.</span></span>
        </Link>
        <button
          className="kn-menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span /><span /><span />
        </button>
        <nav id="primary-navigation" className={`kn-nav${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link className="kn-nav-cta" href="/contact?type=general" onClick={() => setMenuOpen(false)}>Let’s talk <span aria-hidden="true">↗</span></Link>
        </nav>
      </div>
    </header>
  );
}
