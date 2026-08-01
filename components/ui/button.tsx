import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const base =
  "inline-flex items-center justify-center rounded-[var(--radius-md)] px-7 py-3.5 text-base font-semibold leading-6 transition-colors disabled:opacity-60";

const variants = {
  accent:
    "bg-[var(--color-bg-accent)] text-[var(--color-text-on-accent)] hover:brightness-95 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[var(--color-focus)] focus-visible:outline-offset-2",
  brand:
    "bg-[var(--color-bg-brand)] text-[var(--color-text-on-brand)] hover:bg-[var(--green-900)] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[var(--color-focus)] focus-visible:outline-offset-2",
  outline:
    "border border-[var(--color-border-brand)] bg-transparent text-[var(--color-text-brand)] hover:bg-[var(--green-50)]",
} as const;

type Variant = keyof typeof variants;

type Props = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  href?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  variant = "accent",
  className = "",
  href,
  type = "button",
  onClick,
  ...props
}: Props) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick as never}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
