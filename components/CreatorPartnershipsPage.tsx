import Image from "next/image";
import Link from "next/link";
import DailyQuote from "@/components/DailyQuote";

const creatorServices = [
  ["01/04", "Finding Brand Opportunities", "We identify brands and commercial opportunities that may align with your content and audience."],
  ["02/04", "Brand Outreach", "We contact relevant brands, PR agencies and marketing teams to explore potential collaborations."],
  ["03/04", "Facilitating Partnerships", "We connect creators with interested brands and help coordinate discussions towards a potential agreement."],
  ["04/04", "Building Long-Term Connections", "We help explore opportunities for ongoing brand relationships beyond individual campaigns."],
];
const brandServices = [
  ["01/04", "Finding Suitable Creators", "We research creators who may align with your campaign objectives, brand identity and target audience."],
  ["02/04", "Creator Outreach", "We contact suitable creators, establish their interest and explore potential collaborations."],
  ["03/04", "Coordinating Collaborations", "We liaise with creators and brands to support clear communication, partnership discussions and a smoother agreement process."],
  ["04/04", "Creator Insights & Shortlisting", "Where available and appropriately shared, we can organise relevant creator metrics, audience information and content details to help you compare suitable candidates."],
];
const steps = [
  ["01", "Tell Us What You Need", "Share your goals, whether you’re a brand searching for creators or a creator exploring partnerships."],
  ["02", "We Find Potential Matches", "We research brands or creators who may be a suitable fit."],
  ["03", "We Make Contact", "We reach out to relevant prospects, explore mutual interest and help arrange introductions."],
  ["04", "We Help Move Things Forward", "We support discussions, communication and the next steps towards a potential collaboration."],
];
const categories = ["Content Creators & Influencers", "Consumer Brands", "PR & Marketing Agencies", "Technology & App Companies", "Gaming & Entertainment Brands", "Lifestyle & Retail Businesses"];

function ServiceCards({ services, tone }: { services: string[][]; tone: "creator" | "brand" }) {
  return <div className={`kn-partner-card-grid ${tone}`}>{services.map(([number, title, description], index) => <article className="kn-partner-card" key={title}><span className="kn-card-index">{number}</span><span className="kn-partner-card-icon" aria-hidden="true">{["↗", "◎", "⌁", "✳"][index]}</span><h3>{title}</h3><p>{description}</p><span className="kn-partner-card-line" /></article>)}</div>;
}

export default function CreatorPartnershipsPage() {
  return (
    <>
      <section className="kn-creator-hero">
        <div className="kn-creator-grid-bg" aria-hidden="true" />
        <div className="kn-container kn-creator-hero-grid">
          <div className="kn-creator-hero-copy"><span className="kn-eyebrow kn-eyebrow-light"><i /> Creator & Brand Partnerships</span><h1>Connecting Brands.<br /><em>Empowering Creators.</em></h1><p>Meaningful Partnerships. Real Opportunities.</p><p>We proactively introduce brands to suitable creators and help creators explore potential commercial partnerships.</p><div className="kn-hero-actions"><Link href="#creators" className="kn-button kn-button-gold">I’m a Creator <span>↗</span></Link><Link href="#brands" className="kn-button kn-button-outline-light">I’m a Brand <span>↗</span></Link></div></div>
          <div className="kn-creator-art" aria-hidden="true"><div className="kn-creator-art-frame"><Image src="/images/Kynected_trans_logo.png" alt="" width={640} height={640} priority unoptimized /></div></div>
        </div>
        <div className="kn-container kn-creator-hero-foot"><span>CREATOR & BRAND SUPPORT</span><span>Scroll to explore <b>↓</b></span></div>
      </section>

      <section className="kn-section kn-audience-section" id="creators">
        <div className="kn-container"><div className="kn-section-heading"><div><span className="kn-eyebrow">01 / For content creators</span><h2>Take Your Content<br /><em>Further.</em></h2></div><p>We support creators in exploring opportunities and building commercial relationships. Existing creator relationships and prospective creator sourcing both depend on the opportunity and mutual interest.</p></div>
          <ServiceCards services={creatorServices} tone="creator" />
          <div className="kn-section-cta-row"><span>Want help finding brands to work with?</span><Link className="kn-button kn-button-dark" href="/contact?type=creator">Talk to us about creator support <span>↗</span></Link></div>
        </div>
      </section>

      <section className="kn-section kn-brands-section" id="brands">
        <div className="kn-container"><div className="kn-section-heading"><div><span className="kn-eyebrow">02 / For brands & businesses</span><h2>Find Creators Who<br /><em>Fit Your Brand.</em></h2></div><p>We proactively approach brands and businesses with creators who may suit their promotional objectives, then help explore whether a collaboration is of interest.</p></div>
          <ServiceCards services={brandServices} tone="brand" />
          <div className="kn-section-cta-row"><span>Looking for creators who fit your business?</span><Link className="kn-button kn-button-dark" href="/contact?type=brand">Discuss a Creator Partnership <span>↗</span></Link></div>
        </div>
      </section>

      <section className="kn-section kn-process-section">
        <div className="kn-container"><div className="kn-section-heading"><div><span className="kn-eyebrow kn-eyebrow-light">03 / How we work</span><h2>How It <em>Works.</em></h2></div><p></p></div>
          <div className="kn-process-list">{steps.map(([number, title, description], index) => <details className="kn-process-step" key={number} open={index === 0}><summary><span className="kn-process-number">{number}</span><span className="kn-process-title">{title}</span><span className="kn-process-toggle" aria-hidden="true">+</span></summary><p>{description}</p></details>)}</div>
          <p className="kn-disclaimer">Commercial opportunities are not confirmed until the brand and creator have expressed mutual interest and agreed to the collaboration.</p>
        </div>
      </section>

      <section className="kn-section kn-categories-section"><div className="kn-container"><div className="kn-section-heading"><div><span className="kn-eyebrow">04 / Who we can help</span><h2>The Right Connections<br /><em>for Different fields.</em></h2></div><p>These are some of the industries and clients we can support. Our services are not limited to the categories listed.</p></div><div className="kn-category-grid">{categories.map((category, index) => <div className="kn-category-chip" key={category}><span>0{index + 1}</span>{category}<b aria-hidden="true">↗</b></div>)}</div></div></section>

      <section className="kn-section kn-daily-quote"><div className="kn-container"><span className="kn-eyebrow">A thought for today</span><DailyQuote /></div></section>

      <section className="kn-partnership-cta"><div className="kn-container kn-partnership-cta-inner"><span className="kn-eyebrow kn-eyebrow-light">05 / Get in touch</span><h2>Your Next Partnership<br /><em>Starts With a Conversation.</em></h2><p>Are you a creator looking to work with brands, or a business looking for creators? Tell us what you have in mind.</p><div className="kn-hero-actions"><Link className="kn-button kn-button-gold" href="/contact?type=creator">Talk to us as a creator <span>↗</span></Link><Link className="kn-button kn-button-outline-light" href="/contact?type=brand">Talk to us as a brand <span>↗</span></Link></div><Image className="kn-partnership-cta-mark" src="/images/justK_trans.png" alt="" width={210} height={210} unoptimized /></div></section>
    </>
  );
}
