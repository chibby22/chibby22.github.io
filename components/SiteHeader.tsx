"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    setTheme(nextTheme);

    try {
      localStorage.setItem("kynected-theme", nextTheme);
    } catch (error) {
      console.error("Could not save the Kynected theme preference.", error);
    }
  };

  return (
    <header className="kn-header">
      <div className="kn-header-inner">
        <Link className="kn-brand" href="/" aria-label="Kynected home" onClick={() => setMenuOpen(false)}>
          <span className="kn-brand-mark">
            <Image
              src="/images/justK_trans.png"
              alt=""
              width={1330}
              height={1183}
              sizes="(max-width: 520px) 50px, 60px"
              preload
            />
          </span>
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
          <button
            className="kn-theme-toggle"
            type="button"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            aria-pressed={theme === "dark"}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            onClick={toggleTheme}
          >
            <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
