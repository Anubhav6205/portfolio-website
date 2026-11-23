"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** "⌘" on Apple devices, "Ctrl" elsewhere. Server render uses "Ctrl". */
export function useModKey() {
  return useSyncExternalStore(
    subscribe,
    () => (/Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent) ? "⌘" : "Ctrl"),
    () => "Ctrl",
  );
}
