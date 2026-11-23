"use client";

import { Command } from "cmdk";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { ArrowUpRight, Copy, FileText, Hash, Moon, Sun, Layers } from "lucide-react";
import { profile } from "@/content/profile";
import { caseStudies } from "@/content/projects";
import { GitHubIcon, LinkedInIcon, HashnodeIcon } from "./Icons";
import { sections } from "./sections";
import { scrollToId } from "./SmoothScroll";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  toast: (m: string) => void;
};

const itemClass =
  "flex cursor-pointer items-center gap-3 rounded-[3px] px-3 py-2.5 text-sm text-fg-soft transition-colors";

export function CommandPalette({ open, onOpenChange, toast }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();

  const run = (fn: () => void) => {
    onOpenChange(false);
    // Let the dialog close before scrolling or navigating.
    setTimeout(fn, 60);
  };

  const goSection = (id: string) =>
    run(() => {
      if (pathname === "/") {
        scrollToId(id);
        history.replaceState(null, "", `#${id}`);
      } else {
        router.push(`/#${id}`);
      }
    });

  const openUrl = (url: string) => run(() => window.open(url, "_blank", "noopener,noreferrer"));

  return (
    <Command.Dialog
      open={open}
      onOpenChange={onOpenChange}
      label="Command menu"
      className="overflow-hidden rounded-[6px] border border-line-strong bg-raised shadow-2xl"
    >
      <div className="flex items-center gap-3 border-b border-line px-4">
        <span className="font-mono text-xs text-accent">&gt;</span>
        <Command.Input
          placeholder="Jump to a section, open a project, copy my email..."
          className="h-14 w-full bg-transparent text-[15px] text-fg outline-none placeholder:text-muted focus-visible:outline-none"
        />
        <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted">ESC</kbd>
      </div>
      <Command.List data-lenis-prevent className="max-h-[60vh] overflow-y-auto p-2">
        <Command.Empty className="px-3 py-6 text-center text-sm text-muted">No results.</Command.Empty>

        <Command.Group heading="Sections">
          {sections.map((s) => (
            <Command.Item key={s.id} value={`section ${s.label}`} onSelect={() => goSection(s.id)} className={itemClass}>
              <Hash className="cmdk-icon h-4 w-4 text-muted" />
              {s.label}
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="Case studies">
          {caseStudies.map((p) => (
            <Command.Item
              key={p.slug}
              value={`case study ${p.title} ${p.stack.join(" ")}`}
              onSelect={() => run(() => router.push(`/work/${p.slug}`))}
              className={itemClass}
            >
              <Layers className="cmdk-icon h-4 w-4 text-muted" />
              {p.title}
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="Actions">
          <Command.Item
            value="copy email address"
            onSelect={() =>
              run(async () => {
                try {
                  await navigator.clipboard.writeText(profile.email);
                  toast("Email copied to clipboard");
                } catch {
                  window.location.href = `mailto:${profile.email}`;
                }
              })
            }
            className={itemClass}
          >
            <Copy className="cmdk-icon h-4 w-4 text-muted" />
            Copy email
            <span className="ml-auto font-mono text-xs text-muted">{profile.email}</span>
          </Command.Item>
          <Command.Item value="open resume pdf cv" onSelect={() => openUrl(profile.resume)} className={itemClass}>
            <FileText className="cmdk-icon h-4 w-4 text-muted" />
            Open resume
            <ArrowUpRight className="ml-auto h-3.5 w-3.5 text-muted" />
          </Command.Item>
          <Command.Item
            value="toggle theme dark light"
            onSelect={() => run(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))}
            className={itemClass}
          >
            {resolvedTheme === "dark" ? (
              <Sun className="cmdk-icon h-4 w-4 text-muted" />
            ) : (
              <Moon className="cmdk-icon h-4 w-4 text-muted" />
            )}
            Switch to {resolvedTheme === "dark" ? "light" : "dark"} theme
          </Command.Item>
        </Command.Group>

        <Command.Group heading="Elsewhere">
          <Command.Item value="github" onSelect={() => openUrl(profile.socials.github)} className={itemClass}>
            <GitHubIcon className="cmdk-icon h-4 w-4 text-muted" />
            GitHub
            <ArrowUpRight className="ml-auto h-3.5 w-3.5 text-muted" />
          </Command.Item>
          <Command.Item value="linkedin" onSelect={() => openUrl(profile.socials.linkedin)} className={itemClass}>
            <LinkedInIcon className="cmdk-icon h-4 w-4 text-muted" />
            LinkedIn
            <ArrowUpRight className="ml-auto h-3.5 w-3.5 text-muted" />
          </Command.Item>
          <Command.Item value="hashnode blog writing" onSelect={() => openUrl(profile.socials.hashnode)} className={itemClass}>
            <HashnodeIcon className="cmdk-icon h-4 w-4 text-muted" />
            Blog on Hashnode
            <ArrowUpRight className="ml-auto h-3.5 w-3.5 text-muted" />
          </Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}
