"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  style?: CSSProperties;
  /** Text-only stagger — no container slide; children animate individually */
  text?: boolean;
};

function isInViewport(el: Element) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  once = true,
  style,
  text = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [init, setInit] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    setInit(true);

    if (isInViewport(el)) {
      setVisible(true);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -4% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const classes = [
    "reveal",
    text ? "reveal-text-only" : init ? "reveal-init" : "",
    init ? "reveal-text-init" : "",
    visible ? "reveal-visible" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={ref}
      className={classes}
      style={
        {
          ...style,
          transitionDelay: text ? undefined : `${delay}ms`,
          "--text-stagger-offset": `${delay}ms`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}

/** Section heading + subcopy with staggered text reveal */
export function RevealText({
  children,
  className = "",
  delay = 0,
}: Omit<RevealProps, "text">) {
  return (
    <Reveal text className={className} delay={delay}>
      {children}
    </Reveal>
  );
}
