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
    const enquiryType = normaliseText(body.enquiryType, 40);
    const allowedEnquiryTypes = new Set(["creator", "brand", "lifestyle", "general"]);

    if (!name || !email || !message || !allowedEnquiryTypes.has(enquiryType)) {
      return NextResponse.json({ error: "Please complete the required fields." }, { status: 400 });
    }

    if (!(await verifyRecaptcha(body.recaptchaToken, request, "contact_submit"))) {
      return NextResponse.json({ error: "Captcha verification failed." }, { status: 400 });
    }

  
// Everything above this point has already:
// 1. Checked that the request came from an allowed domain.
// 2. Checked the hidden honeypot field.
// 3. Validated the visitor's name/email/message.
// 4. Verified Google reCAPTCHA using the PRIVATE secret key.
//
// Only after those checks do we forward the message to FormSubmit.

    const extraFields: Array<[string, string, number]> = [
      ["Company", body.companyName, 160],
      ["Creator platform", body.platform, 80],
      ["Creator profile", body.profileLink, 500],
      ["Content niche", body.niche, 160],
      ["Approximate audience size", body.audienceSize, 60],
      ["Creator requirements", body.creatorRequirements, 300],
      ["Campaign timeframe", body.timeframe, 120],
      ["Approximate budget", body.budget, 100],
      ["General location", body.location, 120],
    ];
    const additionalDetails = extraFields
      .map(([label, value, max]) => [label, normaliseText(value, max)] as const)
      .filter(([, value]) => value);
    const fullMessage = [
      message,
      ...(additionalDetails.length
        ? ["", "Additional enquiry details:", ...additionalDetails.map(([label, value]) => `${label}: ${value}`)]
        : []),
    ].join("\n");
    const categoryLabels: Record<string, string> = {
      creator: "Content Creator Consultation",
      brand: "Brand or Business Consultation",
      lifestyle: "Home & Lifestyle Service Enquiry",
      general: "General Enquiry",
    };

    await forwardToFormSubmit({
      _subject: `Kynected ${categoryLabels[enquiryType]} — ${name}`,
      form_type: "contact",
      enquiry_type: categoryLabels[enquiryType],
      name,
      email,
      service: service || "Not specified",
      message: fullMessage,
    }, request.headers.get("origin") || "");

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact route failed", error);
    return NextResponse.json({ error: "Unable to send your message right now." }, { status: 500 });
  }
}
