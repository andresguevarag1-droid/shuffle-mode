"use client";

import { useEffect, useState } from "react";
import { DROP } from "@/lib/content";

type Parts = { d: number; h: number; m: number; s: number };

function diff(target: number): Parts {
  const ms = Math.max(0, target - Date.now());
  return {
    d: Math.floor(ms / 86_400_000),
    h: Math.floor((ms / 3_600_000) % 24),
    m: Math.floor((ms / 60_000) % 60),
    s: Math.floor((ms / 1000) % 60),
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function DropCountdown() {
  const target = new Date(DROP.releasesAt).getTime();
  // Seed lazily from the target; the container uses suppressHydrationWarning
  // so the once-per-render server/client difference is silenced, and the
  // interval reconciles it within a second.
  const [parts, setParts] = useState<Parts>(() => diff(target));

  useEffect(() => {
    const id = setInterval(() => setParts(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units: [string, number][] = [
    ["Days", parts.d],
    ["Hrs", parts.h],
    ["Min", parts.m],
    ["Sec", parts.s],
  ];

  return (
    <div className="flex items-center gap-5">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-stone">
          {DROP.title} drops in
        </p>
        <div className="mt-2 flex items-center gap-3" suppressHydrationWarning>
          {units.map(([label, value], i) => (
            <div key={label} className="flex items-center gap-3">
              <div className="text-center">
                <div className="font-display text-2xl md:text-3xl tabular-nums leading-none">
                  {pad(value)}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-widest text-stone">
                  {label}
                </div>
              </div>
              {i < units.length - 1 && (
                <span className="text-ink/30 text-2xl leading-none -mt-3">:</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
