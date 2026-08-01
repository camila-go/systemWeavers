import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

const base =
  "inline-flex items-center justify-center rounded-[var(--radius-md)] px-7 py-3.5 text-base font-semibold leading-6 transition-all duration-200 ease-out active:scale-[0.98] disabled:opacity-60 disabled:active:scale-100 motion-reduce:transition-none motion-reduce:active:scale-100";

const variants = {
  accent:
    "bg-[var(--color-bg-accent)] text-[var(--color-text-on-accent)] hover:-translate-y-0.5 hover:brightness-95 hover:shadow-[0_6px_20px_rgba(232,192,56,0.35)] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[var(--color-focus)] focus-visible:outline-offset-2",
  brand:
    "bg-[var(--color-bg-brand)] text-[var(--color-text-on-brand)] hover:-translate-y-0.5 hover:bg-[var(--green-900)] hover:shadow-[0_6px_20px_rgba(25,100,107,0.25)] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[var(--color-focus)] focus-visible:outline-offset-2",
  outline:
    "border border-[var(--color-border-brand)] bg-transparent text-[var(--color-text-brand)] hover:-translate-y-0.5 hover:bg-[var(--green-50)] hover:shadow-[0_4px_16px_rgba(40,62,107,0.08)]",
} as const;

type Variant = keyof typeof variants;

type Props = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  href?: string;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "onClick">;

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
    // Same-page anchors must use native <a> — Next.js Link often skips hash scrolling.
    if (href.startsWith("#")) {
      return (
        <a href={href} className={classes} onClick={onClick}>
          {children}
        </a>
      );
    }

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
