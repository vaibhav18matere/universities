import Link from "next/link";
import { buildUniversitiesHubPath } from "@/lib/mega-menu-country-routes";

export default function UniversitiesCountryNotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-lg flex-col items-center justify-center gap-6 px-4 py-16 text-center sm:px-6">
      <div className="rounded-full border border-slate-200 bg-surface-muted px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
        404
      </div>
      <div className="space-y-3">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-slate-50">
          Country not found
        </h1>
        <p className="text-pretty text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
          This country is not in the study destinations list. Use the hub below
          to pick a supported destination.
        </p>
      </div>
      <Link
        href={buildUniversitiesHubPath()}
        className="inline-flex min-h-12 w-full max-w-xs items-center justify-center rounded-2xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-indigo-500/25 transition hover:brightness-110 active:scale-[0.98] dark:shadow-indigo-900/40"
      >
        Browse by country
      </Link>
    </div>
  );
}
