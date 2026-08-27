import type { ImgHTMLAttributes } from "react";
import { imageMap } from "./image-map";

// Design-system build only — aliased in place of next/image.
// No Next.js image-optimization server exists outside the real app, so this
// renders a plain <img>, resolving known site photos to their inlined data URI.
type Props = {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
} & Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt">;

export default function Image({
  src,
  alt,
  fill = false,
  className = "",
  // Accepted so callers can pass next/image's API unchanged, then dropped —
  // there's no optimizer here to act on them.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sizes: _sizes,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  priority: _priority,
  style,
  ...props
}: Props) {
  const resolvedSrc = imageMap[src] ?? src;
  const classes = fill ? `absolute inset-0 h-full w-full ${className}` : className;

  // Replacing next/image is this file's entire purpose — <img> is deliberate.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={resolvedSrc} alt={alt} className={classes} style={style} {...props} />;
}
