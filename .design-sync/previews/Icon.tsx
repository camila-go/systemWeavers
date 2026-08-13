import { Icon } from "system-weavers";

const names = [
  "HeartHandshake",
  "CircleCheck",
  "ChartColumn",
  "Megaphone",
  "Network",
  "Users",
  "Menu",
  "Minus",
  "Plus",
  "ArrowUpRight",
] as const;

export function Gallery() {
  return (
    <div style={{ display: "flex", gap: 20, flexWrap: "wrap", color: "#19646b" }}>
      {names.map((name) => (
        <Icon key={name} name={name} className="size-8" />
      ))}
    </div>
  );
}

export function HeartHandshake() {
  return <Icon name="HeartHandshake" className="size-12" />;
}
