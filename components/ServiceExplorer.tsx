"use client";

import Link from "next/link";
import { useState } from "react";

export type ServiceOption = {
  title: string;
  description: string;
  options?: string[];
};

export type ServiceCategory = {
  title: string;
  icon: string;
  description: string;
  options?: string[];
  details?: ServiceOption[];
  cta: string;
  service: string;
};

export default function ServiceExplorer({ categories }: { categories: ServiceCategory[] }) {
  const [active, setActive] = useState(0);
  const current = categories[active];

  return (
    <div className="kn-service-explorer">
      <div className="kn-service-tabs" role="tablist" aria-label="Home and lifestyle services">
        {categories.map((category, index) => (
          <button
            key={category.title}
            type="button"
            role="tab"
            id={`service-tab-${index}`}
            aria-selected={active === index}
            aria-controls={`service-panel-${index}`}
            tabIndex={active === index ? 0 : -1}
            className={active === index ? "is-active" : ""}
            onClick={() => setActive(index)}
            onKeyDown={(event) => {
              if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
              event.preventDefault();
              const direction = event.key === "ArrowRight" ? 1 : -1;
              const next = (active + direction + categories.length) % categories.length;
              setActive(next);
              document.getElementById(`service-tab-${next}`)?.focus();
            }}
          >
            <span className="kn-service-tab-icon" aria-hidden="true">{category.icon}</span>
            <span>{category.title}</span>
          </button>
        ))}
      </div>
      <article className="kn-service-panel" role="tabpanel" id={`service-panel-${active}`} aria-labelledby={`service-tab-${active}`}>
        <div className="kn-service-panel-heading">
          <span className="kn-service-icon" aria-hidden="true">{current.icon}</span>
          <div><span className="kn-eyebrow">Practical support</span><h3>{current.title}</h3><p>{current.description}</p></div>
        </div>
        {current.details ? (
          <div className="kn-service-details">
            {current.details.map((detail) => (
              <section className="kn-service-detail" key={detail.title}>
                <h4>{detail.title}</h4>
                <p>{detail.description}</p>
                <ul>{detail.options?.map((option) => <li key={option}>{option}</li>)}</ul>
              </section>
            ))}
          </div>
        ) : (
          <ul className="kn-service-options">{current.options?.map((option) => <li key={option}>{option}</li>)}</ul>
        )}
        <Link className="kn-button kn-button-primary" href={`/contact?type=lifestyle&service=${encodeURIComponent(current.service)}`}>
          {current.cta}<span aria-hidden="true">↗</span>
        </Link>
      </article>
    </div>
  );
}
