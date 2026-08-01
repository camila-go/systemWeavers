import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  ChartColumn,
  CircleCheck,
  HeartHandshake,
  Megaphone,
  Menu,
  Minus,
  Network,
  Plus,
  Users,
} from "lucide-react";

export const icons = {
  HeartHandshake,
  CircleCheck,
  ChartColumn,
  Megaphone,
  Network,
  Users,
  Menu,
  Minus,
  Plus,
  ArrowUpRight,
} as const satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

export function Icon({
  name,
  className,
  strokeWidth = 1.75,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  const Comp = icons[name];
  return (
    <Comp
      className={className}
      strokeWidth={strokeWidth}
      absoluteStrokeWidth={false}
      aria-hidden
    />
  );
}
