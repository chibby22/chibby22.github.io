"use client";

import { useEffect, useState } from "react";

const CONSENT_KEY = "kynected_consent_v2";

export default function SitePreferences() {
  const [visible, setVisible] = useState(false);
  const [analyticsAllowed, setAnalyticsAllowed] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY) || sessionStorage.getItem(CONSENT_KEY);
      if (!stored) setVisible(true);
      else if ((JSON.parse(stored) as { level?: string }).level === "all") loadAnalytics();
    } catch {
      setVisible(true);
    }

    const open = () => setVisible(true);
    window.addEventListener("kynected:open-cookie-preferences", open);
    return () => window.removeEventListener("kynected:open-cookie-preferences", open);
  }, []);

  const save = (level: "all" | "essential") => {
    const value = JSON.stringify({ level, date: Date.now() });
    try { localStorage.setItem(CONSENT_KEY, value); }
    catch { sessionStorage.setItem(CONSENT_KEY, value); }
    setVisible(false);
    if (level === "all") loadAnalytics();
  };

  return visible ? (
    <div className="kn-consent-backdrop" role="presentation">
      <section className="kn-consent" role="dialog" aria-modal="true" aria-labelledby="consent-title">
        <span className="kn-eyebrow">Your privacy matters</span>
        <h2 id="consent-title">Choose your cookie preferences</h2>
        <p>Essential storage keeps the site working. With your permission, analytics helps us understand how visitors use Kynected.</p>
        <label className="kn-consent-toggle"><input type="checkbox" checked={analyticsAllowed} onChange={(event) => setAnalyticsAllowed(event.target.checked)} /> Allow analytics cookies</label>
        <div className="kn-consent-actions">
          <button type="button" className="kn-button kn-button-secondary" onClick={() => save("essential")}>Essential only</button>
          <button type="button" className="kn-button kn-button-primary" onClick={() => save(analyticsAllowed ? "all" : "essential")}>Save choices</button>
        </div>
      </section>
    </div>
  ) : null;
}

function loadAnalytics() {
  if (document.querySelector('script[data-kynected-analytics="true"]')) return;
  const script = document.createElement("script");
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-5T3MKLB90Q";
  script.async = true;
  script.dataset.kynectedAnalytics = "true";
  document.head.appendChild(script);
  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
  window.gtag("js", new Date());
  window.gtag("config", "G-5T3MKLB90Q");
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
