"use client";

import { useEffect, useRef, useState } from "react";
import { liveDemo } from "@/content/copy.sv";

export function MissedCallVisualizer() {
  const ref = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActiveStep(liveDemo.visualizerSteps.length - 1);
      return;
    }

    const interval = setInterval(() => {
      setActiveStep((step) => (step + 1) % liveDemo.visualizerSteps.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [started]);

  return (
    <div ref={ref} className="rounded-xl border border-line bg-bg-muted p-6">
      <p className="mb-4 text-sm font-semibold text-ink">{liveDemo.fallbackHeading}</p>
      <p className="mb-5 text-sm text-ink-muted">{liveDemo.fallbackIntro}</p>
      <ol className="flex flex-col gap-3">
        {liveDemo.visualizerSteps.map((step, index) => (
          <li
            key={step.label}
            className={`rounded-lg border p-4 transition-colors duration-500 ${
              index === activeStep ? "border-accent bg-bg" : "border-line bg-bg/60"
            }`}
          >
            <p className="font-semibold text-ink">{step.label}</p>
            <p className="text-sm text-ink-muted">{step.detail}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
