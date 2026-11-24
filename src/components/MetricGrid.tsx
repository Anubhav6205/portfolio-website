"use client";

import { Plus } from "lucide-react";
import { useEffect, useRef } from "react";
import type { Metric } from "@/content/profile";
import { useInView } from "@/lib/useReveal";

function MetricCell({ m, run, i }: { m: Metric; run: boolean; i: number }) {
  const num = useRef<HTMLSpanElement>(null);
  const decimals = m.decimals ?? 0;

  // Count up by writing to the DOM directly, so React does not re-render every frame.
  useEffect(() => {
    const node = num.current;
    if (!run || !node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1000);
      node.textContent = (m.value * (1 - Math.pow(1 - t, 3))).toFixed(decimals);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, m.value, decimals]);
  const final = `${m.prefix ?? ""}${m.value.toFixed(decimals)}${m.suffix ?? ""}`;

  return (
    <div
      tabIndex={0}
      className={`metric reveal ${run ? "in" : ""} group relative bg-bg p-6 outline-none transition-colors hover:bg-raised focus-visible:bg-raised md:p-8`}
      style={{ "--d": `${i * 60}ms` } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="label-sm text-muted">{m.context}</p>
        <Plus aria-hidden="true" className="metric-hint h-3.5 w-3.5 shrink-0 text-muted transition-transform duration-300" />
      </div>

      <p className="mt-5 font-serif text-5xl leading-none tracking-tight text-fg">
        <span className="sr-only">{`${m.qualifier ? m.qualifier + " " : ""}${final}`}</span>
        <span aria-hidden="true">
          {m.qualifier && <span className="mr-2 align-baseline font-sans text-base font-light text-muted">{m.qualifier}</span>}
          {m.prefix && <span className="text-muted">{m.prefix}</span>}
          {/* Static text React never updates. The count-up effect rewrites it directly. */}
          <span ref={num} className="tabular-nums" suppressHydrationWarning>
            {m.value.toFixed(decimals)}
          </span>
          {m.suffix && <span className="text-accent">{m.suffix}</span>}
        </span>
      </p>

      <p className="mt-4 text-[15px] leading-snug text-fg">{m.headline}</p>

      <div className="metric-detail">
        <div className="overflow-hidden">
          <p className="pt-4 text-[14px] leading-relaxed text-fg-soft">{m.detail}</p>
        </div>
      </div>
    </div>
  );
}

export function MetricGrid({ metrics }: { metrics: Metric[] }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="grid grid-cols-1 gap-px overflow-hidden rounded-[6px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3"
    >
      {metrics.map((m, i) => (
        <MetricCell key={m.context} m={m} run={inView} i={i} />
      ))}
    </div>
  );
}
