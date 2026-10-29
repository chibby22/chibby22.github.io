import Image from "next/image";
import Link from "next/link";
import RotatingSlogan from "@/components/RotatingSlogan";

const benefits = [
  ["01", "Personalised Support", "We take time to understand what you need."],
  ["02", "The Right Connections", "We help connect you with people and opportunities suited to your goals."],
  ["03", "Convenience", "Less time searching, more time getting things done."],
  ["04", "Clear Communication", "Straightforward updates and guidance throughout the process."],
];

export default function HomePage() {
  return (
    <>
      <section className="kn-home-hero">
        <div className="kn-home-hero-glow" aria-hidden="true" />
        <div className="kn-container kn-home-hero-grid">
          <div className="kn-home-hero-copy">
            <span className="kn-eyebrow kn-eyebrow-light"><i /> One point of contact</span>
            <h1 className="kn-home-wordmark"><span>KYNECTED</span></h1>
            <RotatingSlogan />
            <p>From connecting creators with brands to helping individuals and businesses manage everyday tasks, Kynected helps you find the right person for the job</p>
            <div className="kn-hero-actions">
              <Link className="kn-button kn-button-gold kn-button-large" href="/creator-partnerships">Explore Creator Partnerships <span aria-hidden="true">↗</span></Link>
              <Link className="kn-button kn-button-outline-light" href="/home-lifestyle">Explore Home & Lifestyle</Link>
            </div>
          </div>
          <div className="kn-home-art" aria-hidden="true">
            <div className="kn-art-orbit kn-art-orbit-one" />
            <div className="kn-art-orbit kn-art-orbit-two" />
            <div className="kn-art-logo"><Image src="/images/Kynected_trans_logo.png" alt="" width={650} height={650} priority unoptimized /></div>
          </div>
        </div>
        <div className="kn-hero-scroll">SCROLL TO EXPLORE <span>↓</span></div>
      </section>

      <section className="kn-section kn-intro-section">
        <div className="kn-container kn-intro-grid">
          <span className="kn-eyebrow">A more connected way forward</span>
          <div><h2>Connections That<br /><em>Make Life Easier.</em></h2><p>Finding the right person for a job or opportunity shouldn&apos;t be complicated. Tell Kynected what you need, and we&apos;ll help connect you with suitable people, services or opportunities — without the unnecessary hassle.</p><p>We work across creator partnerships and practical everyday services.</p></div>
        </div>
      </section>

      <section className="kn-section kn-divisions-section">
        <div className="kn-container">
          <div className="kn-section-heading"><div><span className="kn-eyebrow">Two sides of Kynected</span><h2>Where can we help?</h2></div><p>Choose what you need help with. We’ll talk it through and help you take the next step.</p></div>
          <div className="kn-division-grid">
            <article className="kn-division-card kn-division-creator">
              <div className="kn-card-topline"><span>01 / CREATOR PARTNERSHIPS</span><span aria-hidden="true">✳</span></div>
              <div className="kn-division-visual kn-visual-creator"><div className="kn-visual-ring" /><Image className="kn-visual-k-mark" src="/images/justK_trans.png" alt="" width={120} height={120} unoptimized /></div>
              <div className="kn-division-content"><span className="kn-eyebrow">Creator Partnerships</span><h3>Make Your Next<br /><em>Partnership Count.</em></h3><p>Helping creators find brands to work with and businesses discover creators for their promotions.</p><Link className="kn-text-link kn-division-cta" href="/creator-partnerships">See How It Works <span>↗</span></Link></div>
            </article>
            <article className="kn-division-card kn-division-home">
              <div className="kn-card-topline"><span>02 / HOME & LIFESTYLE</span><span aria-hidden="true">✳</span></div>
              <div className="kn-division-visual kn-visual-home"><Image src="/images/kynected_home_hero.png" alt="" width={480} height={260} /></div>
              <div className="kn-division-content"><span className="kn-eyebrow">Home & Lifestyle Services</span><h3>Everyday Tasks.<br /><em>Made Easier.</em></h3><p>Helping individuals and businesses with cleaning, personal errands, minor home repairs, furniture assembly and everyday technology support.</p><Link className="kn-text-link kn-division-cta" href="/home-lifestyle">Explore Home Services <span>↗</span></Link></div>
            </article>
          </div>
        </div>
      </section>

      <section className="kn-section kn-benefits-section">
        <div className="kn-container"><div className="kn-section-heading"><div><span className="kn-eyebrow">The Kynected approach</span><h2>Why Kynected?</h2></div><p>One point of contact for different needs. Whether you&apos;re looking for a commercial partnership or help with everyday tasks, Kynected helps you find suitable support without having to search everywhere yourself.</p></div>
          <div className="kn-benefit-grid">{benefits.map(([number, title, description]) => <article className="kn-benefit-card" key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
        </div>
      </section>

      <section className="kn-home-cta"><div className="kn-container kn-home-cta-inner"><span className="kn-eyebrow kn-eyebrow-light">A good place to start</span><h2>Ready to Get<br /><em>Connected?</em></h2><p>Whether you&apos;re a brand looking for creators, a creator exploring opportunities, or someone who needs practical support, we&apos;d love to hear from you.</p><Link className="kn-button kn-button-gold kn-button-large" href="/contact">Contact Kynected <span aria-hidden="true">↗</span></Link></div></section>
    </>
  );
}
