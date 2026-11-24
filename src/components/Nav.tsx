"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { profile } from "@/content/profile";
import { navSections } from "./sections";
import { ThemeToggle } from "./ThemeToggle";
import { useUi } from "./Providers";
import { useModKey } from "@/lib/useModKey";

export function Nav() {
  const pathname = usePathname();
  const { openPalette } = useUi();
  const modKey = useModKey();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const home = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!home) return;
    const els = navSections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [home]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (menuOpen) window.__lenis?.stop();
    else window.__lenis?.start();
  }, [menuOpen]);

  const href = (id: string) => (home ? `#${id}` : `/#${id}`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen ? "border-b border-line bg-bg/95" : "border-b border-transparent"
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between" aria-label="Main">
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-mono text-[13px] tracking-tight text-fg"
          title={`${profile.name}, home`}
        >
          <span className="grid h-8 w-8 place-items-center rounded-[3px] border border-line-strong font-serif text-base italic transition-colors group-hover:border-accent group-hover:text-accent">
            {profile.initials}
          </span>
          <span className="sr-only sm:not-sr-only">anubhav.gupta</span>
        </Link>

        <ul className="hidden items-center gap-2 md:flex">
          {navSections.map((s) => (
            <li key={s.id}>
              <a
                href={href(s.id)}
                className={`label relative px-3 py-2 transition-colors ${
                  active === s.id ? "text-fg" : "text-muted hover:text-fg"
                }`}
              >
                {active === s.id && (
                  <span className="absolute inset-x-3 bottom-0.5 h-px bg-accent" aria-hidden="true" />
                )}
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openPalette}
            className="label-sm hidden items-center gap-2 rounded-[3px] border border-line px-3 py-2 text-muted transition-colors hover:border-line-strong hover:text-fg lg:flex"
            title="Open command menu"
          >
            Search
            <kbd className="rounded-[2px] bg-sunken px-1.5 py-0.5 font-mono text-[10px] normal-case tracking-normal">{modKey} K</kbd>
          </button>
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="label hidden items-center gap-1.5 rounded-[3px] border border-line-strong px-3.5 py-2 text-fg transition-colors hover:border-accent hover:text-accent sm:flex"
          >
            Resume <ArrowUpRight className="h-3 w-3" />
          </a>
          <ThemeToggle />
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-[3px] border border-line text-fg md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div id="mobile-menu" className="container-x h-[calc(100dvh-4rem)] pb-10 pt-6 md:hidden">
          <ul className="flex flex-col">
            {navSections.map((s, i) => (
              <li key={s.id} className="rise border-b border-line" style={{ "--d": `${i * 50}ms` } as React.CSSProperties}>
                <a
                  href={href(s.id)}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-baseline justify-between py-4 font-serif text-3xl text-fg"
                >
                  {s.label}
                  <span className="label-sm text-muted">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary label mt-8"
          >
            Resume <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      )}
    </header>
  );
}
