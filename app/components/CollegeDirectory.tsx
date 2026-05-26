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
import { buildUniversityComparePath } from "@/lib/university-compare-url";
import { resolveCollegeCountryLabel } from "@/lib/college-country-label";

type CollegeDirectoryProps = {
  readonly colleges: ReadonlyArray<College>;
  readonly showDirectoryHeader: boolean;
  /** When set, results stay scoped to this country label and the country control is hidden. */
  readonly fixedCountryLabel: string | null;
};

const MAX_COMPARE_SELECTION = 3;

function withCompareSlugToggled(
  currentSlugs: ReadonlyArray<string>,
  slug: string,
): ReadonlyArray<string> {
  const existingIndex = currentSlugs.indexOf(slug);
  if (existingIndex !== -1) {
    const nextSlugs: Array<string> = [];
    for (let index = 0; index < currentSlugs.length; index += 1) {
      if (index !== existingIndex) {
        nextSlugs.push(currentSlugs[index]);
      }
    }
    return nextSlugs;
  }
  if (currentSlugs.length >= MAX_COMPARE_SELECTION) {
    return currentSlugs;
  }
  return [...currentSlugs, slug];
}

const controlClassName =
  "min-h-12 w-full rounded-2xl border border-slate-200 bg-surface px-4 py-3 text-base text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/25 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 sm:min-h-11 sm:text-sm";

const labelClassName =
  "text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400";

const primaryButtonClassName =
  "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground shadow-md shadow-accent/25 transition hover:brightness-110 active:scale-[0.98] dark:shadow-black/50";

const ghostButtonClassName =
  "inline-flex min-h-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-surface px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-surface-muted active:scale-[0.98] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800";

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
  const [compareSlugs, setCompareSlugs] = useState<ReadonlyArray<string>>(
    () => [],
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

  const collegeBySlug = useMemo(() => {
    const map = new Map<string, College>();
    for (let index = 0; index < colleges.length; index += 1) {
      const college = colleges[index];
      map.set(college.slug, college);
    }
    return map;
  }, [colleges]);

  const compareHref = useMemo(
    () => buildUniversityComparePath(compareSlugs),
    [compareSlugs],
  );

  return (
    <div
      className={`mx-auto flex min-w-0 w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:gap-10 sm:px-6 sm:py-10 lg:gap-12 lg:px-8 ${compareSlugs.length > 0 ? "pb-[max(7rem,env(safe-area-inset-bottom,0px)+5.5rem)] sm:pb-28" : ""}`}
    >
      {showDirectoryHeader ? (
        <header className="space-y-4">
          <div className="space-y-3">
            <h1 className="text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl lg:text-5xl dark:text-slate-50">
              Find your university
            </h1>
          </div>
        </header>
      ) : null}

      <section
        aria-label="Search and filters"
        className="rounded-3xl border border-slate-200/80 bg-surface/80 p-5 shadow-lg shadow-slate-900/5 ring-1 ring-white/60 backdrop-blur-sm dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-black/20 dark:ring-white/5 sm:p-6 lg:p-8"
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
              label="Tuition (INR, approx.)"
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
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Showing{" "}
              <span className="font-bold text-slate-900 dark:text-slate-100">
                {visibleColleges.length}
              </span>{" "}
              <span className="text-slate-500 dark:text-slate-500">/</span>{" "}
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
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Results
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Add up to {MAX_COMPARE_SELECTION} universities to compare fees side
            by side.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
          {visibleColleges.map((college) => {
            const isCompareSelected = compareSlugs.includes(college.slug);
            const isCompareDisabled =
              isCompareSelected === false &&
              compareSlugs.length >= MAX_COMPARE_SELECTION;
            return (
            <li key={college.id} className="flex min-h-0">
              <article className="group flex w-full flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-surface shadow-md shadow-slate-900/5 ring-1 ring-slate-900/5 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/10 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/30 dark:ring-white/10 dark:hover:shadow-accent/10">
                <CollegeCoverImage
                  src={college.imageSrc}
                  alt={`Campus photo — ${college.universityName}`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  priority={false}
                  aspectClassName="aspect-[5/3] sm:aspect-[16/10]"
                />
                <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
                  <h3 className="text-balance text-lg font-bold leading-snug text-slate-900 dark:text-slate-50">
                    {college.universityName}
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-wide text-accent dark:text-rose-300">
                    {resolveCollegeCountryLabel(college.country)}
                  </p>
                  <dl className="grid flex-1 gap-3 text-sm">
                    <div className="flex items-start justify-between gap-3 rounded-2xl bg-surface-muted/80 px-3 py-2.5 dark:bg-slate-800/60">
                      <dt className="font-medium text-slate-500 dark:text-slate-400">
                        Tuition
                      </dt>
                      <dd className="text-right font-semibold text-slate-900 dark:text-slate-100">
                        {formatParsedMoneyFieldInr(college.tuition)}
                      </dd>
                    </div>
                    <div className="flex items-start justify-between gap-3 rounded-2xl bg-surface-muted/80 px-3 py-2.5 dark:bg-slate-800/60">
                      <dt className="font-medium text-slate-500 dark:text-slate-400">
                        Hostel
                      </dt>
                      <dd className="text-right font-semibold text-slate-900 dark:text-slate-100">
                        {formatParsedMoneyFieldInr(college.hostel)}
                      </dd>
                    </div>
                    <div className="flex items-start justify-between gap-3 rounded-2xl bg-surface-muted/80 px-3 py-2.5 dark:bg-slate-800/60">
                      <dt className="font-medium text-slate-500 dark:text-slate-400">
                        Mess
                      </dt>
                      <dd className="text-right font-semibold text-slate-900 dark:text-slate-100">
                        {formatMessChargesInr(
                          college.messCharges,
                          college.messChargesRaw,
                        )}
                      </dd>
                    </div>
                  </dl>
                  <div className="flex flex-col gap-3">
                    <button
                      type="button"
                      disabled={isCompareDisabled}
                      onClick={() => {
                        setCompareSlugs((previous) =>
                          withCompareSlugToggled(previous, college.slug),
                        );
                      }}
                      className={
                        isCompareSelected
                          ? `${ghostButtonClassName} border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-800 dark:bg-rose-950/50 dark:text-rose-100 cursor-pointer`
                          : `${ghostButtonClassName} ${isCompareDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`
                      }
                      aria-pressed={isCompareSelected}
                    >
                      {isCompareSelected
                        ? "In compare — tap to remove"
                        : "Add to compare"}
                    </button>
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
            );
          })}
        </ul>

        {visibleColleges.length === 0 ? (
          <div
            className="rounded-3xl border border-dashed border-slate-300 bg-surface-muted/50 px-6 py-14 text-center dark:border-slate-700 dark:bg-slate-900/40"
            role="status"
          >
            <p className="text-base font-semibold text-slate-800 dark:text-slate-200">
              No matches
            </p>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
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

      {compareSlugs.length > 0 ? (
        <div
          className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200/90 bg-background/95 px-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))] pt-4 shadow-[0_-8px_30px_rgba(15,23,42,0.12)] backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/95 dark:shadow-[0_-8px_30px_rgba(0,0,0,0.45)] sm:px-6"
          role="region"
          aria-label="University compare selection"
        >
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0 flex-1 space-y-2">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Compare ({compareSlugs.length}/{MAX_COMPARE_SELECTION})
              </p>
              <ul className="flex flex-wrap gap-2">
                {compareSlugs.map((slug) => {
                  const selectedCollege = collegeBySlug.get(slug);
                  const label =
                    selectedCollege !== undefined
                      ? selectedCollege.universityName
                      : slug;
                  return (
                    <li key={slug}>
                      <button
                        type="button"
                        onClick={() => {
                          setCompareSlugs((previous) =>
                            withCompareSlugToggled(previous, slug),
                          );
                        }}
                        className="inline-flex max-w-full items-center gap-2 rounded-full border border-slate-200 bg-surface px-3 py-1.5 text-left text-xs font-medium text-slate-800 shadow-sm transition hover:bg-surface-muted dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 sm:text-sm"
                      >
                        <span className="truncate">{label}</span>
                        <span
                          className="shrink-0 text-slate-400 dark:text-slate-500"
                          aria-hidden
                        >
                          ×
                        </span>
                        <span className="sr-only">Remove from compare</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-end lg:w-auto lg:shrink-0">
              <button
                type="button"
                onClick={() => {
                  setCompareSlugs([]);
                }}
                className={`${ghostButtonClassName} w-full sm:w-auto`}
              >
                Clear
              </button>
              <Link
                href={compareHref}
                className={`${primaryButtonClassName} w-full sm:w-auto`}
              >
                Open compare
                <span aria-hidden className="text-lg leading-none">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
