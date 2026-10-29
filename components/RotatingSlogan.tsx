"use client";

import { useEffect, useState } from "react";

const slogans = [
  "One call, simplify your life…",
  "One call, get connected…",
  "One call for every solution.",
];

export default function RotatingSlogan() {
  const [slogan, setSlogan] = useState(slogans[0]);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionPreference.matches) {
      setSlogan(slogans[2]);
      return;
    }

    let index = 0;
    let timeout = 0;
    const advance = () => {
      index = (index + 1) % slogans.length;
      setSlogan(slogans[index]);
      timeout = window.setTimeout(advance, index === slogans.length - 1 ? 30_000 : 2_500);
    };

    timeout = window.setTimeout(advance, 2_500);
    return () => window.clearTimeout(timeout);
  }, []);

  return <p className="kn-rotating-slogan" aria-live="off"><span key={slogan}>{slogan}</span></p>;
}
