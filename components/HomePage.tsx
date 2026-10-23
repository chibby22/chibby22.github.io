import Image from "next/image";
import Link from "next/link";

const benefits = [
  ["01", "Personalised support", "Solutions shaped around what you need."],
  ["02", "The right connections", "Helping you meet the right people for the job."],
  ["03", "Convenience", "A clearer, simpler way to find support."],
  ["04", "Clear communication", "Helpful updates and straightforward next steps."],
];

export default function HomePage() {
  return (
    <>
      <section className="kn-home-hero">
        <div className="kn-home-hero-glow" aria-hidden="true" />
        <div className="kn-container kn-home-hero-grid">
          <div className="kn-home-hero-copy">
            <span className="kn-eyebrow kn-eyebrow-light"><i /> One call for every solution!</span>
            <h1>Connections That<br /><em>Make Life Easier.</em></h1>
            <p>From connecting creators with brands to helping individuals and businesses manage everyday tasks, Kynected brings the right people and solutions together.</p>
            <div className="kn-hero-actions">
              <Link className="kn-button kn-button-gold kn-button-large" href="/creator-partnerships">Explore Creator Partnerships <span aria-hidden="true">↗</span></Link>
              <Link className="kn-button kn-button-outline-light" href="/home-lifestyle">Explore Home & Lifestyle</Link>
            </div>
            <div className="kn-hero-note"><span className="kn-note-line" /> Creator partnerships and help with everyday life.</div>
          </div>
          <div className="kn-home-art" aria-label="Kynected brand artwork">
            <div className="kn-art-orbit kn-art-orbit-one" /><div className="kn-art-orbit kn-art-orbit-two" />
            <div className="kn-art-card kn-art-card-top"><span>CREATOR</span><b>↗</b></div>
            <div className="kn-art-logo"><Image src="/images/3dk1_trans.png" alt="Kynected connections artwork" width={650} height={650} priority /></div>
            <div className="kn-art-card kn-art-card-bottom"><span>EVERYDAY</span><b>✦</b></div>
            <div className="kn-art-caption"><span>Ideas meet the right people</span><i /></div>
          </div>
        </div>
        <div className="kn-hero-scroll">SCROLL TO EXPLORE <span>↓</span></div>
      </section>

      <section className="kn-section kn-intro-section">
        <div className="kn-container kn-intro-grid">
          <span className="kn-eyebrow">A more connected way forward</span>
          <div><h2>Good things happen<br /><em>when the right people connect.</em></h2><p>Kynected brings together two kinds of support: helping creators and brands explore a fit, and making everyday services easier to access.</p></div>
        </div>
      </section>

      <section className="kn-section kn-divisions-section">
        <div className="kn-container">
          <div className="kn-section-heading"><div><span className="kn-eyebrow">Two sides of Kynected</span><h2>Where can we help?</h2></div><p>Choose what you need help with. We’ll talk it through and help you take the next step.</p></div>
          <div className="kn-division-grid">
            <article className="kn-division-card kn-division-creator">
              <div className="kn-card-topline"><span>01 / OUR GROWTH FOCUS</span><span aria-hidden="true">✳</span></div>
              <div className="kn-division-visual kn-visual-creator"><div className="kn-visual-ring" /><div className="kn-visual-letter">C</div><span className="kn-visual-stamp">PEOPLE<br />× IDEAS</span></div>
              <div className="kn-division-content"><span className="kn-eyebrow">Creator & Brand Partnerships</span><h3>Make your next<br /><em>connection count.</em></h3><p>Helping creators find brands to work with and businesses find creators for their promotions.</p><Link className="kn-text-link" href="/creator-partnerships">See how it works <span>↗</span></Link></div>
            </article>
            <article className="kn-division-card kn-division-home">
              <div className="kn-card-topline"><span>02 / HOME & LIFESTYLE</span><span aria-hidden="true">✳</span></div>
              <div className="kn-division-visual kn-visual-home"><div className="kn-home-shape kn-home-shape-one" /><div className="kn-home-shape kn-home-shape-two" /><div className="kn-home-shape kn-home-shape-three" /><span className="kn-home-symbol">⌂</span></div>
              <div className="kn-division-content"><span className="kn-eyebrow">Home & Lifestyle Services</span><h3>Everyday tasks,<br /><em>made simpler.</em></h3><p>Help with cleaning, errands, small home repairs, furniture assembly and everyday tech.</p><Link className="kn-text-link" href="/home-lifestyle">See home services <span>↗</span></Link></div>
            </article>
          </div>
        </div>
      </section>

      <section className="kn-section kn-benefits-section">
        <div className="kn-container"><div className="kn-section-heading"><div><span className="kn-eyebrow">The Kynected approach</span><h2>Why Kynected?</h2></div><p>Different needs, one thoughtful approach: listen first, find a practical next step, and keep communication clear.</p></div>
          <div className="kn-benefit-grid">{benefits.map(([number, title, description]) => <article className="kn-benefit-card" key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
        </div>
      </section>

      <section className="kn-home-cta"><div className="kn-container kn-home-cta-inner"><span className="kn-eyebrow kn-eyebrow-light">A good place to start</span><h2>Let’s Make the<br /><em>Right Connection.</em></h2><p>Whether you're looking for your next brand collaboration or practical support with everyday tasks, we'd love to hear from you.</p><Link className="kn-button kn-button-gold kn-button-large" href="/contact">Contact Kynected <span aria-hidden="true">↗</span></Link><span className="kn-cta-star" aria-hidden="true">✳</span></div></section>
    </>
  );
}
