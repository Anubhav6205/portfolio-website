"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, [role='tab'], [cmdk-item], input, textarea, label, summary";

/**
 * A small accent ball that replaces the pointer, follows it with light easing and
 * opens into a ring over links and buttons. Mouse and trackpad only. Touch users
 * and visitors who prefer reduced motion keep the native cursor.
 */
export function CursorDot() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    // The ball replaces the pointer, so hide the native cursor only while it runs.
    document.documentElement.classList.add("has-cursor-dot");

    let x = -100;
    let y = -100;
    let tx = -100;
    let ty = -100;
    let raf = 0;
    let visible = false;

    const tick = () => {
      // Ease toward the pointer. Larger factor means a tighter follow.
      x += (tx - x) * 0.35;
      y += (ty - y) * 0.35;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (Math.abs(tx - x) > 0.1 || Math.abs(ty - y) > 0.1) raf = requestAnimationFrame(tick);
      else raf = 0;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      tx = e.clientX;
      ty = e.clientY;
      if (!visible) {
        // Jump to the first position instead of sliding in from the corner.
        x = tx;
        y = ty;
        visible = true;
        el.dataset.visible = "true";
      }
      const target = e.target as Element | null;
      el.dataset.hover = target?.closest(INTERACTIVE) ? "true" : "false";
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      visible = false;
      el.dataset.visible = "false";
    };
    const onDown = () => (el.dataset.down = "true");
    const onUp = () => (el.dataset.down = "false");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      document.documentElement.classList.remove("has-cursor-dot");
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="cursor-dot" data-visible="false" data-hover="false">
      <span />
    </div>
  );
}
