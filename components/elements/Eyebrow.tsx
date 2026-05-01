"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function Eyebrow({ text, className = "" }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState(text.toUpperCase());
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { amount: "some", margin: "-50px" });
  
  useEffect(() => {
    if (!isInView) {
      setDisplayText(text.toUpperCase()); 
      return;
    }
    
    let iteration = 0;
    const upperText = text.toUpperCase();
    
    // First frame immediately to prevent flash of unscrambled text when re-entering
    setDisplayText(
      upperText.split("").map((l) => l === " " ? " " : LETTERS[Math.floor(Math.random() * LETTERS.length)]).join("")
    );

    const interval = setInterval(() => {
      setDisplayText(
        upperText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return upperText[index];
            }
            if (letter === " ") return " ";
            return LETTERS[Math.floor(Math.random() * LETTERS.length)];
          })
          .join("")
      );

      if (iteration >= upperText.length) {
        clearInterval(interval);
      }

      iteration += 1 / 2; // Controls speed of unscramble
    }, 30);

    return () => clearInterval(interval);
  }, [text, isInView]);

  return (
    <p ref={ref} className={`text-xs font-semibold uppercase tracking-[0.18em] text-brand ${className}`}>
      [ {displayText} ]
    </p>
  );
}
