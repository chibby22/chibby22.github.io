import Link from "next/link";
import ServiceExplorer, { type ServiceCategory } from "@/components/ServiceExplorer";

const categories: ServiceCategory[] = [
  { title: "Cleaning", icon: "✳", description: "Cleaning for homes, short-let properties and small workplaces.", options: ["Airbnb & Short-Let Cleaning", "Office Cleaning", "Regular Property Cleaning", "Deep Cleaning", "End-of-Tenancy Cleaning"], cta: "Ask About Cleaning", service: "cleaning" },
  { title: "Personal Concierge", icon: "⌁", description: "Help with errands and everyday tasks, giving you more time for what matters.", options: ["Personal Errands", "Shopping & Collections", "Daily Task Assistance", "Appointment Coordination", "Deliveries & Drop-Offs", "General Lifestyle Support"], cta: "Ask About Concierge Help", service: "concierge" },
  { title: "Handyman & Repairs", icon: "⌂", description: "Help with small repairs, home upkeep and general maintenance.", options: ["Minor Household Repairs", "General Maintenance", "Fixtures & Fittings", "Basic Installations", "Property Upkeep"], cta: "Ask About Repairs", service: "repairs" },
  { title: "Assembly & Electronics", icon: "⌘", description: "Help putting furniture together and sorting out everyday computer and device problems.", details: [
    { title: "Furniture Assembly", description: "Help building furniture for your home or home office.", options: ["Flat-Pack Furniture", "Wardrobes & Desks", "Shelving & Storage", "Home Office Furniture"] },
    { title: "Electronics & Computer Support", description: "Help finding and fixing common computer and device problems.", options: ["Laptop Troubleshooting", "Desktop PC Repairs", "Computer Maintenance", "Monitor & Peripheral Issues", "Device Diagnostics"] },
  ], cta: "Enquire About Assembly or Electronics Support", service: "assembly-electronics" },
];

const benefits = [["↗", "Convenient enquiries"], ["◎", "Personalised assistance"], ["⌂", "Practical solutions"], ["↔", "Clear communication"]];

export default function HomeLifestylePage() {
  return (
    <>
      <section className="kn-lifestyle-hero"><div className="kn-container kn-lifestyle-hero-grid"><div><span className="kn-eyebrow"><i /> Home & Lifestyle / Manchester</span><h1>Everyday Solutions.<br /><em>Made Simple.</em></h1><p>From cleaning and small home repairs to errands and tech help, we help you find support for everyday jobs.</p><Link className="kn-button kn-button-dark kn-button-large" href="#services">See How We Can Help <span aria-hidden="true">↓</span></Link></div><div className="kn-lifestyle-illustration" aria-hidden="true"><div className="kn-lifestyle-circle circle-a"/><div className="kn-lifestyle-circle circle-b"/><div className="kn-lifestyle-window"><span>HOME</span><b>⌂</b><i>made a little easier</i></div><span className="kn-lifestyle-spark spark-a">✳</span><span className="kn-lifestyle-spark spark-b">✦</span><span className="kn-lifestyle-index">K / 02</span></div></div><div className="kn-container kn-lifestyle-hero-foot"><span>One call for every solution!</span><span>See our services ↓</span></div></section>

      <section className="kn-section kn-lifestyle-services" id="services"><div className="kn-container"><div className="kn-section-heading"><div><span className="kn-eyebrow">Find the help you need</span><h2>What needs<br /><em>doing?</em></h2></div><p>Choose a service to see what we can help with. Get in touch and we’ll talk about what’s available.</p></div><ServiceExplorer categories={categories}/><p className="kn-service-note">Services depend on availability and location. Specialist work is only offered when a suitably qualified professional is available.</p></div></section>

      <section className="kn-lifestyle-benefits"><div className="kn-container"><div className="kn-section-heading"><div><span className="kn-eyebrow kn-eyebrow-light">How we help</span><h2>A helpful start<br /><em>to getting it done.</em></h2></div><p>Tell us what you need. We’ll explain what help may be available and agree on the next step with you.</p></div><div className="kn-lifestyle-benefit-grid">{benefits.map(([icon, title], index) => <article key={title}><span>{icon}</span><small>0{index + 1}</small><h3>{title}</h3></article>)}</div></div></section>

      <section className="kn-lifestyle-cta"><div className="kn-container kn-lifestyle-cta-inner"><div><span className="kn-eyebrow">One less thing on your list</span><h2>Need Something<br /><em>Taken Care Of?</em></h2><p>Tell us what you need help with and we'll discuss the next steps.</p></div><Link className="kn-button kn-button-dark kn-button-large" href="/contact?type=lifestyle">Request a Service <span aria-hidden="true">↗</span></Link></div></section>
    </>
  );
}
