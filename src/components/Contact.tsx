"use client";

import { ArrowUpRight, Check, Copy, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { profile } from "@/content/profile";
import { GitHubIcon, LinkedInIcon, HashnodeIcon } from "./Icons";
import { useUi } from "./Providers";
import { Reveal } from "./Reveal";
import { ContactForm } from "./ContactForm";

const links = [
  { label: "LinkedIn", href: profile.socials.linkedin, Icon: LinkedInIcon, note: "Best for roles" },
  { label: "GitHub", href: profile.socials.github, Icon: GitHubIcon, note: "Code and projects" },
  { label: "Hashnode", href: profile.socials.hashnode, Icon: HashnodeIcon, note: "Writing" },
];

export function Contact() {
  const { toast } = useUi();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      toast("Email copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t border-line py-24 md:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] [background:radial-gradient(circle,var(--accent-wash)_0%,transparent_65%)]"
      />
      <div className="container-x relative">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            <span className="text-accent">07</span> / Contact
          </p>
          <h2 id="contact-title" className="mt-8 max-w-4xl font-serif text-[clamp(2.4rem,6vw,4.8rem)] leading-[1.02] tracking-[-0.015em] text-fg">
            Have a hard problem with an LLM in it? <em className="serif-accent">Let&apos;s talk.</em>
          </h2>
          <p className="mt-8 max-w-xl text-lg text-fg-soft">
            I am open to AI Engineer and Applied AI roles. Send a message here or email me directly.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <Reveal delay={120} className="flex flex-wrap items-center gap-3">
              <a href={`mailto:${profile.email}`} className="btn-primary group">
                <Mail className="h-4 w-4" />
                <span className="text-[14px] font-normal">{profile.email}</span>
              </a>
              <button
                type="button"
                onClick={copy}
                className="label inline-flex items-center gap-2 rounded-[3px] border border-line-strong px-4 py-[0.9rem] text-fg transition-colors hover:border-accent"
                aria-label="Copy email address"
              >
                {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </Reveal>
            <p className="mt-5 inline-flex items-center gap-1.5 text-sm text-muted">
              <MapPin className="h-4 w-4" /> {profile.location}
            </p>

            <Reveal delay={200} className="mt-10 grid gap-px overflow-hidden rounded-[6px] border border-line bg-line">
              {links.map(({ label, href, Icon, note }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between bg-bg px-6 py-5 transition-colors hover:bg-raised"
                >
                  <span className="flex items-center gap-4">
                    <Icon className="h-5 w-5 text-muted transition-colors group-hover:text-accent" />
                    <span>
                      <span className="block text-fg">{label}</span>
                      <span className="label-sm mt-1 block text-muted">{note}</span>
                    </span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
                </a>
              ))}
            </Reveal>
          </div>
          <Reveal delay={160}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
