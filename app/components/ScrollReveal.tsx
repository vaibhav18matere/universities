"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ScrollRevealAnimation = "fade-up" | "fade-in" | "scale-in";

type ScrollRevealProps = {
  readonly children: ReactNode;
  readonly className?: string;
  readonly animation?: ScrollRevealAnimation;
  readonly delay?: number;
  readonly duration?: number;
  readonly stagger?: number;
};

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getAnimationFrom(
  animation: ScrollRevealAnimation,
): gsap.TweenVars {
  if (animation === "fade-in") {
    return { opacity: 0, filter: "blur(6px)" };
  }
  if (animation === "scale-in") {
    return { opacity: 0, scale: 0.96, filter: "blur(4px)" };
  }
  return { opacity: 0, y: 40, filter: "blur(8px)" };
}

function getAnimationTo(animation: ScrollRevealAnimation): gsap.TweenVars {
  if (animation === "scale-in") {
    return { opacity: 1, scale: 1, filter: "blur(0px)" };
  }
  if (animation === "fade-in") {
    return { opacity: 1, filter: "blur(0px)" };
  }
  return { opacity: 1, y: 0, filter: "blur(0px)" };
}

export function ScrollReveal(props: ScrollRevealProps) {
  const {
    children,
    className,
    animation = "fade-up",
    delay = 0,
    duration = 0.9,
    stagger = 0,
  } = props;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container === null) {
      return undefined;
    }
    if (prefersReducedMotion()) {
      return undefined;
    }

    const targets =
      stagger > 0
        ? container.querySelectorAll("[data-scroll-reveal-item]")
        : container;

    const context = gsap.context(() => {
      gsap.fromTo(
        targets,
        getAnimationFrom(animation),
        {
          ...getAnimationTo(animation),
          duration,
          delay,
          stagger: stagger > 0 ? stagger : undefined,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        },
      );
    }, container);

    return () => {
      context.revert();
    };
  }, [animation, delay, duration, stagger]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
