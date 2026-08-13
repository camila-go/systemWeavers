import { SelvageMark } from "system-weavers";

// Compact brand mark used near a logo/wordmark — shown in that context so
// the card isn't just a near-empty sliver.
export function Default() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        border: "1px solid #dad4c6",
        borderRadius: 8,
        padding: 20,
        fontFamily: "sans-serif",
      }}
    >
      <span style={{ color: "#19646b", fontWeight: 600, fontSize: 20 }}>System Weavers</span>
      <SelvageMark />
    </div>
  );
}
