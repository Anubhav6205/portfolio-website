import { Reveal } from "./Reveal";

type Props = {
  id: string;
  index: string;
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

/** A page section with a mono index label and a serif heading. */
export function Section({ id, index, label, title, intro, children, className = "" }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`border-t border-line py-24 md:py-32 ${className}`}>
      <div className="container-x">
        <Reveal className="mb-12 grid gap-6 md:mb-16 md:grid-cols-[200px_1fr] md:gap-8">
          <p className="pt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            <span className="text-accent">{index}</span> / {label}
          </p>
          <div>
            <h2 id={`${id}-title`} className="font-serif text-4xl leading-[1.08] tracking-[-0.01em] text-fg md:text-[3.4rem]">
              {title}
            </h2>
            {intro && <p className="mt-5 max-w-2xl text-[16px] text-fg-soft">{intro}</p>}
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

export function Accent({ children }: { children: React.ReactNode }) {
  return <em className="serif-accent">{children}</em>;
}
