"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { College } from "@/lib/college-types";
import {
  formatMessChargesInr,
  formatParsedMoneyFieldInr,
  formatRubAmountInInr,
  formatUsdAmountInInr,
} from "@/lib/inr-display";
import { resolveCollegeCountryLabel } from "@/lib/college-country-label";

export type UniversityCompareColumn = {
  readonly slug: string;
  readonly college: College | undefined;
};

type UniversityCompareViewProps = {
  readonly columns: ReadonlyArray<UniversityCompareColumn>;
};

type CompareMetricRow = {
  readonly label: string;
  readonly values: ReadonlyArray<string>;
};

type CompareRowCell = {
  readonly columnSlug: string;
  readonly text: string;
};

type CompareRowProps = {
  readonly label: string;
  readonly cells: ReadonlyArray<CompareRowCell>;
};

function CompareRow(props: CompareRowProps) {
  const { label, cells } = props;
  return (
    <tr className="border-b border-slate-100 dark:border-slate-800/90">
      <th
        scope="row"
        className="sticky left-0 z-10 w-[min(42vw,11rem)] min-w-0 max-w-[11rem] bg-surface px-2 py-2.5 text-left text-[0.65rem] font-bold uppercase leading-snug tracking-wide text-slate-500 shadow-[1px_0_0_0_rgb(226_232_240)] sm:w-auto sm:min-w-[10.5rem] sm:max-w-none sm:px-4 sm:py-4 sm:text-xs sm:leading-normal dark:bg-slate-900 dark:text-slate-400 dark:shadow-[1px_0_0_0_rgb(30_41_59)] md:text-sm md:normal-case md:tracking-normal md:font-semibold md:text-slate-700 dark:md:text-slate-300"
      >
        {label}
      </th>
      {cells.map((cell) => (
        <td
          key={cell.columnSlug}
          className="min-w-0 px-2 py-2.5 text-xs text-slate-900 sm:min-w-[9.5rem] sm:px-4 sm:py-4 sm:text-sm md:min-w-[11rem] lg:min-w-[12rem] lg:text-base dark:text-slate-100"
        >
          <span className="block text-pretty break-words leading-relaxed">
            {cell.text}
          </span>
        </td>
      ))}
    </tr>
  );
}

function buildCountryCompareCell(column: UniversityCompareColumn): string {
  if (column.college === undefined) {
    return "—";
  }
  return resolveCollegeCountryLabel(column.college.country);
}

function buildWebometricsWorldRankCompareCell(
  column: UniversityCompareColumn,
): string {
  if (column.college === undefined) {
    return "—";
  }
  const ranking = column.college.webometricsRanking;
  if (ranking === undefined) {
    return "—";
  }
  return String(ranking.worldRank);
}

function buildTuitionCell(column: UniversityCompareColumn): string {
  if (column.college === undefined) {
    return "—";
  }
  return formatParsedMoneyFieldInr(column.college.tuition);
}

function buildHostelCell(column: UniversityCompareColumn): string {
  if (column.college === undefined) {
    return "—";
  }
  return formatParsedMoneyFieldInr(column.college.hostel);
}

function buildMedicalCell(column: UniversityCompareColumn): string {
  if (column.college === undefined) {
    return "—";
  }
  return formatRubAmountInInr(column.college.medicalBundleRub);
}

function buildOtcCell(column: UniversityCompareColumn): string {
  if (column.college === undefined) {
    return "—";
  }
  return formatUsdAmountInInr(column.college.otcChargesUsd);
}

function buildMessCell(column: UniversityCompareColumn): string {
  if (column.college === undefined) {
    return "—";
  }
  return formatMessChargesInr(
    column.college.messCharges,
    column.college.messChargesRaw,
  );
}

function buildServiceCell(column: UniversityCompareColumn): string {
  if (column.college === undefined) {
    return "—";
  }
  return formatRubAmountInInr(column.college.serviceChargesRub);
}

function buildCompareMetricRows(
  columns: ReadonlyArray<UniversityCompareColumn>,
): ReadonlyArray<CompareMetricRow> {
  return [
    {
      label: "Country",
      values: columns.map((column) => buildCountryCompareCell(column)),
    },
    {
      label: "Webometrics world rank",
      values: columns.map((column) =>
        buildWebometricsWorldRankCompareCell(column),
      ),
    },
    {
      label: "Tuition (annual, INR approx.)",
      values: columns.map((column) => buildTuitionCell(column)),
    },
    {
      label: "Hostel (annual, INR approx.)",
      values: columns.map((column) => buildHostelCell(column)),
    },
    {
      label: "Medical bundle + related",
      values: columns.map((column) => buildMedicalCell(column)),
    },
    {
      label: "OTC / development",
      values: columns.map((column) => buildOtcCell(column)),
    },
    {
      label: "Mess",
      values: columns.map((column) => buildMessCell(column)),
    },
    {
      label: "Service charges",
      values: columns.map((column) => buildServiceCell(column)),
    },
  ];
}

function mapMetricRowsToCompareRows(
  metricRows: ReadonlyArray<CompareMetricRow>,
  columns: ReadonlyArray<UniversityCompareColumn>,
): ReadonlyArray<CompareRowProps> {
  const result: CompareRowProps[] = [];
  for (let rowIndex = 0; rowIndex < metricRows.length; rowIndex += 1) {
    const metricRow = metricRows[rowIndex];
    const cells: CompareRowCell[] = [];
    for (let colIndex = 0; colIndex < columns.length; colIndex += 1) {
      const column = columns[colIndex];
      cells.push({
        columnSlug: column.slug,
        text: metricRow.values[colIndex],
      });
    }
    result.push({ label: metricRow.label, cells });
  }
  return result;
}

type ReadActiveSlideIndexFromScrollProps = {
  readonly scrollContainer: HTMLUListElement;
  readonly columnCount: number;
};

function readActiveSlideIndexFromScroll(
  props: ReadActiveSlideIndexFromScrollProps,
): number {
  const { scrollContainer, columnCount } = props;
  const slideWidth = scrollContainer.clientWidth;
  if (slideWidth <= 0) {
    return 0;
  }
  const rawIndex = Math.round(scrollContainer.scrollLeft / slideWidth);
  return Math.max(0, Math.min(columnCount - 1, rawIndex));
}

type GoToSlideProps = {
  readonly scrollContainer: HTMLUListElement | null;
  readonly index: number;
  readonly columnCount: number;
};

function goToSlide(props: GoToSlideProps): void {
  const { scrollContainer, index, columnCount } = props;
  if (scrollContainer === null) {
    return;
  }
  if (index < 0 || index >= columnCount) {
    return;
  }
  const slideWidth = scrollContainer.clientWidth;
  scrollContainer.scrollTo({
    left: index * slideWidth,
    behavior: "smooth",
  });
}

type MobileCompareCarouselProps = {
  readonly columns: ReadonlyArray<UniversityCompareColumn>;
  readonly metricRows: ReadonlyArray<CompareMetricRow>;
};

function MobileCompareCarousel(props: MobileCompareCarouselProps) {
  const { columns, metricRows } = props;
  const scrollContainerRef = useRef<HTMLUListElement>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const columnCount = columns.length;

  const slidesKey = columns.map((column) => column.slug).join("|");

  const syncActiveFromScroll = useCallback(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer === null) {
      return;
    }
    const nextIndex = readActiveSlideIndexFromScroll({
      scrollContainer,
      columnCount,
    });
    setActiveSlideIndex((previousIndex) => {
      if (previousIndex === nextIndex) {
        return previousIndex;
      }
      return nextIndex;
    });
  }, [columnCount]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer === null) {
      return;
    }
    scrollContainer.scrollLeft = 0;
    setActiveSlideIndex(0);
  }, [slidesKey]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer === null) {
      return;
    }
    syncActiveFromScroll();
    scrollContainer.addEventListener("scroll", syncActiveFromScroll, {
      passive: true,
    });
    const resizeObserver = new ResizeObserver(syncActiveFromScroll);
    resizeObserver.observe(scrollContainer);
    return () => {
      scrollContainer.removeEventListener("scroll", syncActiveFromScroll);
      resizeObserver.disconnect();
    };
  }, [syncActiveFromScroll, slidesKey]);

  function handleGoPrevious() {
    goToSlide({
      scrollContainer: scrollContainerRef.current,
      index: activeSlideIndex - 1,
      columnCount,
    });
  }

  function handleGoNext() {
    goToSlide({
      scrollContainer: scrollContainerRef.current,
      index: activeSlideIndex + 1,
      columnCount,
    });
  }

  function handleDotActivate(slideIndex: number) {
    goToSlide({
      scrollContainer: scrollContainerRef.current,
      index: slideIndex,
      columnCount,
    });
  }

  const showPager = columnCount > 1;

  return (
    <div
      className="flex w-full min-w-0 flex-col gap-3 md:hidden"
      aria-roledescription="carousel"
    >
      {showPager ? (
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-surface-muted/40 px-3 py-3 dark:border-slate-700 dark:bg-slate-800/30">
          <div className="flex items-center justify-between gap-2">
            <p
              className="text-xs font-medium text-slate-600 dark:text-slate-400"
              aria-live="polite"
            >
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                {activeSlideIndex + 1}
              </span>
              <span className="text-slate-500 dark:text-slate-500"> / </span>
              <span>{columnCount}</span>
              <span className="ms-1.5 text-slate-500 dark:text-slate-500">
                Swipe the card row or use arrows to compare the next university.
              </span>
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleGoPrevious}
              disabled={activeSlideIndex === 0}
              aria-label="Previous university"
              className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-surface text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-surface-muted disabled:pointer-events-none disabled:opacity-40 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              ←
            </button>
            <div
              className="flex flex-1 items-center justify-center gap-2 px-1"
              aria-label="Jump to a university"
            >
              {columns.map((column, slideIndex) => {
                const isActive = slideIndex === activeSlideIndex;
                const labelShort =
                  column.college !== undefined
                    ? column.college.universityName
                    : "Not found";
                return (
                  <button
                    key={column.slug}
                    type="button"
                    aria-current={isActive ? "true" : undefined}
                    aria-label={`Show fees for ${labelShort}`}
                    onClick={() => {
                      handleDotActivate(slideIndex);
                    }}
                    className={
                      isActive
                        ? "h-2.5 w-8 shrink-0 rounded-full bg-accent transition-[width,background-color] duration-200"
                        : "h-2.5 w-2.5 shrink-0 rounded-full bg-slate-300 transition-[width,background-color] duration-200 hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-500"
                    }
                  />
                );
              })}
            </div>
            <button
              type="button"
              onClick={handleGoNext}
              disabled={activeSlideIndex === columnCount - 1}
              aria-label="Next university"
              className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-surface text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-surface-muted disabled:pointer-events-none disabled:opacity-40 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              →
            </button>
          </div>
        </div>
      ) : null}

      <ul
        ref={scrollContainerRef}
        className="flex w-full min-w-0 snap-x snap-mandatory overflow-x-auto scroll-pb-2 [-ms-overflow-style:none] [scrollbar-width:none] overscroll-x-contain pb-1 [&::-webkit-scrollbar]:hidden"
        aria-label="University fee cards, swipe sideways"
      >
        {columns.map((column, columnIndex) => (
          <li
            key={column.slug}
            className="box-border w-full shrink-0 grow-0 basis-full snap-start snap-always"
          >
            <article className="overflow-hidden rounded-2xl border border-slate-200/90 bg-surface/95 shadow-md shadow-slate-900/5 ring-1 ring-slate-900/5 dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-black/20 dark:ring-white/5">
              <div className="border-b border-slate-100 bg-surface-muted/50 px-4 py-3 dark:border-slate-800 dark:bg-slate-800/40">
                <h2 className="text-pretty text-base font-bold leading-snug text-slate-900 dark:text-slate-50">
                  {column.college !== undefined
                    ? column.college.universityName
                    : "Not found"}
                </h2>
                {column.college !== undefined ? (
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">
                    {resolveCollegeCountryLabel(column.college.country)}
                  </p>
                ) : null}
                {column.college !== undefined ? (
                  <Link
                    href={`/colleges/${column.slug}`}
                    className="mt-2 inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-slate-200 bg-surface px-3 py-2 text-sm font-semibold text-accent transition hover:bg-surface-muted dark:border-slate-600 dark:bg-slate-900 dark:hover:bg-slate-800"
                  >
                    Full fee sheet
                  </Link>
                ) : (
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    Invalid or outdated link.
                  </p>
                )}
              </div>
              <dl className="divide-y divide-slate-100 px-4 dark:divide-slate-800">
                {metricRows.map((metricRow) => (
                  <div
                    key={metricRow.label}
                    className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline sm:gap-4"
                  >
                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      {metricRow.label}
                    </dt>
                    <dd className="text-sm font-semibold break-words text-slate-900 tabular-nums dark:text-slate-100 sm:text-right">
                      {metricRow.values[columnIndex]}
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function UniversityCompareView(props: UniversityCompareViewProps) {
  const { columns } = props;

  if (columns.length === 0) {
    return (
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-[max(1rem,env(safe-area-inset-left))] py-10 pe-[max(1rem,env(safe-area-inset-right))] sm:py-16 lg:px-8">
        <header className="space-y-3 text-center">
          <h1 className="text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-50">
            Compare universities
          </h1>
          <p className="text-pretty text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
            Choose up to three universities from the directory, then open
            compare to see tuition, hostel, and other fees side by side.
          </p>
        </header>
        <Link
          href="/"
          className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground shadow-md shadow-indigo-500/20 transition hover:brightness-110 active:scale-[0.98] dark:shadow-indigo-900/40"
        >
          Browse universities
        </Link>
      </div>
    );
  }

  const metricRows = buildCompareMetricRows(columns);
  const tableRows = mapMetricRowsToCompareRows(metricRows, columns);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-[max(1rem,env(safe-area-inset-left))] py-6 pe-[max(1rem,env(safe-area-inset-right))] sm:gap-8 sm:py-8 md:gap-10 md:px-6 md:py-10 lg:px-8">
      <header className="space-y-2 sm:space-y-3">
        <p className="inline-flex w-fit rounded-full border border-indigo-200/80 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-950/50 dark:text-indigo-200">
          Side-by-side
        </p>
        <h1 className="text-balance text-xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl dark:text-slate-50">
          Compare universities
        </h1>
        <p className="max-w-2xl text-pretty text-xs leading-relaxed text-slate-600 sm:text-sm md:text-base dark:text-slate-400">
          Figures are approximate INR. On phones, swipe sideways on the card
          area to view each university one at a time; wider screens use a
          table you can scroll horizontally if needed.
        </p>
      </header>

      <MobileCompareCarousel columns={columns} metricRows={metricRows} />

      {/* Table: md and up */}
      <div className="hidden min-w-0 md:block">
        <div className="overflow-x-auto overscroll-x-contain rounded-2xl border border-slate-200/90 bg-surface/90 shadow-lg shadow-slate-900/5 ring-1 ring-slate-900/5 [-webkit-overflow-scrolling:touch] dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-black/20 dark:ring-white/5 lg:rounded-3xl">
          <table className="w-full min-w-[34rem] max-w-none border-collapse text-left lg:min-w-[42rem]">
              <thead>
                <tr className="border-b border-slate-200 bg-surface-muted/60 dark:border-slate-700 dark:bg-slate-800/50">
                  <th
                    scope="col"
                    className="sticky left-0 z-20 w-[min(42vw,11rem)] min-w-0 max-w-[11rem] bg-surface-muted/95 px-2 py-3 text-left text-[0.65rem] font-bold uppercase leading-tight tracking-wide text-slate-500 shadow-[1px_0_0_0_rgb(226_232_240)] backdrop-blur-sm sm:w-auto sm:min-w-[10.5rem] sm:max-w-none sm:px-4 sm:text-xs dark:bg-slate-800/95 dark:text-slate-400 dark:shadow-[1px_0_0_0_rgb(30_41_59)]"
                  >
                    <span className="sr-only">Metric</span>
                    <span aria-hidden className="text-transparent">
                      —
                    </span>
                  </th>
                  {columns.map((column) => (
                    <th
                      key={column.slug}
                      scope="col"
                      className="min-w-0 px-2 py-3 text-left sm:min-w-[9.5rem] sm:px-4 md:min-w-[11rem] lg:min-w-[12rem]"
                    >
                      <div className="flex min-w-0 flex-col gap-2">
                        <span className="line-clamp-4 text-pretty text-sm font-bold leading-snug text-slate-900 lg:text-base dark:text-slate-50">
                          {column.college !== undefined
                            ? column.college.universityName
                            : "Not found"}
                        </span>
                        {column.college !== undefined ? (
                          <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">
                            {resolveCollegeCountryLabel(column.college.country)}
                          </span>
                        ) : null}
                        {column.college !== undefined ? (
                          <Link
                            href={`/colleges/${column.slug}`}
                            className="w-fit min-w-0 break-words text-xs font-semibold text-accent underline-offset-4 transition hover:underline lg:text-sm"
                          >
                            Full fee sheet
                          </Link>
                        ) : (
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            Invalid or outdated link.
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row) => (
                  <CompareRow
                    key={row.label}
                    label={row.label}
                    cells={row.cells}
                  />
                ))}
              </tbody>
            </table>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl border border-slate-200 bg-surface px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-surface-muted active:scale-[0.99] sm:w-auto dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
        >
          ← Back to directory
        </Link>
      </div>
    </div>
  );
}
