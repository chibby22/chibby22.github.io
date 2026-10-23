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
    .map((value) => value.trim())
    .filter(Boolean);

  return configured.includes(origin);
}

export async function verifyRecaptcha(
  token: unknown,
  request: Request,
  expectedAction: string
) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret || typeof token !== "string" || !token) return false;

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    cache: "no-store",
  });

  if (!response.ok) return false;

  const result = (await response.json()) as {
    success?: boolean;
    score?: number;
    action?: string;
  };
  const minimumScore = Number(process.env.RECAPTCHA_MIN_SCORE ?? "0.5");

  return (
    result.success === true &&
    result.action === expectedAction &&
    typeof result.score === "number" &&
    result.score >= minimumScore
  );
}

export async function forwardToFormSubmit(
  payload: Record<string, string>,
  requestOrigin: string
) {
  const endpoint = process.env.FORMSUBMIT_ENDPOINT;
  if (!endpoint || !endpoint.startsWith("https://formsubmit.co/ajax/")) {
    throw new Error("FORMSUBMIT_ENDPOINT is missing or invalid");
  }
  let originUrl: URL;
  try {
    originUrl = new URL(requestOrigin);
  } catch {
    throw new Error("Request origin is invalid");
  }
  if (originUrl.origin !== requestOrigin || !["http:", "https:"].includes(originUrl.protocol)) {
    throw new Error("Request origin is invalid");
  }

  const formData = new URLSearchParams();
  for (const [key, value] of Object.entries(payload)) {
    formData.append(key, value);
  }
  formData.append("_template", "table");
  formData.append("_captcha", "false");

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      Origin: originUrl.origin,
      Referer: `${originUrl.origin}/`,
    },
    body: formData.toString(),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`FormSubmit returned HTTP ${response.status}`);
  }

  const result = (await response.json()) as {
    success?: boolean | string;
    message?: string;
  };
  if (result.success !== true && result.success !== "true") {
    throw new Error(result.message || "FormSubmit did not accept the submission");
  }
}
