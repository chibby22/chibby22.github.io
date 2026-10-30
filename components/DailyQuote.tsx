"use client";

import { useEffect, useState } from "react";

const quotes = [
  { text: "Great opportunities often begin with the right introduction.", author: "Kynected" },
  { text: "Individual ambition grows stronger through meaningful connections.", author: "Kynected" },
  { text: "The right partnership can turn a good idea into something greater.", author: "Kynected" },
  { text: "Success takes effort. Progress often takes collaboration.", author: "Kynected" },
  { text: "A thoughtful conversation can open an unexpected door.", author: "Kynected" },
  { text: "Good work grows when the right people move forward together.", author: "Kynected" },
];

function getTodayIndex() {
  const today = new Date();
  const dayNumber = Math.floor(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) / 86_400_000);
  return ((dayNumber % quotes.length) + quotes.length) % quotes.length;
}

export default function DailyQuote() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    let timer = 0;
    const updateAtMidnight = () => {
      setQuoteIndex(getTodayIndex());
      const now = new Date();
      const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      timer = window.setTimeout(updateAtMidnight, nextMidnight.getTime() - now.getTime());
    };

    updateAtMidnight();
    return () => window.clearTimeout(timer);
  }, []);

  const quote = quotes[quoteIndex];

  return (
    <blockquote className="kn-daily-quote-text" key={quoteIndex}>
      <p>“{quote.text}”</p>
      <cite>— {quote.author}</cite>
    </blockquote>
  );
}
