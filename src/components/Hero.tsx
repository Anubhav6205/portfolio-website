import { ArrowDown, ArrowRight } from "lucide-react";
import { profile } from "@/content/profile";
import { HeroGraph } from "./HeroGraph";
import { GitHubIcon, LinkedInIcon, HashnodeIcon } from "./Icons";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28">
      <HeroGraph />
      <div className="container-x relative">
        <p className="rise mb-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs uppercase tracking-[0.14em] text-muted" style={d(0)}>
          <span className="text-fg">{profile.title}</span>
          <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
          <span>{profile.employer}</span>
          <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
          <span>{profile.location}</span>
        </p>

        <h1 className="lift max-w-4xl font-serif text-[clamp(2.9rem,8.2vw,6.6rem)] leading-[0.98] tracking-[-0.02em] text-fg" style={d(90)}>
          {profile.headline.before} <em className="serif-accent">{profile.headline.accent}</em> {profile.headline.after}
        </h1>

        <p className="lift mt-8 max-w-xl text-lg text-fg-soft" style={d(200)}>
          {profile.summary}
        </p>

        <div className="rise mt-10 flex flex-wrap items-center gap-3" style={d(300)}>
          <a
            href="#work"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-fg transition-transform hover:-translate-y-0.5"
          >
            View work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-3 text-sm text-fg transition-colors hover:border-fg"
          >
            Get in touch
          </a>
          <span className="ml-1 inline-flex items-center gap-2.5 rounded-full border border-line bg-raised/60 px-3.5 py-2 font-mono text-xs text-fg-soft backdrop-blur">
            <span className="ping relative h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            {profile.status}
          </span>
        </div>

        <div className="rise mt-16 flex items-center justify-between" style={d(420)}>
          <ul className="flex items-center gap-5 text-muted">
            <li>
              <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition-colors hover:text-fg">
                <GitHubIcon className="h-5 w-5" />
              </a>
            </li>
            <li>
              <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-fg">
                <LinkedInIcon className="h-5 w-5" />
              </a>
            </li>
            <li>
              <a href={profile.socials.hashnode} target="_blank" rel="noopener noreferrer" aria-label="Blog on Hashnode" className="transition-colors hover:text-fg">
                <HashnodeIcon className="h-5 w-5" />
              </a>
            </li>
          </ul>
          <a href="#about" className="hidden items-center gap-3 font-mono text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-fg sm:flex">
            Scroll
            <span className="cue relative block h-10 w-px overflow-hidden bg-line-strong" aria-hidden="true" />
            <ArrowDown className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
