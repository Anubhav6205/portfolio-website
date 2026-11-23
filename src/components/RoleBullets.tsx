"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export function RoleBullets({ bullets, visible = 3, id }: { bullets: string[]; visible?: number; id: string }) {
  const [open, setOpen] = useState(false);
  const shown = open ? bullets : bullets.slice(0, visible);
  const hidden = bullets.length - visible;
  return (
    <>
      <ul id={id} className="mt-5 space-y-3">
        {shown.map((b) => (
          <li key={b} className="relative pl-5 text-[15px] leading-relaxed text-fg-soft">
            <span className="absolute left-0 top-[0.7em] h-px w-2.5 bg-accent" aria-hidden="true" />
            {b}
          </li>
        ))}
      </ul>
      {hidden > 0 && (
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={id}
          className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-accent"
        >
          {open ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
          {open ? "Show less" : `${hidden} more`}
        </button>
      )}
    </>
  );
}
