import { ArrowUpRight, Trophy, Award as AwardIcon } from "lucide-react";
import { awards } from "@/content/awards";
import { Accent, Section } from "./Section";
import { Reveal } from "./Reveal";

export function Recognition() {
  return (
    <Section
      id="recognition"
      index="05"
      label="Recognition"
      title={
        <>
          Two hackathon wins and some <Accent>kind words.</Accent>
        </>
      }
    >
      <ul className="grid gap-5 md:grid-cols-2">
        {awards.map((a, i) => {
          const Icon = a.rank ? Trophy : AwardIcon;
          const body = (
            <>
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[3px] border border-line bg-sunken text-accent">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="font-mono text-xs text-muted">{a.date}</span>
              </div>
              <h3 className="mt-6 font-serif text-2xl leading-tight text-fg">
                {a.title}
                {a.link && (
                  <ArrowUpRight className="ml-1.5 inline h-4 w-4 align-baseline text-muted transition-colors group-hover:text-accent" />
                )}
              </h3>
              {a.rank && <p className="mt-2 font-mono text-sm text-accent">{a.rank}</p>}
              <p className="mt-3 text-[15px] text-fg-soft">{a.detail}</p>
            </>
          );
          return (
            <Reveal as="li" key={a.title} delay={(i % 2) * 80} className={i === awards.length - 1 && awards.length % 2 === 1 ? "md:col-span-2" : ""}>
              {a.link ? (
                <a
                  href={a.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full rounded-[6px] border border-line p-6 transition-colors hover:border-line-strong hover:bg-raised md:p-8"
                >
                  {body}
                </a>
              ) : (
                <div className="h-full rounded-[6px] border border-line p-6 md:p-8">{body}</div>
              )}
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
