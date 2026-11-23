"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { categories, projects, type Category, type Project } from "@/content/projects";
import { GitHubIcon } from "./Icons";

function Chips({ items, max }: { items: string[]; max?: number }) {
  const shown = max ? items.slice(0, max) : items;
  return (
    <ul className="flex flex-wrap gap-1.5">
      {shown.map((s) => (
        <li key={s} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-muted">
          {s}
        </li>
      ))}
      {max && items.length > max && (
        <li className="px-1 py-0.5 font-mono text-[11px] text-muted">+{items.length - max}</li>
      )}
    </ul>
  );
}

function FeaturedCard({ p, n }: { p: Project; n: number }) {
  return (
    <article className="group relative grid gap-8 overflow-hidden rounded-2xl border border-line bg-raised p-6 transition-colors hover:border-line-strong md:grid-cols-[1.1fr_1fr] md:p-10">
      <div className="flex flex-col">
        <div className="flex items-center gap-3 font-mono text-xs text-muted">
          <span className="text-accent">{String(n).padStart(2, "0")}</span>
          <span>{p.year}</span>
          {p.badge && <span className="rounded-full bg-accent-wash px-2 py-0.5 text-accent">{p.badge}</span>}
        </div>
        <h3 className="mt-5 font-serif text-3xl leading-tight text-fg md:text-4xl">
          <Link href={`/work/${p.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {p.title}
          </Link>
        </h3>
        <p className="mt-4 text-fg-soft">{p.blurb}</p>
        <div className="mt-6">
          <Chips items={p.stack} />
        </div>
        <div className="mt-auto flex items-center gap-5 pt-8 text-sm">
          <span className="inline-flex items-center gap-1.5 text-fg">
            Read the case study
            <ArrowRight className="h-4 w-4 text-accent transition-transform group-hover:translate-x-1" />
          </span>
          <a
            href={p.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 inline-flex items-center gap-1.5 text-muted transition-colors hover:text-fg"
          >
            <GitHubIcon className="h-4 w-4" /> Source
          </a>
        </div>
      </div>
      <div className="relative hidden min-h-[220px] rounded-xl border border-line bg-sunken md:block">
        <CardVisual p={p} />
      </div>
    </article>
  );
}

/** A compact typographic visual for each featured card: the headline result. */
function CardVisual({ p }: { p: Project }) {
  const r = p.caseStudy?.results ?? [];
  const lead = r[p.caseStudy?.lead ?? 0];
  return (
    <div className="flex h-full flex-col justify-between p-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{p.caseStudy?.tagline}</p>
      {lead && (
        <div>
          <p className="font-serif text-6xl leading-none text-fg transition-colors group-hover:text-accent">{lead.value}</p>
          <p className="mt-2 text-sm text-muted">{lead.label}</p>
        </div>
      )}
      <div className="grid grid-cols-3 gap-2" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="h-1 rounded-full bg-line-strong transition-colors duration-500 group-hover:bg-accent/60"
            style={{ transitionDelay: `${i * 30}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

function CompactCard({ p }: { p: Project }) {
  return (
    <article className="group relative flex flex-col rounded-2xl border border-line p-6 transition-colors hover:border-line-strong hover:bg-raised">
      <div className="flex items-center justify-between font-mono text-xs text-muted">
        <span>{p.year}</span>
        {p.badge && <span className="rounded-full bg-accent-wash px-2 py-0.5 text-accent">{p.badge}</span>}
      </div>
      <h3 className="mt-4 font-serif text-2xl leading-tight text-fg">
        <a
          href={p.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="after:absolute after:inset-0 after:content-['']"
        >
          {p.title}
        </a>
      </h3>
      <p className="mt-3 text-[15px] text-fg-soft">{p.blurb}</p>
      <div className="mt-5">
        <Chips items={p.stack} max={4} />
      </div>
      <ArrowUpRight className="absolute right-5 top-5 h-4 w-4 text-muted opacity-0 transition-all group-hover:opacity-100 group-hover:text-accent" />
    </article>
  );
}

export function Work() {
  const [filter, setFilter] = useState<Category | "all">("all");
  const list = useMemo(
    () => projects.filter((p) => filter === "all" || p.category.includes(filter)),
    [filter],
  );
  const featured = list.filter((p) => p.caseStudy);
  const rest = list.filter((p) => !p.caseStudy);

  return (
    <div>
      <div role="tablist" aria-label="Filter projects" className="mb-10 flex flex-wrap gap-2">
        {categories.map((c) => {
          const count = c.id === "all" ? projects.length : projects.filter((p) => p.category.includes(c.id as Category)).length;
          const active = filter === c.id;
          return (
            <button
              key={c.id}
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(c.id)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                active ? "border-accent bg-accent text-accent-fg" : "border-line text-muted hover:border-line-strong hover:text-fg"
              }`}
            >
              {c.label}
              <span className={`ml-2 font-mono text-[11px] ${active ? "opacity-70" : "opacity-60"}`}>{count}</span>
            </button>
          );
        })}
      </div>

      <div key={filter} className="space-y-5">
        {featured.map((p, i) => (
          <div key={p.slug} className="rise" style={{ "--d": `${i * 70}ms` } as React.CSSProperties}>
            <FeaturedCard p={p} n={projects.indexOf(p) + 1} />
          </div>
        ))}
        {rest.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <div key={p.slug} className="rise" style={{ "--d": `${(featured.length + i) * 60}ms` } as React.CSSProperties}>
                <CompactCard p={p} />
              </div>
            ))}
            {filter === "all" && (
              <a
                href="https://github.com/Anubhav6205?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="rise group flex min-h-[220px] flex-col justify-between rounded-2xl border border-dashed border-line-strong p-6 transition-colors hover:border-accent"
                style={{ "--d": `${(featured.length + rest.length) * 60}ms` } as React.CSSProperties}
              >
                <GitHubIcon className="h-6 w-6 text-muted transition-colors group-hover:text-accent" />
                <span>
                  <span className="block font-serif text-2xl text-fg">More on GitHub</span>
                  <span className="mt-2 inline-flex items-center gap-1.5 font-mono text-xs text-muted">
                    github.com/Anubhav6205 <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </span>
              </a>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
