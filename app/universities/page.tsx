import type { Metadata } from "next";
import Link from "next/link";
import { megaMenuCountries } from "@/lib/landing-static";
import { buildUniversitiesCountryPath } from "@/lib/mega-menu-country-routes";

export const metadata: Metadata = {
  title: "Universities by country",
  description:
    "Choose a country to browse universities, compare fees in INR, and open detail pages.",
};

export default function UniversitiesHubPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-10 sm:gap-12 sm:px-6 sm:py-12 lg:px-8">
      <header className="space-y-3 px-0 text-center sm:px-2">
        <h1 className="text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl dark:text-slate-50">
          Universities by country
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-500">
          Want the full list across all countries?{" "}
          <Link
            href="/#directory"
            className="font-semibold text-accent underline-offset-4 hover:underline"
          >
            Open the directory on the home page
          </Link>
          .
        </p>
      </header>

      <section aria-label="Countries">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-5">
          {megaMenuCountries.map((country) => (
            <li key={country.id}>
              <Link
                href={buildUniversitiesCountryPath(country.id)}
                className="flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-surface p-5 text-center shadow-sm transition hover:border-accent hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:hover:border-accent"
              >
                <span
                  className="flex h-16 w-16 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-3xl dark:border-slate-600 dark:bg-slate-800"
                  aria-hidden
                >
                  {country.flagEmoji}
                </span>
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {country.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
