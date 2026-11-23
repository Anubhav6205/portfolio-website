import { metrics, profile } from "@/content/profile";
import { Accent, Section } from "./Section";
import { MetricGrid } from "./MetricGrid";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <Section
      id="about"
      index="01"
      label="About"
      title={
        <>
          Product engineering, now with <Accent>agents</Accent> in the loop.
        </>
      }
    >
      <div className="grid md:grid-cols-[200px_1fr] md:gap-8">
        <div aria-hidden="true" />
        <div>
          <div className="grid gap-6 text-fg-soft md:grid-cols-2 md:gap-10">
            {profile.about.map((p, i) => (
              <Reveal key={i} delay={i * 80}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-16">
            <MetricGrid metrics={metrics} />
          </div>
        </div>
      </div>
    </Section>
  );
}
