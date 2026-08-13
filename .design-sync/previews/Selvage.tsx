import { Selvage } from "system-weavers";

// A thin brand-stripe divider — shown at its real usage spot, under a header,
// so the card isn't just a near-empty sliver.
export function Default() {
  return (
    <div style={{ border: "1px solid #dad4c6", borderRadius: 8, overflow: "hidden" }}>
      <div style={{ padding: "20px 24px", fontFamily: "sans-serif", color: "#283e6b" }}>
        System Weavers
      </div>
      <Selvage />
    </div>
  );
}

export function Equal() {
  return (
    <div style={{ border: "1px solid #dad4c6", borderRadius: 8, overflow: "hidden" }}>
      <div style={{ padding: "20px 24px", fontFamily: "sans-serif", color: "#283e6b" }}>
        Equal weights
      </div>
      <Selvage equal />
    </div>
  );
}
