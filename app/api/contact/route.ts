import { NextResponse } from "next/server";
import {
  forwardToFormSubmit,
  normaliseText,
  originAllowed,
  validEmail,
  verifyRecaptcha
} from "@/lib/security";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    if (!originAllowed(request)) {
      return NextResponse.json({ error: "Request origin not allowed." }, { status: 403 });
    }

    const body = await request.json();

    // Honeypot. Humans never fill this field.
    if (normaliseText(body.website, 100)) {
      return NextResponse.json({ ok: true });
    }

    const name = normaliseText(body.name, 120);
    const email = validEmail(body.email);
    const service = normaliseText(body.service, 120);
    const message = normaliseText(body.message, 3000);

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Please complete the required fields." }, { status: 400 });
    }

    if (!(await verifyRecaptcha(body.recaptchaToken, request))) {
      return NextResponse.json({ error: "Captcha verification failed." }, { status: 400 });
    }

  
// Everything above this point has already:
// 1. Checked that the request came from an allowed domain.
// 2. Checked the hidden honeypot field.
// 3. Validated the visitor's name/email/message.
// 4. Verified Google reCAPTCHA using the PRIVATE secret key.
//
// Only after those checks do we forward the message to FormSubmit.

await forwardToFormSubmit({
  // This becomes the subject of the email you receive.
  _subject: `Kynected enquiry — ${
    service || "General enquiry"
  } — ${name}`,

  // Useful for identifying which form produced the email.
  form_type: "contact",

  // Keeps the service category clear in your received emails.
  category: service || "General enquiry",

  name,
  email,

  // Your existing dropdown value gets passed here.
  service: service || "General enquiry",

  message,
});

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact route failed", error);
    return NextResponse.json({ error: "Unable to send your message right now." }, { status: 500 });
  }
}
