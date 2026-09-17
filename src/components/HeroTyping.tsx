"use client";

import { useEffect, useState } from "react";

// Teks penuh dirender saat SSR agar Googlebot tetap membaca
// "Full Stack Developer" walau JavaScript tidak jalan.
export default function HeroTyping({ fullText }: { fullText: string }) {
  const [displayText, setDisplayText] = useState(fullText);

  useEffect(() => {
    let i = 0;
    setDisplayText("");
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setDisplayText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 80);
    return () => clearInterval(timer);
  }, [fullText]);

  return (
    <span>
      <span className="gradient-text">{displayText}</span>
      <span className="typing-cursor" aria-hidden="true"></span>
    </span>
  );
}
