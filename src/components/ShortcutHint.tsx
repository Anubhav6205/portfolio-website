"use client";

import { useModKey } from "@/lib/useModKey";

export function ShortcutHint() {
  const modKey = useModKey();
  return (
    <span className="hidden items-center gap-1.5 sm:inline-flex">
      Press <kbd className="rounded border border-line px-1.5 py-0.5 text-[10px]">{modKey} K</kbd>
    </span>
  );
}
