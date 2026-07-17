"use client";

import { useEffect, useRef, useState } from "react";

type Stage = "idle" | "ringing" | "typing" | "sent";

const STAGE_SEQUENCE: { stage: Stage; delayMs: number }[] = [
  { stage: "ringing", delayMs: 400 },
  { stage: "typing", delayMs: 1800 },
  { stage: "sent", delayMs: 1200 },
];

export function MissedCallVisualizer({ caption }: { caption: string }) {
  const [stage, setStage] = useState<Stage>("idle");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      const timer = setTimeout(() => setStage("sent"), 0);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          runSequence();
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);

    const timers: ReturnType<typeof setTimeout>[] = [];
    function runSequence() {
      let elapsed = 0;
      for (const step of STAGE_SEQUENCE) {
        elapsed += step.delayMs;
        timers.push(setTimeout(() => setStage(step.stage), elapsed));
      }
    }

    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div ref={containerRef} className="mx-auto max-w-xs">
      <div className="rounded-[2rem] border-4 border-neutral-800 bg-white p-4 shadow-lg">
        <div className="flex min-h-40 flex-col justify-end gap-2">
          {stage === "idle" ? (
            <p className="text-center text-sm text-neutral-600">
              Missat samtal från kund...
            </p>
          ) : null}
          {stage === "ringing" ? (
            <p className="animate-pulse text-center text-sm font-medium text-red-600">
              📞 Missat samtal
            </p>
          ) : null}
          {stage === "typing" ? (
            <>
              <p className="text-center text-sm font-medium text-red-600">
                📞 Missat samtal
              </p>
              <p className="ml-auto rounded-2xl rounded-br-sm bg-neutral-100 px-3 py-2 text-sm text-neutral-600">
                skriver...
              </p>
            </>
          ) : null}
          {stage === "sent" ? (
            <>
              <p className="text-center text-sm font-medium text-red-600">
                📞 Missat samtal
              </p>
              <p className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-brand px-3 py-2 text-sm text-white">
                Hej! Vi ser att du ringde. Vi hör av oss inom kort. 👍
              </p>
            </>
          ) : null}
        </div>
      </div>
      <p className="mt-3 text-center text-sm text-neutral-600">{caption}</p>
    </div>
  );
}
