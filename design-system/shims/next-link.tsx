import type { AnchorHTMLAttributes, ReactNode } from "react";

// Design-system build only — aliased in place of next/link.
// Renders a plain anchor; no client-side routing exists outside the Next.js app.
type Props = { href: string; children?: ReactNode } & Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
>;

export default function Link({ href, children, ...props }: Props) {
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}
