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
  sizes: _sizes,
  priority: _priority,
  style,
  ...props
}: Props) {
  const resolvedSrc = imageMap[src] ?? src;
  const classes = fill ? `absolute inset-0 h-full w-full ${className}` : className;

  return <img src={resolvedSrc} alt={alt} className={classes} style={style} {...props} />;
}
