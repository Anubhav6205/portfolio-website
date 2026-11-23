import { GraduationCap, Sparkles } from "lucide-react";
import { nextStep, timeline, type Role } from "@/content/experience";
import { Accent, Section } from "./Section";
import { Reveal } from "./Reveal";
import { RoleBullets } from "./RoleBullets";

function Marker({ kind }: { kind: Role["kind"] }) {
  if (kind === "education")
    return (
      <span className="grid h-7 w-7 place-items-center rounded-full border border-line-strong bg-bg text-muted">
        <GraduationCap className="h-3.5 w-3.5" />
      </span>
    );
  if (kind === "next")
    return (
      <span className="grid h-7 w-7 place-items-center rounded-full border border-dashed border-accent bg-bg text-accent">
        <Sparkles className="h-3.5 w-3.5" />
      </span>
    );
  return (
    <span className="grid h-7 w-7 place-items-center rounded-full border border-line-strong bg-bg">
      <span className="h-2 w-2 rounded-full bg-accent" />
    </span>
  );
}

function Entry({ role, i }: { role: Role; i: number }) {
  return (
    <Reveal as="li" delay={60} className="relative grid gap-4 pb-14 last:pb-0 md:grid-cols-[200px_1fr] md:gap-8">
      <div className="hidden pt-1 md:block">
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">{role.period}</p>
      </div>
      <div className="relative pl-12">
        <div className="absolute left-0 top-0">
          <Marker kind={role.kind} />
        </div>
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.12em] text-muted md:hidden">{role.period}</p>
        <h3 className="font-serif text-2xl leading-tight text-fg md:text-3xl">{role.title}</h3>
        <p className="mt-1 text-sm text-muted">{role.org}</p>
        {role.summary && <p className="mt-3 text-fg-soft">{role.summary}</p>}
        {role.bullets.length > 0 && <RoleBullets bullets={role.bullets} id={`role-${i}`} visible={role.bullets.length > 4 ? 3 : 4} />}
        {role.tags && (
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {role.tags.map((t) => (
              <li key={t} className="chip label-sm">
                {t}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Reveal>
  );
}

export function Timeline() {
  const entries = [nextStep, ...timeline];
  return (
    <Section
      id="experience"
      index="02"
      label="Experience"
      title={
        <>
          From intern to senior, with a steady move toward <Accent>AI.</Accent>
        </>
      }
      intro="My work at Chubb, from intern to Senior Software Engineer, newest first."
    >
      <ol className="relative">
        <span
          aria-hidden="true"
          className="absolute bottom-2 left-[13px] top-2 w-px bg-gradient-to-b from-accent/60 via-line-strong to-transparent md:left-[245px]"
        />
        {entries.map((r, i) => (
          <Entry key={r.title + r.period} role={r} i={i} />
        ))}
      </ol>
    </Section>
  );
}
