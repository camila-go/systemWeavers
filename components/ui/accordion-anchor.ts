import type { MouseEvent } from "react";

/**
 * Keeps the clicked accordion row visually still.
 *
 * The groups are exclusive, so opening one closes the last. When the item that
 * closes sits above the one being opened, everything below it shifts up — the
 * row you just clicked jumps out from under the cursor (measured at ~156px on
 * the FAQ). Scroll position never changes; the content moves.
 *
 * Measure the row before the toggle, again on the next frame, and absorb the
 * difference. `behavior: "instant"` matters: the document sets
 * `scroll-behavior: smooth`, which would otherwise animate the correction and
 * look worse than the jump it fixes.
 */
export function keepSummaryInPlace(event: MouseEvent<HTMLElement>) {
  const details = event.currentTarget.closest("details");
  if (!details) return;

  const before = details.getBoundingClientRect().top;

  // Hold the row for a few frames rather than correcting once: layout can keep
  // settling after the toggle (the services list drifted a further ~18px a
  // frame or two later), and a single correction leaves that residue behind.
  let frames = 0;
  const pin = () => {
    const delta = details.getBoundingClientRect().top - before;
    // Sub-pixel drift isn't worth a scroll call.
    if (Math.abs(delta) >= 1) window.scrollBy({ top: delta, behavior: "instant" });
    if (++frames < 5) requestAnimationFrame(pin);
  };
  requestAnimationFrame(pin);
}
