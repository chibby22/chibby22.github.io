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

    if (normaliseText(body.website, 100)) {
      return NextResponse.json({ ok: true });
    }

    const name = normaliseText(body.name, 120);
    const email = validEmail(body.email);
    const events = normaliseText(body.events, 1000);
    const consent = body.consent === true;

    if (!name || !email || !consent) {
      return NextResponse.json({ error: "Please complete the required fields." }, { status: 400 });
    }

    if (!(await verifyRecaptcha(body.recaptchaToken, request))) {
      return NextResponse.json({ error: "Captcha verification failed." }, { status: 400 });
    }

      await forwardToFormSubmit({
      _subject: `Kynected Events Interest — ${name}`,
      form_type: "events_mailing_list",
      name,
      email,
      events_interested_in: events || "None specified",
      consent: "yes",
      date: new Date().toISOString()
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Events route failed", error);
    return NextResponse.json({ error: "Unable to register your interest right now." }, { status: 500 });
  }
}