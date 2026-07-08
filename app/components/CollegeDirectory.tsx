"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CollegeCoverImage } from "@/app/components/CollegeCoverImage";
import type { College, CollegeFilterState } from "@/lib/college-types";
import {
  getTuitionInrFilterRanges,
  type TuitionInrFilterRange,
} from "@/lib/college-filter-options";
import { getCountryFilterLabels } from "@/lib/college-country-filter-options";
import { filterColleges } from "@/lib/filter-colleges";
import {
  formatMessChargesInr,
  formatParsedMoneyFieldInr,
  formatTuitionInrFilterRangeLabel,
} from "@/lib/inr-display";
import { resolveCollegeCountryLabel } from "@/lib/college-country-label";

type CollegeDirectoryProps = {
  readonly colleges: ReadonlyArray<College>;
  readonly showDirectoryHeader: boolean;
  /** When set, results stay scoped to this country label and the country control is hidden. */
  readonly fixedCountryLabel: string | null;
};

const labelClassName =
  "text-xs font-bold uppercase tracking-wide text-text-muted";

const controlClassName =
  "min-h-12 w-full rounded-2xl border border-slate-300/90 glass-card px-4 py-3 text-base font-medium text-foreground shadow-sm transition placeholder:text-text-subtle focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/30 dark:border-slate-600 sm:min-h-11 sm:text-sm";

const primaryButtonClassName =
  "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground shadow-md shadow-accent/25 transition hover:brightness-110 active:scale-[0.98] dark:shadow-black/50";

const ghostButtonClassName =
  "inline-flex min-h-12 shrink-0 items-center justify-center rounded-2xl border border-slate-300/90 glass-card px-4 py-3 text-sm font-semibold text-foreground transition hover:brightness-105 active:scale-[0.98] dark:border-slate-600";

function createCollegeFilterState(
  initialSelectedCountry: string | null,
): CollegeFilterState {
  return {
    searchQuery: "",
    selectedCountry: initialSelectedCountry,
    tuitionMinRub: null,
    tuitionMaxRub: null,
  };
}

function findSelectedTuitionRange(
  ranges: ReadonlyArray<TuitionInrFilterRange>,
  selectedMinRub: number | null,
  selectedMaxRub: number | null,
): TuitionInrFilterRange | null {
  if (selectedMinRub === null || selectedMaxRub === null) {
    return null;
  }
  for (let index = 0; index < ranges.length; index += 1) {
    const range = ranges[index];
    if (range.minRub === selectedMinRub && range.maxRub === selectedMaxRub) {
      return range;
    }
  }
  return null;
}

function findTuitionRangeByMinInr(
  ranges: ReadonlyArray<TuitionInrFilterRange>,
  minInr: number,
): TuitionInrFilterRange | null {
  for (let index = 0; index < ranges.length; index += 1) {
    const range = ranges[index];
    if (range.minInr === minInr) {
      return range;
    }
  }
  return null;
}

type TuitionRangeSelectProps = {
  readonly id: string;
  readonly label: string;
  readonly ranges: ReadonlyArray<TuitionInrFilterRange>;
  readonly selectedMinRub: number | null;
  readonly selectedMaxRub: number | null;
  readonly anyLabel: string;
  readonly onSelectedRangeChange: (range: TuitionInrFilterRange | null) => void;
};

function TuitionRangeSelect(props: TuitionRangeSelectProps) {
  const {
    id,
    label,
    ranges,
    selectedMinRub,
    selectedMaxRub,
    anyLabel,
    onSelectedRangeChange,
  } = props;

  const selectedRange = findSelectedTuitionRange(
    ranges,
    selectedMinRub,
    selectedMaxRub,
  );

  return (
    <div className="flex flex-col gap-2">
      <label className={labelClassName} htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        value={selectedRange === null ? "" : String(selectedRange.minInr)}
        onChange={(event) => {
          const rawValue = event.target.value;
          if (rawValue.length === 0) {
            onSelectedRangeChange(null);
            return;
          }
          const minInr = Number.parseInt(rawValue, 10);
          if (Number.isNaN(minInr)) {
            onSelectedRangeChange(null);
            return;
          }
          onSelectedRangeChange(findTuitionRangeByMinInr(ranges, minInr));
        }}
        className={controlClassName}
      >
        <option value="">{anyLabel}</option>
        {ranges.map((range) => (
          <option key={range.minInr} value={String(range.minInr)}>
            {formatTuitionInrFilterRangeLabel(range.minInr, range.maxInr)}
          </option>
        ))}
      </select>
    </div>
  );
}

export function CollegeDirectory(props: CollegeDirectoryProps) {
  const { colleges, showDirectoryHeader, fixedCountryLabel } = props;
  const [filters, setFilters] = useState<CollegeFilterState>(() =>
    createCollegeFilterState(fixedCountryLabel),
  );

  const tuitionInrRanges = useMemo(
    () => getTuitionInrFilterRanges(colleges),
    [colleges],
  );

  const countryOptions = useMemo(
    () => getCountryFilterLabels(colleges),
    [colleges],
  );

  const visibleColleges = useMemo(
    () => filterColleges(colleges, filters),
    [colleges, filters],
  );

  return (
    <div className="mx-auto flex min-w-0 w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:gap-10 sm:px-6 sm:py-10 lg:gap-12 lg:px-8">
      {showDirectoryHeader ? (
        <header className="space-y-4">
          <div className="space-y-3">
            <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
              Find your university
            </h1>
          </div>
        </header>
      ) : null}

      <section
        aria-label="Search and filters"
        className="rounded-3xl border border-slate-200/80 glass-panel p-5 shadow-lg shadow-slate-900/5 ring-1 ring-white/60 dark:border-slate-800/80 dark:shadow-black/20 dark:ring-white/5 sm:p-6 lg:p-8"
      >
        {/* <div className="mb-6 flex flex-col gap-2 border-b border-slate-100 pb-6 dark:border-slate-800/80 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Refine results
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              All fields are optional — stack filters to narrow the list.
            </p>
          </div>
        </div> */}

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-2 lg:col-span-2">
            <label className={labelClassName} htmlFor="university-search">
              University name
            </label>
            <input
              id="university-search"
              type="search"
              enterKeyHint="search"
              autoComplete="off"
              value={filters.searchQuery}
              onChange={(event) => {
                setFilters((previous) => ({
                  ...previous,
                  searchQuery: event.target.value,
                }));
              }}
              placeholder="Type a university name…"
              className={controlClassName}
            />
          </div>

          {fixedCountryLabel === null ? (
            <div className="flex flex-col gap-2 lg:col-span-2">
              <label className={labelClassName} htmlFor="country-filter">
                Country
              </label>
              <select
                id="country-filter"
                value={filters.selectedCountry ?? ""}
                onChange={(event) => {
                  const raw = event.target.value;
                  setFilters((previous) => ({
                    ...previous,
                    selectedCountry: raw.length === 0 ? null : raw,
                  }));
                }}
                className={controlClassName}
              >
                <option value="">All countries</option>
                {countryOptions.map((countryLabel) => (
                  <option key={countryLabel} value={countryLabel}>
                    {countryLabel}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="flex flex-col gap-2 lg:col-span-2">
              <p className={labelClassName}>Country</p>
              <p className="min-h-12 rounded-2xl border border-slate-200 bg-surface-muted/80 px-4 py-3 text-base font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-100 sm:min-h-11 sm:text-sm">
                {fixedCountryLabel}
              </p>
            </div>
          )}

          <div className="flex flex-col gap-2 lg:col-span-2">
            <TuitionRangeSelect
              id="tuition-range"
              label="Tuition Fees (INR, approx.)"
              ranges={tuitionInrRanges}
              selectedMinRub={filters.tuitionMinRub}
              selectedMaxRub={filters.tuitionMaxRub}
              anyLabel="Any tuition"
              onSelectedRangeChange={(range) => {
                setFilters((previous) => ({
                  ...previous,
                  tuitionMinRub: range === null ? null : range.minRub,
                  tuitionMaxRub: range === null ? null : range.maxRub,
                }));
              }}
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-slate-100 pt-6 dark:border-slate-800/80 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-text-muted">
              Showing{" "}
              <span className="font-bold text-foreground">
                {visibleColleges.length}
              </span>{" "}
              <span className="text-text-subtle">/</span>{" "}
              {colleges.length} universities
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setFilters(createCollegeFilterState(fixedCountryLabel));
            }}
            className={ghostButtonClassName}
          >
            Reset all filters
          </button>
        </div>
      </section>

      <section aria-label="University results" className="space-y-5">
        <h2 className="text-lg font-bold text-foreground">Results</h2>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
          {visibleColleges.map((college) => (
            <li key={college.id} className="flex min-h-0">
              <article className="glass-card group flex w-full flex-col overflow-hidden rounded-3xl border border-slate-200/90 shadow-md shadow-slate-900/5 ring-1 ring-slate-900/5 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/10 dark:border-slate-800 dark:shadow-black/30 dark:ring-white/10 dark:hover:shadow-accent/10">
                <CollegeCoverImage
                  src={college.imageSrc}
                  alt={`Campus photo — ${college.universityName}`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  priority={false}
                  aspectClassName="aspect-[5/3] sm:aspect-[16/10]"
                />
                <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
                  <h3 className="text-balance text-lg font-bold leading-snug text-foreground">
                    {college.universityName}
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-wide text-accent dark:text-rose-300">
                    {resolveCollegeCountryLabel(college.country)}
                  </p>
                  <dl className="grid flex-1 gap-3 text-sm">
                    <div className="flex items-start justify-between gap-3 rounded-2xl bg-surface-muted/90 px-3 py-2.5 dark:bg-slate-800/75">
                      <dt className="font-semibold text-text-muted">
                        Tuition
                      </dt>
                      <dd className="text-right font-bold text-foreground">
                        {formatParsedMoneyFieldInr(college.tuition)}
                      </dd>
                    </div>
                    <div className="flex items-start justify-between gap-3 rounded-2xl bg-surface-muted/90 px-3 py-2.5 dark:bg-slate-800/75">
                      <dt className="font-semibold text-text-muted">
                        Hostel
                      </dt>
                      <dd className="text-right font-bold text-foreground">
                        {formatParsedMoneyFieldInr(college.hostel)}
                      </dd>
                    </div>
                    <div className="flex items-start justify-between gap-3 rounded-2xl bg-surface-muted/90 px-3 py-2.5 dark:bg-slate-800/75">
                      <dt className="font-semibold text-text-muted">
                        Mess
                      </dt>
                      <dd className="text-right font-bold text-foreground">
                        {formatMessChargesInr(
                          college.messCharges,
                          college.messChargesRaw,
                        )}
                      </dd>
                    </div>
                  </dl>
                  <div className="flex flex-col gap-3">
                    <Link
                      href={`/colleges/${college.slug}`}
                      className={primaryButtonClassName}
                    >
                      View details
                      <span aria-hidden className="text-lg leading-none">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {visibleColleges.length === 0 ? (
          <div
            className="rounded-3xl border border-dashed border-slate-300/80 glass-panel px-6 py-14 text-center dark:border-slate-700"
            role="status"
          >
            <p className="text-base font-bold text-foreground">
              No matches
            </p>
            <p className="mx-auto mt-2 max-w-sm text-sm font-medium leading-relaxed text-text-muted">
              Try a shorter search or reset filters to see every university
              again.
            </p>
            <button
              type="button"
              onClick={() => {
                setFilters(createCollegeFilterState(fixedCountryLabel));
              }}
              className={`${ghostButtonClassName} mx-auto mt-6 w-full max-w-xs border-slate-300`}
            >
              Clear filters
            </button>
          </div>
        ) : null}
      </section>
    </div>
  );
}
