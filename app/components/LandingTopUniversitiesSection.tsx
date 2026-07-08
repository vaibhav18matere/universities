import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/app/components/ScrollReveal";
import { topUniversityCards } from "@/lib/landing-static";

export function LandingTopUniversitiesSection() {
  return (
    <section
      className="glass-section-navy py-10 text-white sm:py-14"
      aria-label="Featured medical universities"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up">
          <div className="grid gap-5 sm:gap-6 lg:grid-cols-3 lg:gap-10">
            <div className="space-y-4">
              <div
                className="h-1 w-12 rounded-full bg-accent"
                aria-hidden
              />
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-300 sm:text-xs sm:tracking-[0.25em]">
                Top universities to study
              </p>
              <h2 className="text-balance text-xl font-bold leading-tight sm:text-2xl md:text-3xl lg:text-4xl">
                Top Medical Universities in Russia for Indian Students
              </h2>
            </div>
            <p className="text-pretty text-sm leading-relaxed text-slate-200 sm:text-base lg:col-span-2 lg:max-w-xl lg:justify-self-end">
              Russian medical degrees are recognised globally, campuses offer
              modern clinical training, and overall costs are often more
              accessible than comparable private options in India—making Russia a
              practical choice for serious MBBS aspirants who want quality and
              value.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal stagger={0.12} className="mt-12">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {topUniversityCards.map((university) => (
              <Link
                key={university.id}
                data-scroll-reveal-item
                href="#directory"
                className="premium-card-hover group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-slate-800 shadow-lg ring-1 ring-white/10 transition duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30 hover:ring-accent/30"
              >
                <Image
                  src={university.imageSrc}
                  alt={university.imageAlt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                <div
                  className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/20 to-transparent transition duration-500 group-hover:from-slate-950/95"
                  aria-hidden
                />
                <p className="absolute bottom-3 left-3 right-3 text-sm font-bold leading-snug transition-transform duration-300 group-hover:translate-y-[-2px] sm:bottom-4 sm:left-4 sm:right-4 sm:text-base">
                  {university.name}
                </p>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
