"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type {
  College,
  CollegeFilterState,
  MessChargesParsed,
  ParsedMoneyField,
} from "@/lib/college-types";
import {
  getHostelRubFilterOptions,
  getTuitionRubFilterOptions,
} from "@/lib/college-filter-options";
import { computeListingFeeExtents } from "@/lib/college-fee-stats";
import { filterColleges } from "@/lib/filter-colleges";

type CollegeDirectoryProps = {
  readonly colleges: ReadonlyArray<College>;
};

const controlClassName =
  "min-h-12 w-full rounded-2xl border border-slate-200 bg-surface px-4 py-3 text-base text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/25 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 sm:min-h-11 sm:text-sm";

const labelClassName =
  "text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400";

const primaryButtonClassName =
  "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground shadow-md shadow-indigo-500/20 transition hover:brightness-110 active:scale-[0.98] dark:shadow-indigo-900/40";

const ghostButtonClassName =
  "inline-flex min-h-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-surface px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-surface-muted active:scale-[0.98] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800";

function createInitialCollegeFilterState(): CollegeFilterState {
  return {
    searchQuery: "",
    tuitionMinRub: null,
    tuitionMaxRub: null,
    hostelMinRub: null,
    hostelMaxRub: null,
  };
}

function numberFromSelectValue(rawValue: string): number | null {
  if (rawValue.length === 0) {
    return null;
  }
  const parsed = Number.parseFloat(rawValue);
  if (Number.isNaN(parsed)) {
    return null;
  }
  return parsed;
}

function formatParsedMoneyForList(field: ParsedMoneyField): string {
  if (field.kind === "not_available") {
    return "NA";
  }
  if (field.currency === "USD") {
    return `${field.amount.toLocaleString("en-US")} USD`;
  }
  return `${field.amount.toLocaleString("en-US")} ₽`;
}

function formatMessForList(mess: MessChargesParsed): string {
  if (mess.kind === "not_available") {
    return "NA";
  }
  return `${mess.amountUsd.toLocaleString("en-US")} USD`;
}

type RubSelectProps = {
  readonly id: string;
  readonly label: string;
  readonly optionsRub: ReadonlyArray<number>;
  readonly selectedRub: number | null;
  readonly anyLabel: string;
  readonly onSelectedRubChange: (value: number | null) => void;
};

function RubFilterSelect(props: RubSelectProps) {
  const {
    id,
    label,
    optionsRub,
    selectedRub,
    anyLabel,
    onSelectedRubChange,
  } = props;

  return (
    <div className="flex flex-col gap-2">
      <label className={labelClassName} htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        value={selectedRub === null ? "" : String(selectedRub)}
        onChange={(event) => {
          onSelectedRubChange(numberFromSelectValue(event.target.value));
        }}
        className={controlClassName}
      >
        <option value="">{anyLabel}</option>
        {optionsRub.map((amountRub) => (
          <option key={amountRub} value={String(amountRub)}>
            {amountRub.toLocaleString("en-US")} ₽
          </option>
        ))}
      </select>
    </div>
  );
}

export function CollegeDirectory(props: CollegeDirectoryProps) {
  const { colleges } = props;
  const [filters, setFilters] = useState<CollegeFilterState>(
    createInitialCollegeFilterState,
  );

  const feeExtents = useMemo(
    () => computeListingFeeExtents(colleges),
    [colleges],
  );

  const tuitionRubOptions = useMemo(
    () => getTuitionRubFilterOptions(colleges),
    [colleges],
  );

  const hostelRubOptions = useMemo(
    () => getHostelRubFilterOptions(colleges),
    [colleges],
  );

  const visibleColleges = useMemo(
    () => filterColleges(colleges, filters),
    [colleges, filters],
  );

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:gap-10 sm:px-6 sm:py-10 lg:gap-12 lg:px-8">
      <header className="space-y-4">
        <p className="inline-flex w-fit items-center rounded-full border border-indigo-200/80 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-950/50 dark:text-indigo-200">
          Compare programs
        </p>
        <div className="space-y-3">
          <h1 className="text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-slate-50">
            Find your university
          </h1>
          {/* <p className="max-w-2xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
            Search by name and narrow by tuition and hostel. Dropdowns list
            amounts in Rubles.
          </p> */}
        </div>
      </header>

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

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
            <RubFilterSelect
              id="tuition-min-rub"
              label="Tuition — minimum (₽ normalized)"
              optionsRub={tuitionRubOptions}
              selectedRub={filters.tuitionMinRub}
              anyLabel="Any — no lower limit"
              onSelectedRubChange={(value) => {
                setFilters((previous) => ({
                  ...previous,
                  tuitionMinRub: value,
                }));
              }}
            />
            <RubFilterSelect
              id="tuition-max-rub"
              label="Tuition — maximum (₽ normalized)"
              optionsRub={tuitionRubOptions}
              selectedRub={filters.tuitionMaxRub}
              anyLabel="Any — no upper limit"
              onSelectedRubChange={(value) => {
                setFilters((previous) => ({
                  ...previous,
                  tuitionMaxRub: value,
                }));
              }}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
            <RubFilterSelect
              id="hostel-min-rub"
              label="Hostel — minimum (₽ normalized)"
              optionsRub={hostelRubOptions}
              selectedRub={filters.hostelMinRub}
              anyLabel="Any — no lower limit"
              onSelectedRubChange={(value) => {
                setFilters((previous) => ({
                  ...previous,
                  hostelMinRub: value,
                }));
              }}
            />
            <RubFilterSelect
              id="hostel-max-rub"
              label="Hostel — maximum (₽ normalized)"
              optionsRub={hostelRubOptions}
              selectedRub={filters.hostelMaxRub}
              anyLabel="Any — no upper limit"
              onSelectedRubChange={(value) => {
                setFilters((previous) => ({
                  ...previous,
                  hostelMaxRub: value,
                }));
              }}
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-slate-100 pt-6 dark:border-slate-800/80 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Showing{" "}
            <span className="font-bold text-slate-900 dark:text-slate-100">
              {visibleColleges.length}
            </span>{" "}
            <span className="text-slate-500 dark:text-slate-500">/</span>{" "}
            {colleges.length} universities
          </p>
          <button
            type="button"
            onClick={() => {
              setFilters(createInitialCollegeFilterState());
            }}
            className={ghostButtonClassName}
          >
            Reset all filters
          </button>
        </div>
      </section>

      <section aria-label="University results" className="space-y-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Results
          </h2>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
          {visibleColleges.map((college) => (
            <li key={college.id} className="flex min-h-0">
              <article className="flex w-full flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-surface shadow-md shadow-slate-900/5 ring-1 ring-slate-900/5 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/10 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/30 dark:ring-white/10 dark:hover:shadow-indigo-500/5">
                <div className="h-1.5 w-full" />
                <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
                  <h3 className="text-balance text-lg font-bold leading-snug text-slate-900 dark:text-slate-50">
                    {college.universityName}
                  </h3>
                  <dl className="grid flex-1 gap-3 text-sm">
                    <div className="flex items-start justify-between gap-3 rounded-2xl bg-surface-muted/80 px-3 py-2.5 dark:bg-slate-800/60">
                      <dt className="font-medium text-slate-500 dark:text-slate-400">
                        Tuition
                      </dt>
                      <dd className="text-right font-semibold text-slate-900 dark:text-slate-100">
                        {formatParsedMoneyForList(college.tuition)}
                      </dd>
                    </div>
                    <div className="flex items-start justify-between gap-3 rounded-2xl bg-surface-muted/80 px-3 py-2.5 dark:bg-slate-800/60">
                      <dt className="font-medium text-slate-500 dark:text-slate-400">
                        Hostel
                      </dt>
                      <dd className="text-right font-semibold text-slate-900 dark:text-slate-100">
                        {formatParsedMoneyForList(college.hostel)}
                      </dd>
                    </div>
                    <div className="flex items-start justify-between gap-3 rounded-2xl bg-surface-muted/80 px-3 py-2.5 dark:bg-slate-800/60">
                      <dt className="font-medium text-slate-500 dark:text-slate-400">
                        Mess
                      </dt>
                      <dd className="text-right font-semibold text-slate-900 dark:text-slate-100">
                        {formatMessForList(college.messCharges)}
                      </dd>
                    </div>
                  </dl>
                  <Link
                    href={`/colleges/${college.slug}`}
                    className={primaryButtonClassName}
                  >
                    View full fee sheet
                    <span aria-hidden className="text-lg leading-none">
                      →
                    </span>
                  </Link>
                </div>
              </article>
            </li>
          ))}
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
                setFilters(createInitialCollegeFilterState());
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
