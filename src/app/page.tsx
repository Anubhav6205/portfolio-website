import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Timeline } from "@/components/Timeline";
import { Work } from "@/components/Work";
import { Skills } from "@/components/Skills";
import { Recognition } from "@/components/Recognition";
import { Writing } from "@/components/Writing";
import { Contact } from "@/components/Contact";
import { Accent, Section } from "@/components/Section";

export const revalidate = 86400;

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Timeline />
      <Section
        id="work"
        index="03"
        label="Work"
        title={
          <>
            Projects I built to <Accent>learn by shipping.</Accent>
          </>
        }
        intro="Personal projects, separate from my work at Chubb. The first three have full write-ups with architecture, results and what I would change."
      >
        <Work />
      </Section>
      <Skills />
      <Recognition />
      <Writing />
      <Contact />
    </>
  );
}
