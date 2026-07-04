"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

const heroImageSources: ReadonlyArray<string> = [
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80",
];

// function IconArrowRight() {
//   return (
//     <svg
//       viewBox="0 0 20 20"
//       className="h-5 w-5"
//       fill="currentColor"
//       aria-hidden
//     >
//       <path d="M12.59 4.59 18 10l-5.41 5.41-1.18-1.18L14.76 11H4V9h10.76l-3.35-3.23 1.18-1.18Z" />
//     </svg>
//   );
// }

export function LandingHeroSection() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [interest, setInterest] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneLocal, setPhoneLocal] = useState("");

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

  return (
    <section
      className="relative isolate flex min-h-[min(100dvh,52rem)] flex-col overflow-hidden bg-slate-900 sm:min-h-0"
      aria-label="Welcome"
    >
      <div className="absolute inset-0">
        {heroImageSources.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            priority={index === 0}
            className={`object-cover transition-opacity duration-700 ${
              index === slideIndex ? "opacity-100" : "opacity-0"
            }`}
            sizes="100vw"
          />
        ))}
        <div
          className="absolute inset-0 bg-linear-to-b from-slate-950/90 via-slate-950/60 to-slate-950/35 sm:bg-linear-to-r sm:from-slate-950/85 sm:via-slate-950/55 sm:to-slate-950/25"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-12 sm:gap-10 sm:px-6 sm:py-14 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-8 lg:py-20">
        <div className="flex max-w-xl flex-1 flex-col justify-center gap-6 sm:gap-8">
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-balance text-[1.65rem] font-bold leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
              Trusted guidance for MBBS abroad - from admission to graduation
            </h1>
            <p className="text-pretty text-sm leading-relaxed text-slate-200 sm:text-base lg:text-lg">
              Plan your medical university journey with confidence. Explore
              accredited universities, transparent fee estimates.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Link
              href="/#directory"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg transition hover:brightness-110 active:scale-[0.98] sm:w-auto"
            >
              Browse universities{" "}
              <span aria-hidden className="text-lg leading-none">
                →
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-2 py-1">
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
                  className={`block h-2.5 w-2.5 rounded-full ${
                    index === slideIndex ? "bg-accent" : "bg-current"
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
