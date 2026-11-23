import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/content/projects";
import { ArchDiagram } from "@/components/ArchDiagram";
import { GitHubIcon } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = caseStudies.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.blurb,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: { title: p.title, description: p.blurb, url: `/work/${p.slug}`, type: "article" },
  };
}

function Block({ index, title, children }: { index: string; title: string; children: React.ReactNode }) {
  return (
    <Reveal as="section" className="grid gap-6 border-t border-line py-14 md:grid-cols-[200px_1fr] md:gap-8">
      <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-muted md:pt-2">
        <span className="text-accent">{index}</span> / {title}
      </h2>
      <div>{children}</div>
    </Reveal>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const i = caseStudies.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = caseStudies[i];
  const cs = p.caseStudy!;
  const prev = caseStudies[(i - 1 + caseStudies.length) % caseStudies.length];
  const next = caseStudies[(i + 1) % caseStudies.length];

  return (
    <article className="pb-24 pt-28 md:pt-36">
      <div className="container-x">
        <Link
          href="/#work"
          className="rise inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted transition-colors hover:text-fg"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All work
        </Link>

        <header className="mt-10 max-w-4xl">
          <p className="rise flex flex-wrap items-center gap-3 font-mono text-xs text-muted" style={{ "--d": "60ms" } as React.CSSProperties}>
            <span>{p.year}</span>
            <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
            <span>Personal project</span>
            {p.badge && <span className="rounded-full bg-accent-wash px-2 py-0.5 text-accent">{p.badge}</span>}
          </p>
          <h1
            className="rise mt-6 font-serif text-[clamp(2.6rem,7vw,5.4rem)] leading-[1] tracking-[-0.02em] text-fg"
            style={{ "--d": "120ms" } as React.CSSProperties}
          >
            {p.title}
          </h1>
          <p className="rise mt-6 font-serif text-2xl italic text-accent md:text-3xl" style={{ "--d": "180ms" } as React.CSSProperties}>
            {cs.tagline}
          </p>
          <p className="rise mt-6 max-w-2xl text-lg text-fg-soft" style={{ "--d": "240ms" } as React.CSSProperties}>
            {p.blurb}
          </p>
          <div className="rise mt-8 flex flex-wrap items-center gap-3" style={{ "--d": "300ms" } as React.CSSProperties}>
            <a
              href={p.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-85"
            >
              <GitHubIcon className="h-4 w-4" /> View source <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <ul className="flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <li key={s} className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </header>

        <Reveal className="mt-16">
          <ArchDiagram kind={cs.diagram} caption={cs.diagramCaption} />
        </Reveal>

        <div className="mt-16">
          <Block index="01" title="Problem">
            <div className="max-w-2xl space-y-5 text-lg text-fg-soft">
              {cs.problem.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
          </Block>

          <Block index="02" title="Approach">
            <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
              {cs.approach.map((a, n) => (
                <li key={a.title} className="bg-bg p-6">
                  <p className="font-mono text-xs text-accent">Step {n + 1}</p>
                  <h3 className="mt-3 font-serif text-2xl text-fg">{a.title}</h3>
                  <p className="mt-2 text-[15px] text-fg-soft">{a.body}</p>
                </li>
              ))}
            </ol>
          </Block>

          <Block index="03" title="Decisions">
            <ul className="space-y-8">
              {cs.decisions.map((d) => (
                <li key={d.title} className="max-w-2xl">
                  <h3 className="font-serif text-2xl text-fg">{d.title}</h3>
                  <p className="mt-2 text-fg-soft">{d.body}</p>
                </li>
              ))}
            </ul>
          </Block>

          <Block index="04" title="Results">
            <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {cs.results.map((r) => (
                <div key={r.label} className="bg-bg p-6">
                  <p className="font-serif text-4xl leading-none text-fg md:text-5xl">{r.value}</p>
                  <p className="mt-3 text-sm text-muted">{r.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-2xl text-[15px] text-fg-soft">{cs.resultsNote}</p>
          </Block>

          <Block index="05" title="Limitations">
            <ul className="max-w-2xl space-y-3">
              {cs.limitations.map((l) => (
                <li key={l} className="relative pl-5 text-fg-soft">
                  <span className="absolute left-0 top-[0.75em] h-px w-2.5 bg-muted" aria-hidden="true" />
                  {l}
                </li>
              ))}
            </ul>
          </Block>
        </div>

        <nav aria-label="More case studies" className="mt-10 grid gap-4 border-t border-line pt-10 sm:grid-cols-2">
          <Link href={`/work/${prev.slug}`} className="group rounded-2xl border border-line p-6 transition-colors hover:border-line-strong hover:bg-raised">
            <span className="inline-flex items-center gap-2 font-mono text-xs text-muted">
              <ArrowLeft className="h-3.5 w-3.5" /> Previous
            </span>
            <span className="mt-3 block font-serif text-2xl text-fg group-hover:text-accent">{prev.title}</span>
          </Link>
          <Link
            href={`/work/${next.slug}`}
            className="group rounded-2xl border border-line p-6 text-right transition-colors hover:border-line-strong hover:bg-raised"
          >
            <span className="inline-flex items-center gap-2 font-mono text-xs text-muted">
              Next <ArrowRight className="h-3.5 w-3.5" />
            </span>
            <span className="mt-3 block font-serif text-2xl text-fg group-hover:text-accent">{next.title}</span>
          </Link>
        </nav>
      </div>
    </article>
  );
}
