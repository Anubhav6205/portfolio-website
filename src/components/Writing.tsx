import { ArrowUpRight } from "lucide-react";
import { getPosts } from "@/lib/hashnode";
import { blogHome } from "@/content/writing";
import { Accent, Section } from "./Section";
import { Reveal } from "./Reveal";

function formatDate(iso: string) {
  if (!iso) return "";
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
}

export async function Writing() {
  const posts = await getPosts(6);
  return (
    <Section
      id="writing"
      index="06"
      label="Writing"
      title={
        <>
          Notes from <Accent>building.</Accent>
        </>
      }
      intro="I write up what I learn while building, mostly retrieval, Kubernetes and system design."
    >
      <ul className="border-t border-line">
        {posts.map((p, i) => (
          <Reveal as="li" key={p.url} delay={i * 60} className="border-b border-line">
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid gap-2 py-7 transition-colors md:grid-cols-[200px_1fr_auto] md:items-baseline md:gap-8"
            >
              <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted">{formatDate(p.date)}</span>
              <span>
                <span className="block font-serif text-2xl leading-snug text-fg transition-colors group-hover:text-accent md:text-[1.7rem]">
                  {p.title}
                </span>
                {p.blurb && <span className="mt-2 block max-w-2xl text-[15px] text-fg-soft">{p.blurb}</span>}
              </span>
              <span className="flex items-center gap-3">
                {p.tags.map((t) => (
                  <span key={t} className="hidden font-mono text-[11px] text-muted lg:inline">
                    {t}
                  </span>
                ))}
                <ArrowUpRight className="h-4 w-4 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </span>
            </a>
          </Reveal>
        ))}
      </ul>
      <a
        href={blogHome}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-1.5 text-sm text-fg-soft transition-colors hover:text-accent"
      >
        All posts on Hashnode <ArrowUpRight className="h-3.5 w-3.5" />
      </a>
    </Section>
  );
}
