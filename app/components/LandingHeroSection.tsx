"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const heroImageSources: ReadonlyArray<string> = [
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80",
];

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function LandingHeroSection() {
  const [slideIndex, setSlideIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      return undefined;
    }
    const timerId = window.setInterval(() => {
      setSlideIndex((previous) => (previous + 1) % heroImageSources.length);
    }, 7000);
    return () => {
      window.clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const background = backgroundRef.current;
    if (section === null || content === null || background === null) {
      return undefined;
    }
    if (prefersReducedMotion()) {
      return undefined;
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline
        .from(content.querySelector("[data-hero-title]"), {
          opacity: 0,
          y: 40,
          duration: 1,
        })
        .from(
          content.querySelector("[data-hero-subtitle]"),
          { opacity: 0, y: 28, duration: 0.8 },
          "-=0.55",
        )
        .from(
          content.querySelector("[data-hero-cta]"),
          { opacity: 0, y: 20, duration: 0.7 },
          "-=0.45",
        )
        .from(
          content.querySelector("[data-hero-dots]"),
          { opacity: 0, duration: 0.5 },
          "-=0.3",
        );

      gsap.to(background, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[min(100dvh,52rem)] flex-col overflow-hidden sm:min-h-0"
      aria-label="Welcome"
    >
      <div ref={backgroundRef} className="absolute inset-0">
        {heroImageSources.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            priority={index === 0}
            className={`object-cover transition-opacity duration-700 ${
              index === slideIndex ? "opacity-90" : "opacity-0"
            }`}
            sizes="100vw"
          />
        ))}
        <div
          className="absolute inset-0 bg-linear-to-b from-slate-950/75 via-slate-950/45 to-slate-950/15 sm:bg-linear-to-r sm:from-slate-950/70 sm:via-slate-950/40 sm:to-transparent"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(193,39,45,0.15)_0%,transparent_55%)]"
          aria-hidden
        />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-12 sm:gap-10 sm:px-6 sm:py-14 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-8 lg:py-20"
      >
        <div className="flex max-w-xl flex-1 flex-col justify-center gap-6 sm:gap-8">
          <div className="space-y-3 sm:space-y-4">
            <h1
              data-hero-title
              className="text-balance text-[1.65rem] font-bold leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl"
            >
              Trusted guidance for MBBS abroad - from admission to graduation
            </h1>
            <p
              data-hero-subtitle
              className="text-pretty text-sm leading-relaxed text-slate-200 sm:text-base lg:text-lg"
            >
              Plan your medical university journey with confidence. Explore
              accredited universities, transparent fee estimates.
            </p>
          </div>
          <div
            data-hero-cta
            className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
          >
            <Link
              href="/#directory"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition hover:brightness-110 hover:shadow-xl hover:shadow-accent/30 active:scale-[0.98] sm:w-auto"
            >
              Browse universities{" "}
              <span aria-hidden className="text-lg leading-none">
                →
              </span>
            </Link>
          </div>
          <div
            data-hero-dots
            className="flex items-center gap-2 py-1"
          >
            {heroImageSources.map((src, index) => (
              <button
                key={src}
                type="button"
                className={`flex min-h-11 min-w-11 items-center justify-center rounded-full transition ${
                  index === slideIndex
                    ? "text-accent"
                    : "text-white/50 hover:text-white/80"
                }`}
                aria-label={`Show hero slide ${index + 1}`}
                aria-current={index === slideIndex ? true : undefined}
                onClick={() => {
                  setSlideIndex(index);
                }}
              >
                <span
                  className={`block h-2.5 w-2.5 rounded-full transition-transform duration-300 ${
                    index === slideIndex ? "scale-125 bg-accent" : "bg-current"
                  }`}
                  aria-hidden
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
