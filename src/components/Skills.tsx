import { skills } from "@/content/skills";
import { Accent, Section } from "./Section";
import { Reveal } from "./Reveal";

export function Skills() {
  return (
    <Section
      id="skills"
      index="04"
      label="Skills"
      title={
        <>
          Tools I have shipped with, <Accent>not a wishlist.</Accent>
        </>
      }
      intro="Every item here shows up in the experience or projects above."
    >
      <div className="divide-y divide-line border-y border-line">
        {skills.map((g, i) => (
          <Reveal key={g.group} delay={i * 60} className="grid gap-4 py-7 md:grid-cols-[200px_1fr] md:gap-8">
            <h3 className="label text-muted md:pt-2">{g.group}</h3>
            <ul className="flex flex-wrap gap-2">
              {g.items.map((s) => (
                <li
                  key={s}
                  className="rounded-[2px] border border-line px-3 py-1.5 text-[13px] text-fg-soft transition-colors hover:border-accent hover:text-fg"
                >
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
