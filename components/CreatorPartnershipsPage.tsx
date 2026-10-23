import Image from "next/image";
import Link from "next/link";

const creatorServices = [
  ["01", "Finding brands to work with", "We look for brands that suit your content, audience and interests."],
  ["02", "Contacting brands", "We get in touch with brands and their teams to explore working together."],
  ["03", "Making introductions", "We help creators and brands connect and talk through ideas."],
  ["04", "Building lasting connections", "We look for chances to build ongoing relationships, not just one-off projects."],
];
const brandServices = [
  ["01", "Finding the right creators", "We look for creators who suit your audience, business and goals."],
  ["02", "Contacting creators", "We help you reach suitable creators and see if they’re interested."],
  ["03", "Bringing teams together", "We connect brands and creators to discuss posts, launches and other projects."],
  ["04", "A clear list of creators", "We put together creators who match what you’re looking for."],
];
const steps = [
  ["01", "Tell us what you need", "Share your goals and the kind of work you have in mind."],
  ["02", "We look into it", "We search for brands and creators that may be a good fit."],
  ["03", "We make contact", "We reach out and make introductions where there’s a mutual interest."],
  ["04", "Agree what’s next", "We talk through possible next steps and the help you may need."],
];
const categories = ["Content Creators & Influencers", "Consumer Brands", "PR & Marketing Agencies", "Technology & App Companies", "Gaming & Entertainment Brands", "Lifestyle & Retail Businesses"];

function ServiceCards({ services, tone }: { services: string[][]; tone: "creator" | "brand" }) {
  return <div className={`kn-partner-card-grid ${tone}`}>{services.map(([number, title, description], index) => <article className="kn-partner-card" key={title}><span className="kn-card-index">{number}<span aria-hidden="true"> / 0{index + 1}</span></span><span className="kn-partner-card-icon" aria-hidden="true">{["↗", "◎", "⌁", "✳"][index]}</span><h3>{title}</h3><p>{description}</p><span className="kn-partner-card-line" /></article>)}</div>;
}

export default function CreatorPartnershipsPage() {
  return (
    <>
      <section className="kn-creator-hero">
        <div className="kn-creator-grid-bg" aria-hidden="true" />
        <div className="kn-container kn-creator-hero-grid">
          <div className="kn-creator-hero-copy"><span className="kn-eyebrow kn-eyebrow-light"><i /> Creator & Brand Partnerships</span><h1>Connecting Brands.<br /><em>Empowering Creators.</em></h1><p>We help creators find brands to work with, and help businesses connect with creators who suit their ideas and audience.</p><div className="kn-hero-actions"><Link href="/contact?type=creator" className="kn-button kn-button-gold">I’m a Creator <span>↗</span></Link><Link href="/contact?type=brand" className="kn-button kn-button-outline-light">I’m a Brand <span>↗</span></Link></div><div className="kn-editorial-caption"><span>Good people.</span><span>Good connections.</span></div></div>
          <div className="kn-creator-art"><div className="kn-creator-art-frame"><Image src="/images/3dk1_trans.png" alt="Kynected creator partnerships visual" width={640} height={640} priority /><span className="kn-art-coordinate">K / 01<br />MCR · UK</span><div className="kn-art-seal">THE<br />RIGHT<br /><b>FIT</b></div></div><div className="kn-art-side-label">PEOPLE · STORIES · POSSIBILITIES</div></div>
        </div>
        <div className="kn-container kn-creator-hero-foot"><span>CREATOR & BRAND SUPPORT</span><span>Scroll to explore <b>↓</b></span></div>
      </section>

      <section className="kn-section kn-audience-section" id="creators">
        <div className="kn-container"><div className="kn-section-heading"><div><span className="kn-eyebrow">01 / For content creators</span><h2>Take Your Content<br /><em>Further.</em></h2></div><p>Growing an audience takes time and creativity. We help creators find and contact brands that fit, so they can focus on making great content.</p></div>
          <ServiceCards services={creatorServices} tone="creator" />
          <div className="kn-section-cta-row"><span>Want help finding brands to work with?</span><Link className="kn-button kn-button-dark" href="/contact?type=creator">Talk to us about creator support <span>↗</span></Link></div>
        </div>
      </section>

      <section className="kn-section kn-brands-section" id="brands">
        <div className="kn-container"><div className="kn-section-heading"><div><span className="kn-eyebrow">02 / For brands & businesses</span><h2>Find Creators Who<br /><em>Fit Your Brand.</em></h2></div><p>The right creator can help you reach people in a genuine way. We help businesses find and contact creators who suit their brand and plans.</p></div>
          <ServiceCards services={brandServices} tone="brand" />
          <div className="kn-section-cta-row"><span>Looking for creators who fit your business?</span><Link className="kn-button kn-button-dark" href="/contact?type=brand">Talk to us about finding creators <span>↗</span></Link></div>
        </div>
      </section>

      <section className="kn-section kn-process-section">
        <div className="kn-container"><div className="kn-section-heading"><div><span className="kn-eyebrow kn-eyebrow-light">03 / How we work</span><h2>How It <em>Works.</em></h2></div><p>We’ll start by talking about what you need. Any introductions depend on availability and both sides being interested.</p></div>
          <div className="kn-process-list">{steps.map(([number, title, description], index) => <details className="kn-process-step" key={number} open={index === 0}><summary><span className="kn-process-number">{number}</span><span className="kn-process-title">{title}</span><span className="kn-process-toggle" aria-hidden="true">+</span></summary><p>{description}</p></details>)}</div>
          <p className="kn-disclaimer">Opportunities and introductions depend on availability and agreement between everyone involved. We can’t guarantee a match or a particular result.</p>
        </div>
      </section>

      <section className="kn-section kn-categories-section"><div className="kn-container"><div className="kn-section-heading"><div><span className="kn-eyebrow">04 / Who we can help</span><h2>Different worlds.<br /><em>Shared potential.</em></h2></div><p>We’re open to hearing from creators and businesses in these areas. This is not a list of existing clients or confirmed partners.</p></div><div className="kn-category-grid">{categories.map((category, index) => <div className="kn-category-chip" key={category}><span>0{index + 1}</span>{category}<b aria-hidden="true">↗</b></div>)}</div></div></section>

      <section className="kn-partnership-cta"><div className="kn-container kn-partnership-cta-inner"><span className="kn-eyebrow kn-eyebrow-light">05 / Get in touch</span><h2>Your Next Partnership<br /><em>Starts With a Conversation.</em></h2><p>Are you a creator looking to work with brands, or a business looking for creators? Tell us what you have in mind.</p><div className="kn-hero-actions"><Link className="kn-button kn-button-gold" href="/contact?type=creator">Talk to us as a creator <span>↗</span></Link><Link className="kn-button kn-button-outline-light" href="/contact?type=brand">Talk to us as a brand <span>↗</span></Link></div><span className="kn-partnership-cta-mark" aria-hidden="true">K.</span></div></section>
    </>
  );
}
