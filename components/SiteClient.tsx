"use client";

import { useEffect } from "react";
import { homeMarkup } from "@/lib/homeMarkup";

declare global {
  interface Window {
    grecaptcha?: {
      render: (container: string | HTMLElement, options: Record<string, unknown>) => number;
      getResponse: (widgetId?: number) => string;
      reset: (widgetId?: number) => void;
    };
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

function setStatus(el: HTMLElement | null, kind: "success" | "error", message: string) {
  if (!el) return;
  el.className = `events-form-status ${kind}`;
  el.textContent = message;
}

export default function SiteClient() {
  useEffect(() => {
    const cleanup: Array<() => void> = [];
    let contactWidget: number | undefined;
    let eventsWidget: number | undefined;

    // Current year
    const year = document.getElementById("current-year");
    if (year) year.textContent = String(new Date().getFullYear());

    // Cookie consent + analytics
    const COOKIE_KEY = "kynected_consent_v2";
    const cookieGate = document.getElementById("cookie-gate");
    const cookieBackdrop = document.getElementById("cookie-backdrop");
    const analyticsToggle = document.getElementById("analytics-toggle") as HTMLInputElement | null;

    const showCookieGate = () => {
      cookieGate?.classList.add("visible");
      cookieBackdrop?.classList.add("visible");
      document.body.classList.add("cookie-gate-active");
    };

    const hideCookieGate = () => {
      cookieGate?.classList.remove("visible");
      cookieBackdrop?.classList.remove("visible");
      document.body.classList.remove("cookie-gate-active");
    };

    let analyticsLoaded = false;
    const loadAnalytics = () => {
      if (analyticsLoaded) return;
      analyticsLoaded = true;

      const external = document.createElement("script");
      external.src = "https://www.googletagmanager.com/gtag/js?id=G-5T3MKLB90Q";
      external.async = true;
      document.head.appendChild(external);

      window.dataLayer = window.dataLayer || [];
      window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
      window.gtag("js", new Date());
      window.gtag("config", "G-5T3MKLB90Q");
    };

    const readConsent = () => {
      try {
        const raw = localStorage.getItem(COOKIE_KEY) || sessionStorage.getItem(COOKIE_KEY);
        return raw ? (JSON.parse(raw) as { level?: string }) : null;
      } catch {
        return null;
      }
    };

    const saveConsent = (level: "all" | "essential") => {
      const payload = JSON.stringify({ level, date: Date.now() });
      try {
        localStorage.setItem(COOKIE_KEY, payload);
      } catch {
        sessionStorage.setItem(COOKIE_KEY, payload);
      }
      hideCookieGate();
      if (level === "all") loadAnalytics();
    };

    const stored = readConsent();
    if (!stored) showCookieGate();
    else {
      hideCookieGate();
      if (stored.level === "all") loadAnalytics();
    }

    const bindClick = (id: string, handler: () => void) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener("click", handler);
      cleanup.push(() => el.removeEventListener("click", handler));
    };

    bindClick("cookie-accept-all", () => saveConsent("all"));
    bindClick("cookie-essential-only", () => saveConsent("essential"));
    bindClick("cookie-save-custom", () => saveConsent(analyticsToggle?.checked ? "all" : "essential"));
    bindClick("cookie-reopen", () => {
      const value = readConsent();
      if (analyticsToggle) analyticsToggle.checked = value ? value.level === "all" : true;
      showCookieGate();
    });

    // Mobile menu
    const navbarToggler = document.querySelector(".navbar-toggler");
    const mobileNav = document.querySelector(".mobile-nav");
    const toggleMenu = () => {
      const open = mobileNav?.classList.toggle("active") ?? false;
      navbarToggler?.setAttribute("aria-expanded", String(open));
    };
    navbarToggler?.addEventListener("click", toggleMenu);
    cleanup.push(() => navbarToggler?.removeEventListener("click", toggleMenu));

    // Smooth scroll
    document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
      const handler = (e: Event) => {
        const targetId = anchor.getAttribute("href");
        if (!targetId || targetId === "#") return;
        const target = document.querySelector(targetId);
        if (!target) return;
        e.preventDefault();
        const header = document.querySelector(".site-header") as HTMLElement | null;
        const offset = header?.offsetHeight ?? 70;
        window.scrollTo({
          top: (target as HTMLElement).getBoundingClientRect().top + window.scrollY - offset,
          behavior: "smooth"
        });
        mobileNav?.classList.remove("active");
        navbarToggler?.setAttribute("aria-expanded", "false");
      };
      anchor.addEventListener("click", handler);
      cleanup.push(() => anchor.removeEventListener("click", handler));
    });

    // Hero typing and taglines
    const typingEl = document.getElementById("typing-text");
    const taglineEl = document.getElementById("cycling-tagline");
    const text = "KYNECTED";
    let typeIndex = 0;
    const timerIds: number[] = [];

    const typeWriter = () => {
      if (!typingEl || typeIndex >= text.length) return;
      typingEl.textContent = `${typingEl.textContent || ""}${text.charAt(typeIndex++)}`;
      timerIds.push(window.setTimeout(typeWriter, 140));
    };
    typeWriter();

    const taglines = ["One call, simplify your life...", "One call, get connected...", "One call for every solution!"];
    let taglineIndex = 0;
    const cycleTaglines = () => {
      if (!taglineEl || taglineIndex >= taglines.length) return;
      taglineEl.style.opacity = "0";
      timerIds.push(window.setTimeout(() => {
        taglineEl.textContent = taglines[taglineIndex++];
        taglineEl.style.opacity = "1";
        timerIds.push(window.setTimeout(cycleTaglines, 1500));
      }, 500));
    };
    timerIds.push(window.setTimeout(cycleTaglines, text.length * 150 + 500));
    cleanup.push(() => timerIds.forEach(window.clearTimeout));

    // Particle canvas
    const canvas = document.getElementById("particle-canvas") as HTMLCanvasElement | null;
    let raf = 0;
    if (canvas && window.innerWidth > 768) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        type Particle = { x: number; y: number; dx: number; dy: number; size: number; color: string };
        let particles: Particle[] = [];
        const mouse: { x: number | null; y: number | null } = { x: null, y: null };
        const colours = ["rgba(233,159,71,0.2)", "rgba(0,168,150,0.2)"];

        const resize = () => {
          canvas.width = window.innerWidth;
          canvas.height = canvas.parentElement?.clientHeight ?? 500;
          const count = Math.max(20, Math.round((canvas.width * canvas.height) / 9000));
          particles = Array.from({ length: count }, () => {
            const size = Math.random() * 5 + 1;
            return {
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height,
              dx: (Math.random() - 0.5) * 0.4,
              dy: (Math.random() - 0.5) * 0.4,
              size,
              color: colours[Math.floor(Math.random() * colours.length)]
            };
          });
        };

        const mouseMove = (e: MouseEvent) => {
          const rect = canvas.getBoundingClientRect();
          mouse.x = e.clientX - rect.left;
          mouse.y = e.clientY - rect.top;
        };

        const draw = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          particles.forEach((p) => {
            if (p.x > canvas.width || p.x < 0) p.dx *= -1;
            if (p.y > canvas.height || p.y < 0) p.dy *= -1;

            if (mouse.x !== null && mouse.y !== null) {
              const dx = mouse.x - p.x;
              const dy = mouse.y - p.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 150 + p.size) {
                p.x -= dx * 0.02;
                p.y -= dy * 0.02;
              }
            }

            p.x += p.dx;
            p.y += p.dy;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
          });
          raf = requestAnimationFrame(draw);
        };

        resize();
        draw();
        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", mouseMove);
        cleanup.push(() => {
          cancelAnimationFrame(raf);
          window.removeEventListener("resize", resize);
          window.removeEventListener("mousemove", mouseMove);
        });
      }
    }

    // Accordion
    document.querySelectorAll<HTMLElement>(".accordion-service-btn").forEach((button) => {
      const handler = () => {
        const panelId = button.getAttribute("aria-controls");
        const panel = panelId ? document.getElementById(panelId) : null;
        const wasOpen = panel?.classList.contains("open") ?? false;

        document.querySelectorAll<HTMLElement>(".accordion-service-btn").forEach((b) => {
          const id = b.getAttribute("aria-controls");
          if (id) document.getElementById(id)?.classList.remove("open");
          b.classList.remove("active");
          b.setAttribute("aria-expanded", "false");
        });

        if (!wasOpen && panel) {
          panel.classList.add("open");
          button.classList.add("active");
          button.setAttribute("aria-expanded", "true");
        }
      };
      button.addEventListener("click", handler);
      cleanup.push(() => button.removeEventListener("click", handler));
    });

    // Flip cards
    document.querySelectorAll<HTMLElement>(".flip-card").forEach((card) => {
      const handler = () => {
        if (window.innerWidth > 768) card.classList.toggle("flipped");
      };
      card.addEventListener("click", handler);
      cleanup.push(() => card.removeEventListener("click", handler));
    });

    // Cleaning tabs
    document.querySelectorAll<HTMLElement>(".cleaning-tab").forEach((tab) => {
      const handler = () => {
        document.querySelectorAll<HTMLElement>(".cleaning-tab").forEach((t) => {
          t.classList.remove("active");
          t.setAttribute("aria-selected", "false");
        });
        document.querySelectorAll<HTMLElement>(".cleaning-tab-panel").forEach((p) => p.classList.remove("active"));
        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");
        if (tab.dataset.target) document.getElementById(tab.dataset.target)?.classList.add("active");
      };
      tab.addEventListener("click", handler);
      cleanup.push(() => tab.removeEventListener("click", handler));
    });

    // Fade-in
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
    cleanup.push(() => observer.disconnect());

    // ---------------------------------------------
// GOOGLE reCAPTCHA
// ---------------------------------------------
// The public SITE_KEY is safe to use in browser code.
//
// The private secret key is NEVER used here.
// It stays inside .env.local and is only accessed
// by our Next.js server API routes.
//
// Google reCAPTCHA loads asynchronously.
// We use Google's onload callback so render()
// only runs once the full reCAPTCHA library is ready.

const renderCaptcha = () => {
  // Make sure:
  // 1. We actually have a site key.
  // 2. Google's API exists.
  // 3. render() is fully available.
  if (
    !SITE_KEY ||
    !window.grecaptcha ||
    typeof window.grecaptcha.render !== "function"
  ) {
    return;
  }

  const contact = document.getElementById("contact-recaptcha");
  const events = document.getElementById("events-recaptcha");

  // Only create each widget once.
  if (contact && contactWidget === undefined) {
    contactWidget = window.grecaptcha.render(contact, {
      sitekey: SITE_KEY,
    });
  }

  if (events && eventsWidget === undefined) {
    eventsWidget = window.grecaptcha.render(events, {
      sitekey: SITE_KEY,
    });
  }
};

if (SITE_KEY) {
  // Google will call this global function once
  // reCAPTCHA and its dependencies are ready.
  const callbackName = "kynectedRecaptchaLoaded";

  (window as any)[callbackName] = () => {
    renderCaptcha();
  };

  // Prevent duplicate Google scripts during
  // Next.js hot reloads in development.
  const existingScript = document.querySelector(
    'script[src*="google.com/recaptcha/api.js"]'
  );

  if (!existingScript) {
    const script = document.createElement("script");

    script.src =
      `https://www.google.com/recaptcha/api.js` +
      `?onload=${callbackName}&render=explicit`;

    script.async = true;
    script.defer = true;

    document.head.appendChild(script);

    cleanup.push(() => {
      script.remove();
      delete (window as any)[callbackName];
    });
  } else if (
    window.grecaptcha &&
    typeof window.grecaptcha.render === "function"
  ) {
    // Handles Next.js development hot reloads.
    renderCaptcha();
  }
}

    // Events form
    const otherCheck = document.getElementById("evt-other-check") as HTMLInputElement | null;
    const otherField = document.getElementById("other-event-field") as HTMLElement | null;
    const otherHandler = () => {
      if (otherField && otherCheck) otherField.style.display = otherCheck.checked ? "block" : "none";
    };
    otherCheck?.addEventListener("change", otherHandler);
    cleanup.push(() => otherCheck?.removeEventListener("change", otherHandler));

    const eventSubmit = document.getElementById("evtSubmitBtn") as HTMLButtonElement | null;
    const eventHandler = async () => {
      const name = (document.getElementById("evtName") as HTMLInputElement | null)?.value.trim() || "";
      const email = (document.getElementById("evtEmail") as HTMLInputElement | null)?.value.trim() || "";
      const consent = (document.getElementById("mailing-consent") as HTMLInputElement | null)?.checked ?? false;
      const website = (document.getElementById("evtWebsite") as HTMLInputElement | null)?.value || "";
      const status = document.getElementById("events-form-status");

      if (!name || !email.includes("@") || !consent) {
        setStatus(status, "error", "Please enter your name, a valid email and tick the consent box.");
        return;
      }

      const selected = Array.from(
        document.querySelectorAll<HTMLInputElement>('#events-form input[type="checkbox"]:checked')
      )
        .filter((cb) => cb.id !== "mailing-consent" && cb.id !== "evt-other-check")
        .map((cb) => cb.value);

      if (otherCheck?.checked) {
        const detail = (document.getElementById("evtOtherDetail") as HTMLInputElement | null)?.value.trim();
        if (detail) selected.push(`Other: ${detail}`);
      }

      // Only ask Google for a response after
// an actual reCAPTCHA widget exists.
const recaptchaToken =
  eventsWidget !== undefined &&
  window.grecaptcha &&
  typeof window.grecaptcha.getResponse === "function"
    ? window.grecaptcha.getResponse(eventsWidget)
    : "";
      if (!recaptchaToken) {
        setStatus(status, "error", "Please complete the captcha.");
        return;
      }

      if (eventSubmit) {
        eventSubmit.disabled = true;
        eventSubmit.textContent = "Sending...";
      }

      try {
        const res = await fetch("/api/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            events: selected.join(", ") || "None specified",
            consent,
            website,
            recaptchaToken
          })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Unable to register.");
        setStatus(status, "success", "You’re on the list! We’ll be in touch when dates are confirmed.");
        (document.getElementById("evtName") as HTMLInputElement).value = "";
        (document.getElementById("evtEmail") as HTMLInputElement).value = "";
        document.querySelectorAll<HTMLInputElement>('#events-form input[type="checkbox"]').forEach((cb) => {
          cb.checked = false;
        });
        if (otherField) otherField.style.display = "none";
        const detail = document.getElementById("evtOtherDetail") as HTMLInputElement | null;
        if (detail) detail.value = "";
        window.grecaptcha?.reset(eventsWidget);
        window.gtag?.("event", "event_registration", {
          event_category: "Engagement",
          event_interest: selected.join(", "),
          value: 1
        });
      } catch (error) {
        setStatus(status, "error", error instanceof Error ? error.message : "Unable to register right now.");
      } finally {
        if (eventSubmit) {
          eventSubmit.disabled = false;
          eventSubmit.textContent = "Register Interest";
        }
      }
    };
    eventSubmit?.addEventListener("click", eventHandler);
    cleanup.push(() => eventSubmit?.removeEventListener("click", eventHandler));

    // Contact form
    const contactForm = document.getElementById("contact-form") as HTMLFormElement | null;
    const contactHandler = async (e: Event) => {
      e.preventDefault();
      if (!contactForm) return;

      const status = document.getElementById("contact-form-status");
      const button = document.getElementById("contact-submit") as HTMLButtonElement | null;
      const formData = new FormData(contactForm);
      const recaptchaToken =
  contactWidget !== undefined &&
  window.grecaptcha &&
  typeof window.grecaptcha.getResponse === "function"
    ? window.grecaptcha.getResponse(contactWidget)
    : "";

      if (!recaptchaToken) {
        setStatus(status, "error", "Please complete the captcha.");
        return;
      }

      if (button) {
        button.disabled = true;
        button.textContent = "Sending...";
      }

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.get("name"),
            email: formData.get("email"),
            service: formData.get("service"),
            message: formData.get("message"),
            website: formData.get("website"),
            recaptchaToken
          })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Unable to send.");
        setStatus(status, "success", "Thanks. Your message has been sent.");
        contactForm.reset();
        window.grecaptcha?.reset(contactWidget);
      } catch (error) {
        setStatus(status, "error", error instanceof Error ? error.message : "Unable to send your message right now.");
      } finally {
        if (button) {
          button.disabled = false;
          button.textContent = "Send Message";
        }
      }
    };
    contactForm?.addEventListener("submit", contactHandler);
    cleanup.push(() => contactForm?.removeEventListener("submit", contactHandler));

    return () => cleanup.forEach((fn) => fn());
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: homeMarkup }} />;
}
