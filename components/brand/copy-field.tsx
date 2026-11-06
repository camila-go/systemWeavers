"use client";

import { useRef, useState } from "react";

/**
 * A value you are meant to take somewhere else: an image URL, a line of HTML.
 * The text stays selectable, so the button is a shortcut rather than the only
 * way to get the value out — clipboard writes are refused often enough
 * (an insecure origin, a locked-down browser) that the fallback matters.
 */
export function CopyField({ label, value }: { label: string; value: string }) {
  const [state, setState] = useState<"idle" | "copied" | "select">("idle");
  const textRef = useRef<HTMLSpanElement>(null);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setState("copied");
    } catch {
      // Select it instead, so the next keystroke copies it.
      const node = textRef.current;
      if (node) {
        const range = document.createRange();
        range.selectNodeContents(node);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
      setState("select");
    }
    window.setTimeout(() => setState("idle"), 2200);
  }

  return (
    <div className="flex flex-col gap-1">
      <p className="text-[12px] font-semibold uppercase tracking-[1px] text-[var(--color-text-muted)]">
        {label}
      </p>
      <div className="flex items-stretch gap-2">
        <span
          ref={textRef}
          className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap rounded-[var(--radius-md)] border border-[var(--color-border-default)] bg-[var(--color-bg-hero)] px-3 py-2 font-mono text-[13px] leading-5 text-[var(--color-text-primary)]"
        >
          {value}
        </span>
        <button
          type="button"
          onClick={copy}
          className="shrink-0 rounded-[var(--radius-md)] border border-[var(--color-border-brand)] px-3 py-2 text-[13px] font-semibold text-[var(--color-text-brand)] transition-colors hover:bg-[var(--color-bg-tint)] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
        >
          {state === "copied" ? "Copied" : state === "select" ? "Selected" : "Copy"}
        </button>
      </div>
      {state === "select" ? (
        <p className="text-[13px] leading-5 text-[var(--color-text-muted)]">
          Your browser blocked the clipboard. The text is selected — press
          Ctrl&nbsp;C, or Cmd&nbsp;C on a Mac.
        </p>
      ) : null}
    </div>
  );
}
