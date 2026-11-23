"use client";

import { ArrowUpRight, Check, Copy, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { profile } from "@/content/profile";
import { GitHubIcon, LinkedInIcon, HashnodeIcon } from "./Icons";
import { useUi } from "./Providers";
import { Reveal } from "./Reveal";

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
        className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-accent opacity-[0.06] blur-3xl"
      />
      <div className="container-x relative">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
            <span className="text-accent">07</span> / Contact
          </p>
          <h2 id="contact-title" className="mt-8 max-w-4xl font-serif text-[clamp(2.6rem,7vw,5.6rem)] leading-[1] tracking-[-0.02em] text-fg">
            Have a hard problem with an LLM in it? <em className="serif-accent">Let&apos;s talk.</em>
          </h2>
          <p className="mt-8 max-w-xl text-lg text-fg-soft">
            I am open to AI Engineer and Applied AI roles. Email is the fastest way to reach me.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-12 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3.5 text-accent-fg transition-transform hover:-translate-y-0.5"
          >
            <Mail className="h-4 w-4" />
            <span className="font-medium">{profile.email}</span>
          </a>
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-3.5 text-sm text-fg transition-colors hover:border-fg"
            aria-label="Copy email address"
          >
            {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy"}
          </button>
          <span className="ml-1 inline-flex items-center gap-1.5 text-sm text-muted">
            <MapPin className="h-4 w-4" /> {profile.location}
          </span>
        </Reveal>

        <Reveal delay={200} className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {links.map(({ label, href, Icon, note }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between bg-bg p-6 transition-colors hover:bg-raised"
            >
              <span className="flex items-center gap-4">
                <Icon className="h-5 w-5 text-muted transition-colors group-hover:text-accent" />
                <span>
                  <span className="block text-fg">{label}</span>
                  <span className="block font-mono text-xs text-muted">{note}</span>
                </span>
              </span>
              <ArrowUpRight className="h-4 w-4 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
