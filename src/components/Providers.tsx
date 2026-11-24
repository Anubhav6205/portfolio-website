"use client";

import { ThemeProvider } from "next-themes";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const CommandPalette = dynamic(() => import("./CommandPalette").then((m) => m.CommandPalette), { ssr: false });

type Ui = {
  toast: (message: string) => void;
  openPalette: () => void;
};

const UiContext = createContext<Ui>({ toast: () => {}, openPalette: () => {} });

export const useUi = () => useContext(UiContext);

export function Providers({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteLoaded, setPaletteLoaded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toast = useCallback((m: string) => {
    setMessage(m);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(null), 2200);
  }, []);

  // Load the palette on the first interaction (or after a few seconds), so it is ready
  // before anyone opens it but never competes with the initial page load.
  useEffect(() => {
    const events = ["pointermove", "keydown", "touchstart", "scroll"] as const;
    const load = () => {
      setPaletteLoaded(true);
      events.forEach((e) => window.removeEventListener(e, load));
      clearTimeout(timer);
    };
    events.forEach((e) => window.addEventListener(e, load, { once: true, passive: true }));
    const timer = setTimeout(load, 6000);
    return () => {
      events.forEach((e) => window.removeEventListener(e, load));
      clearTimeout(timer);
    };
  }, []);

  const openPalette = useCallback(() => {
    setPaletteLoaded(true);
    setPaletteOpen(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteLoaded(true);
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      <UiContext.Provider value={{ toast, openPalette }}>
        {children}
        {paletteLoaded && <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} toast={toast} />}
        <div
          role="status"
          aria-live="polite"
          className={`pointer-events-none fixed bottom-6 left-1/2 z-[95] -translate-x-1/2 rounded-[3px] border border-line-strong bg-raised px-4 py-2 font-mono text-xs text-fg shadow-lg transition-all duration-300 ${
            message ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          {message}
        </div>
      </UiContext.Provider>
    </ThemeProvider>
  );
}
