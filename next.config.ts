import type { NextConfig } from "next";
// React uses eval() for development debugging.
// We allow it locally only, never in production.
const isDev = process.env.NODE_ENV === "development";

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "img-src 'self' data: https:",
  "font-src 'self' data: https://fonts.gstatic.com https://ka-f.fontawesome.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net",
  `script-src 'self' 'unsafe-inline' ${
  isDev ? "'unsafe-eval'" : ""
} https://www.google.com https://www.gstatic.com https://kit.fontawesome.com https://www.googletagmanager.com`,
  "frame-src https://www.google.com https://recaptcha.google.com",
  "connect-src 'self' https://www.google.com https://www.google-analytics.com https://region1.google-analytics.com https://ka-f.fontawesome.com"
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" }
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  }
};

export default nextConfig;
