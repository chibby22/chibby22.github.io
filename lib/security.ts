const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normaliseText(value: unknown, max = 500) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export function validEmail(value: unknown) {
  const email = normaliseText(value, 254);
  return EMAIL_RE.test(email) ? email : null;
}

export function originAllowed(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  const configured = (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);

  return configured.includes(origin);
}

export async function verifyRecaptcha(token: unknown, request: Request) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret || typeof token !== "string" || !token) return false;

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    cache: "no-store"
  });

  if (!response.ok) return false;
  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}

// Sends validated form data from our Next.js SERVER to FormSubmit.
//
// The endpoint comes from .env.local:
// FORMSUBMIT_ENDPOINT=https://formsubmit.co/ajax/your@email.com
//
// We disable FormSubmit's own captcha because we already validate
// Google reCAPTCHA ourselves before this function is reached.
export async function forwardToFormSubmit(
  payload: Record<string, string>
) {
  const endpoint = process.env.FORMSUBMIT_ENDPOINT;

  // If this variable is missing, stop immediately.
  if (!endpoint) {
    throw new Error("FORMSUBMIT_ENDPOINT is not configured");
  }

  const response = await fetch(endpoint, {
    method: "POST",

    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    // These extra FormSubmit fields control the email format.
    body: JSON.stringify({
      ...payload,

      // Makes the received email easier to read.
      _template: "table",

      // We already verify Google reCAPTCHA server-side.
      _captcha: "false",
    }),

    // Never cache form submissions.
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`FormSubmit returned ${response.status}`);
  }
}
