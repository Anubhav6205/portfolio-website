"use client";

import { useEffect, useState } from "react";
import type { Metric } from "@/content/profile";
import { useInView } from "@/lib/useReveal";

function useCountUp(target: number, run: boolean, decimals = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const start = performance.now();
    const duration = reduce ? 0 : 1400;
    const tick = (now: number) => {
      const t = duration === 0 ? 1 : Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target]);
  return value.toFixed(decimals);
}

function MetricCell({ m, run, i }: { m: Metric; run: boolean; i: number }) {
  const shown = useCountUp(m.value, run, m.decimals ?? 0);
  const final = m.value.toFixed(m.decimals ?? 0);
  return (
    <div
      className={`reveal ${run ? "in" : ""} group relative bg-bg p-6 transition-colors hover:bg-raised md:p-8`}
      style={{ "--d": `${i * 70}ms` } as React.CSSProperties}
    >
      <p aria-hidden="true" className="mb-2 h-4 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{m.kicker}</p>
      <p className="font-serif text-5xl leading-none tracking-tight text-fg md:text-6xl">
        <span className="sr-only">{`${m.kicker ? m.kicker + " " : ""}${m.prefix ?? ""}${final}${m.suffix ?? ""}`}</span>
        <span aria-hidden="true">
          {m.prefix && <span className="text-muted">{m.prefix}</span>}
          <span className="tabular-nums group-hover:text-accent">{shown}</span>
          {m.suffix && <span className="text-accent">{m.suffix}</span>}
        </span>
      </p>
      <p className="mt-4 text-sm text-fg">{m.label}</p>
      <p className="mt-1 font-mono text-xs text-muted">{m.note}</p>
    </div>
  );
}

export function MetricGrid({ metrics }: { metrics: Metric[] }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  return (
    <div ref={ref} className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {metrics.map((m, i) => (
        <MetricCell key={m.label} m={m} run={inView} i={i} />
      ))}
    </div>
  );
}
