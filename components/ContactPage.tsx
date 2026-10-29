import ContactEnquiryForm from "@/components/ContactEnquiryForm";

export default function ContactPage() {
  return (
    <>
      <section className="kn-contact-hero"><div className="kn-container kn-contact-hero-inner"><span className="kn-eyebrow kn-eyebrow-light"><i /> Contact Kynected</span><h1>Let’s talk<br /><em>about what you need.</em></h1><p>Tell us how we can help. We’ll get back to you to talk through the next steps.</p><div className="kn-contact-ways"><a href="mailto:kynectedsolutions@outlook.com">kynectedsolutions@outlook.com <span>↗</span></a><a href="tel:+447440034201">07440 034201 <span>↗</span></a></div></div></section>
      <section className="kn-section kn-contact-section"><div className="kn-container kn-contact-layout"><aside className="kn-contact-aside"><span className="kn-eyebrow">One call for every solution!</span><h2>How Can We<br /><em>Help You?</em></h2><p>Tell us a little about your enquiry so we can understand how best to help.</p><div className="kn-contact-aside-note"><span>01</span><p>Sending this form is a request to get in touch, not a booked appointment.</p></div></aside><ContactEnquiryForm /></div></section>
    </>
  );
}
