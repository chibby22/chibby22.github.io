import Image from "next/image";
import Link from "next/link";
import ServiceExplorer, { type ServiceCategory } from "@/components/ServiceExplorer";

const categories: ServiceCategory[] = [
  { title: "Cleaning", icon: "✳", description: "Cleaning for homes, short-let properties and small workplaces.", options: ["Airbnb & Short-Let Cleaning", "Office Cleaning", "Regular Property Cleaning", "Deep Cleaning", "End-of-Tenancy Cleaning"], cta: "Ask About Cleaning", service: "cleaning" },
  { title: "Personal Concierge", icon: "⌁", description: "Practical help with errands and everyday responsibilities, so you can save time and focus on what matters.", options: ["Personal Errands", "Shopping & Collections", "Daily Task Assistance", "Appointment Coordination", "Deliveries & Drop-Offs", "General Lifestyle Support"], cta: "Ask About Concierge Help", service: "concierge" },
  { title: "Handyman & Repairs", icon: "⌂", description: "Help with minor repairs, simple home upkeep and general maintenance tasks.", options: ["Minor Household Repairs", "General Maintenance", "Fixtures & Fittings", "Basic Installations", "Property Upkeep"], cta: "Ask About Repairs", service: "repairs" },
  { title: "Furniture Assembly & Electronics", icon: "⌘", description: "Help with furniture assembly and everyday technology support.", details: [
    { title: "Furniture Assembly", description: "Help building furniture for your home or home office.", options: ["Flat-Pack Furniture", "Wardrobes & Desks", "Shelving & Storage", "Home Office Furniture"] },
    { title: "Everyday Technology Support", description: "Practical help with common computer and device questions. Specialist or regulated repairs are not offered.", options: ["Basic Device Setup", "Everyday Computer Support", "Monitor & Peripheral Help", "General Technology Questions"] },
  ], cta: "Enquire About Assembly or Electronics Support", service: "assembly-electronics" },
];

export default function HomeLifestylePage() {
  return (
    <>
      <section className="kn-lifestyle-hero"><div className="kn-container kn-lifestyle-hero-grid"><div><span className="kn-eyebrow"><i /> Home & Lifestyle / Manchester</span><h1>Everyday Problems.<br /><em>Simple Solutions.</em></h1><p>From cleaning and household maintenance to personal errands, furniture assembly and everyday technology support, Kynected helps individuals and businesses find practical assistance.</p><p className="kn-lifestyle-brand-line">One call for every solution.</p><Link className="kn-button kn-button-dark kn-button-large" href="#services">See How We Can Help <span aria-hidden="true">↓</span></Link></div><div className="kn-lifestyle-illustration"><Image src="/images/kynected_home_hero.png" alt="Elegant modern home interior with navy furnishings and warm lighting" width={826} height={941} priority /></div></div><div className="kn-container kn-lifestyle-hero-foot"><span>Practical help, one conversation at a time</span><span>See our services ↓</span></div></section>

      <section className="kn-section kn-lifestyle-services" id="services"><div className="kn-container"><div className="kn-section-heading"><div><span className="kn-eyebrow">Find the help you need</span><h2>What needs<br /><em>doing?</em></h2></div><p>Choose a service to see what we can help with. Get in touch and we’ll talk about what’s available.</p></div><ServiceExplorer categories={categories}/><p className="kn-service-note">Services depend on availability and location. We do not offer specialist or regulated work.</p></div></section>

      <section className="kn-lifestyle-benefits"><div className="kn-container kn-help-grid"><div className="kn-help-copy"><span className="kn-eyebrow">How we help</span><h2>How We Can Help.</h2><p>Tell us what you need help with, and we&apos;ll discuss the service, availability and practical next steps. Whether it&apos;s a one-off task or something more regular, we&apos;ll help you explore a suitable solution.</p><Link className="kn-button kn-button-dark kn-button-large" href="/contact?type=lifestyle">Request a Service <span aria-hidden="true">↗</span></Link><span className="kn-help-closing">One less thing on your list.</span></div><div className="kn-help-illustration"><Image src="/images/kynected-conversation.svg" alt="Two people talking about how Kynected can help" width={520} height={390} /></div></div></section>

    </>
  );
}
