import Link from "next/link";
import { ScrollReveal } from "@/app/components/ScrollReveal";
import { megaMenuCountries } from "@/lib/landing-static";
import { buildUniversitiesCountryPath } from "@/lib/mega-menu-country-routes";

export function LandingCountryStripSection() {
  return (
    <ScrollReveal stagger={0.08}>
      <section
        className="glass-panel border-b border-slate-200/80 py-8 sm:py-12 dark:border-slate-800/80"
        aria-label="Popular study destinations"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-visible px-4 pb-2 pt-1 scrollbar-none sm:mx-0 sm:snap-none sm:flex-wrap sm:justify-center sm:gap-8 sm:overflow-visible sm:px-0 sm:pb-0 sm:pt-0 lg:gap-16">
            {megaMenuCountries.map((country) => (
              <Link
                key={country.id}
                data-scroll-reveal-item
                href={buildUniversitiesCountryPath(country.id)}
                className="group flex w-[88px] shrink-0 snap-center flex-col items-center gap-2 text-center first:pl-0 last:pr-0 sm:w-[120px] sm:shrink sm:gap-3"
              >
                <span
                  className="flex h-16 w-[52px] items-center justify-center rounded-[40%] border-2 border-slate-200 bg-slate-50 text-2xl shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:border-accent group-hover:shadow-lg group-hover:shadow-accent/10 dark:border-slate-600 dark:bg-slate-900 sm:h-[88px] sm:w-[68px] sm:text-3xl"
                  aria-hidden
                >
                  {country.flagEmoji}
                </span>
                <span className="max-w-[6.5rem] text-[11px] font-bold leading-tight text-foreground transition-colors group-hover:text-accent sm:max-w-none sm:text-xs">
                  {country.label}
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-8 flex justify-center sm:mt-10" />
        </div>
      </section>
    </ScrollReveal>
  );
}
