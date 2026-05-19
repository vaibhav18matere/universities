import Link from "next/link";
import { megaMenuCountries } from "@/lib/landing-static";
import {
  buildUniversitiesCountryPath,
  buildUniversitiesHubPath,
} from "@/lib/mega-menu-country-routes";

export function LandingCountryStripSection() {
  return (
    <section
      className="border-b border-slate-200 bg-surface py-8 dark:border-slate-800 dark:bg-slate-950 sm:py-12"
      aria-label="Popular study destinations"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-visible px-4 pb-2 pt-1 scrollbar-none sm:mx-0 sm:snap-none sm:flex-wrap sm:justify-center sm:gap-8 sm:overflow-visible sm:px-0 sm:pb-0 sm:pt-0 lg:gap-16">
          {megaMenuCountries.map((country) => (
            <Link
              key={country.id}
              href={buildUniversitiesCountryPath(country.id)}
              className="group flex w-[88px] shrink-0 snap-center flex-col items-center gap-2 text-center first:pl-0 last:pr-0 sm:w-[120px] sm:shrink sm:gap-3"
            >
              <span
                className="flex h-16 w-[52px] items-center justify-center rounded-[40%] border-2 border-slate-200 bg-slate-50 text-2xl shadow-sm transition group-hover:border-accent group-hover:shadow-md dark:border-slate-600 dark:bg-slate-900 sm:h-[88px] sm:w-[68px] sm:text-3xl"
                aria-hidden
              >
                {country.flagEmoji}
              </span>
              <span className="max-w-[6.5rem] text-[11px] font-semibold leading-tight text-slate-800 sm:max-w-none sm:text-xs dark:text-slate-100">
                {country.label}
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex justify-center sm:mt-10">
          <Link
            href={buildUniversitiesHubPath()}
            className="text-sm font-semibold text-accent underline-offset-4 transition hover:underline"
          >
            View All →
          </Link>
        </div>
      </div>
    </section>
  );
}
