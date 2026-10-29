"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";

type EnquiryType = "creator" | "brand" | "lifestyle" | "general";
type RecaptchaApi = {
  ready: (callback: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
};

declare global {
  interface Window { grecaptcha?: RecaptchaApi; }
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";
const labels: Record<EnquiryType, string> = {
  creator: "I’m a creator",
  brand: "I’m a business",
  lifestyle: "I need help at home or with everyday tasks",
  general: "Something else",
};
let recaptchaPromise: Promise<void> | undefined;

function getRecaptchaToken(action: string) {
  if (!SITE_KEY) return Promise.reject(new Error("Online enquiry verification is not configured. Please email us instead."));
  if (!recaptchaPromise) {
    recaptchaPromise = new Promise<void>((resolve, reject) => {
      const waitUntilReady = () => {
        const api = window.grecaptcha;
        if (!api?.ready) {
          recaptchaPromise = undefined;
          reject(new Error("We could not load enquiry verification. Please try again."));
          return;
        }
        api.ready(() => resolve());
      };
      if (window.grecaptcha?.ready) {
        waitUntilReady();
        return;
      }
      const existing = document.querySelector<HTMLScriptElement>('script[src*="google.com/recaptcha/api.js"]');
      const script = existing ?? document.createElement("script");
      if (!existing) {
        script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(SITE_KEY)}`;
        script.async = true;
        script.defer = true;
      }
      script.addEventListener("load", waitUntilReady, { once: true });
      script.addEventListener("error", () => {
        recaptchaPromise = undefined;
        reject(new Error("We could not load enquiry verification. Please try again."));
      }, { once: true });
      if (!existing) document.head.appendChild(script);
    });
  }
  return recaptchaPromise.then(async () => {
    if (!window.grecaptcha?.execute) throw new Error("Enquiry verification is unavailable. Please try again.");
    return window.grecaptcha.execute(SITE_KEY, { action });
  });
}

export default function ContactEnquiryForm() {
  const [type, setType] = useState<EnquiryType>("general");
  const [service, setService] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ kind: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedType = params.get("type") as EnquiryType | null;
    if (requestedType && requestedType in labels) setType(requestedType);
    const requestedService = params.get("service");
    if (requestedService) setService(requestedService);
  }, []);

  const changeType = (value: string) => {
    if (value in labels) setType(value as EnquiryType);
    setStatus(null);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setSubmitting(true);
    setStatus(null);
    try {
      const recaptchaToken = await getRecaptchaToken("contact_submit");
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enquiryType: type,
          name: data.get("name"),
          email: data.get("email"),
          service: data.get("service"),
          location: data.get("location"),
          companyName: data.get("companyName"),
          campaignOverview: data.get("campaignOverview"),
          creatorRequirements: data.get("creatorRequirements"),
          profileLink: data.get("profileLink"),
          platform: data.get("platform"),
          niche: data.get("niche"),
          audienceSize: data.get("audienceSize"),
          budget: data.get("budget"),
          timeframe: data.get("timeframe"),
          message: data.get("message"),
          website: data.get("website"),
          recaptchaToken,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "We could not send your enquiry.");
      setStatus({ kind: "success", message: "Your enquiry has been accepted for processing. We’ll be in touch as soon as we can." });
      form.reset();
      setService("");
    } catch (error) {
      setStatus({ kind: "error", message: error instanceof Error ? error.message : "We could not send your enquiry. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="kn-form-card">
      <div className="kn-form-intro"><span className="kn-eyebrow">Send us a message</span><h2>Tell us what you need.</h2><p>We’ll read your message and get back to you.</p></div>
      <form className="kn-contact-form" onSubmit={onSubmit}>
        <label className="kn-field kn-field-full"><span>What do you need help with?</span>
          <select value={type} onChange={(event) => changeType(event.target.value)}>
            {(Object.keys(labels) as EnquiryType[]).map((key) => <option key={key} value={key}>{labels[key]}</option>)}
          </select>
        </label>
        <label className="kn-field"><span>Your name</span><input name="name" type="text" autoComplete="name" maxLength={120} required /></label>
        <label className="kn-field"><span>Email address</span><input name="email" type="email" autoComplete="email" maxLength={254} required />
          <span className="kn-email-suggestions"><span>Quick add:</span>{["@gmail.com", "@yahoo.com", "@outlook.com"].map((domain) => <button type="button" key={domain} onClick={(event) => {
            const input = event.currentTarget.closest(".kn-field")?.querySelector<HTMLInputElement>('input[name="email"]');
            if (!input) return;
            const localPart = input.value.split("@")[0].trim();
            input.value = `${localPart}${domain}`;
            input.focus();
            input.dispatchEvent(new Event("input", { bubbles: true }));
          }}>{domain}</button>)}</span>
        </label>

        {type === "creator" && <>
          <label className="kn-field"><span>Profile link <small>Optional</small></span><input name="profileLink" type="url" placeholder="https://" maxLength={500} /></label>
        </>}

        {type === "brand" && <>
          <label className="kn-field"><span>Company or organisation <small>Optional</small></span><input name="companyName" type="text" autoComplete="organization" maxLength={160} /></label>
        </>}

        {type === "lifestyle" && <>
          <label className="kn-field"><span>Service required</span><select name="service" value={service} onChange={(event) => setService(event.target.value)} required><option value="" disabled>Select a service</option><option value="cleaning">Cleaning</option><option value="concierge">Personal Concierge</option><option value="repairs">Handyman & Repairs</option><option value="assembly-electronics">Furniture Assembly & Electronics Support</option><option value="other-home-service">Other Home & Lifestyle Support</option></select></label>
          <label className="kn-field"><span>General location <small>Optional</small></span><input name="location" type="text" autoComplete="address-level2" maxLength={120} placeholder="Town or postcode area" /></label>
        </>}

        <label className="kn-field kn-field-full"><span>{type === "brand" ? "Tell us about your enquiry." : type === "creator" ? "What would you like help with?" : type === "lifestyle" ? "Description of the service required" : "Tell us about your enquiry."}</span><textarea name="message" rows={5} maxLength={3000} required /></label>
        <input name="website" type="text" className="kn-honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <div className="kn-form-submit kn-field-full">
          <button className="kn-button kn-button-primary" type="submit" disabled={submitting}>{submitting ? "Sending…" : "Send message"}<span aria-hidden="true">↗</span></button>
          <p>We’ll only use these details to reply to your message.</p>
          {status && <div className={`kn-form-status ${status.kind}`} role={status.kind === "error" ? "alert" : "status"} aria-live="polite">{status.message}</div>}
        </div>
      </form>
      <p className="kn-form-alternative">Prefer email? <Link href="mailto:kynectedsolutions@outlook.com">kynectedsolutions@outlook.com</Link></p>
    </div>
  );
}
