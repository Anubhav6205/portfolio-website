import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { profile } from "@/content/profile";
import { HeroGraph } from "./HeroGraph";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

const socials = [
  { label: "GitHub", href: profile.socials.github },
  { label: "LinkedIn", href: profile.socials.linkedin },
  { label: "Hashnode", href: profile.socials.hashnode },
];

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28">
      <HeroGraph />
      <div className="container-x relative">
        <p className="rise label mb-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-muted" style={d(0)}>
          <span className="text-fg">{profile.title}</span>
          <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
          <span>{profile.employer}</span>
          <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
          <span>{profile.location}</span>
        </p>

        <h1
          className="lift max-w-4xl font-serif text-[clamp(2.75rem,7.4vw,6rem)] leading-[1] tracking-[-0.015em] text-fg"
          style={d(90)}
        >
          {profile.headline.before} <em className="serif-accent whitespace-nowrap">{profile.headline.accent}</em> {profile.headline.after}
        </h1>

        <p className="lift mt-8 max-w-xl text-[17px] text-fg-soft" style={d(200)}>
          {profile.summary}
        </p>

        <div className="rise mt-10 flex flex-wrap items-center gap-x-6 gap-y-3" style={d(300)}>
          <a href="#work" className="btn-primary label group">
            View work
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a href="#contact" className="btn-text label">
            Let&apos;s talk <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="rise mt-10 flex flex-wrap items-center gap-3" style={d(380)}>
          <span className="label-sm inline-flex items-center gap-2.5 text-fg-soft">
            <span className="ping relative h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            {profile.status}
          </span>
        </div>

        <div className="rise mt-14 flex items-center justify-between" style={d(460)}>
          <ul className="flex flex-wrap items-center gap-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="chip label-sm transition-colors hover:border-accent hover:text-fg"
                >
                  {s.label} <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#about"
            className="label-sm hidden items-center gap-3 text-muted transition-colors hover:text-fg sm:flex"
          >
            Scroll
            <span className="cue relative block h-10 w-px overflow-hidden bg-line-strong" aria-hidden="true" />
            <ArrowDown className="h-3 w-3" />
          </a>
        </div>
      </div>
    </section>
  );
}
