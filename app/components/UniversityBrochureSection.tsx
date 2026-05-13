import type { UniversityBrochureExtension } from "@/lib/university-brochure-extension-types";

type UniversityBrochureSectionProps = {
  readonly extension: UniversityBrochureExtension;
};

function phoneDigitsToTelHref(digits: string): string {
  const stripped = digits.replace(/\D/g, "");
  if (stripped.length === 10) {
    return `tel:+91${stripped}`;
  }
  return `tel:+${stripped}`;
}

export function UniversityBrochureSection(props: UniversityBrochureSectionProps) {
  const { extension } = props;

  return (
    <section
      className="rounded-3xl border border-amber-200/90 bg-linear-to-b from-amber-50/90 to-surface/95 p-5 shadow-md ring-1 ring-amber-900/5 dark:border-amber-900/40 dark:from-amber-950/30 dark:to-slate-900/90 dark:ring-amber-500/10 sm:p-6"
      aria-labelledby="brochure-heading"
    >
      <h2
        id="brochure-heading"
        className="text-lg font-bold tracking-tight text-amber-950 dark:text-amber-100"
      >
        Program overview
      </h2>
      <p className="mt-1 text-sm text-amber-900/80 dark:text-amber-200/80">
        From the university brochure. Figures may differ from the fee-sheet row
        further down — confirm with the institution before paying.
      </p>
      {extension.brochureTagline !== undefined ? (
        <p className="mt-3 rounded-xl border border-amber-300/60 bg-amber-100/50 px-3 py-2 text-sm font-semibold text-amber-950 dark:border-amber-700/50 dark:bg-amber-950/40 dark:text-amber-100">
          {extension.brochureTagline}
        </p>
      ) : null}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-amber-200/70 bg-surface/80 p-4 dark:border-amber-800/50 dark:bg-slate-900/60">
          <p className="text-xs font-bold uppercase tracking-wide text-amber-800 dark:text-amber-300">
            Course duration
          </p>
          <p className="mt-2 text-base font-semibold text-slate-900 dark:text-slate-100">
            {extension.courseDurationSummary}
          </p>
        </div>
        <div className="rounded-2xl border border-amber-200/70 bg-surface/80 p-4 dark:border-amber-800/50 dark:bg-slate-900/60">
          <p className="text-xs font-bold uppercase tracking-wide text-amber-800 dark:text-amber-300">
            Processing fees
          </p>
          <p className="mt-2 text-base font-semibold text-slate-900 dark:text-slate-100">
            {extension.processingFeesInrDisplay}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xs font-bold uppercase tracking-wide text-amber-800 dark:text-amber-300">
          What processing covers
        </h3>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {extension.inclusionItems.map((item) => (
            <li
              key={item}
              className="flex gap-2 text-sm text-slate-800 dark:text-slate-200"
            >
              <span className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden>
                ◆
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h3 className="text-xs font-bold uppercase tracking-wide text-amber-800 dark:text-amber-300">
          Tuition by year (6 years)
        </h3>
        <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
          Per-year amounts from the brochure. Tuition only — hostel and food
          separate.
        </p>

        <div className="mt-4 space-y-3 md:hidden">
          {extension.tuitionYearRows.map((row) => (
            <div
              key={row.yearNumber}
              className="rounded-2xl border border-slate-200/90 bg-surface/90 p-4 dark:border-slate-700 dark:bg-slate-900/70"
            >
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Year {row.yearNumber}
              </p>
              <dl className="mt-2 space-y-1 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-500 dark:text-slate-400">Ruble</dt>
                  <dd className="font-semibold text-slate-900 dark:text-slate-100">
                    {row.feeRubDisplay}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-500 dark:text-slate-400">INR</dt>
                  <dd className="font-semibold text-slate-900 dark:text-slate-100">
                    {row.feeInrDisplay}
                  </dd>
                </div>
              </dl>
            </div>
          ))}
        </div>

        <div className="mt-4 hidden overflow-x-auto rounded-2xl border border-slate-200/90 dark:border-slate-700 md:block">
          <table className="w-full min-w-[480px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-surface-muted/90 dark:border-slate-700 dark:bg-slate-800/80">
                <th className="px-4 py-3 font-bold text-slate-600 dark:text-slate-300">
                  Year
                </th>
                <th className="px-4 py-3 font-bold text-slate-600 dark:text-slate-300">
                  Tuition (₽)
                </th>
                <th className="px-4 py-3 font-bold text-slate-600 dark:text-slate-300">
                  Tuition (INR)
                </th>
              </tr>
            </thead>
            <tbody>
              {extension.tuitionYearRows.map((row) => (
                <tr
                  key={row.yearNumber}
                  className="border-b border-slate-100 last:border-0 dark:border-slate-800"
                >
                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">
                    {row.yearNumber}
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">
                    {row.feeRubDisplay}
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">
                    {row.feeInrDisplay}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-amber-300/80 bg-amber-100/60 px-4 py-5 text-center dark:border-amber-700/60 dark:bg-amber-950/40">
        <p className="text-xs font-bold uppercase tracking-wide text-amber-900 dark:text-amber-200">
          Total tuition (6 years, INR)
        </p>
        <p className="mt-2 text-2xl font-bold tracking-tight text-amber-950 dark:text-amber-50 sm:text-3xl">
          {extension.totalTuitionSixYearsInrDisplay}
        </p>
      </div>

      <div className="mt-8 rounded-2xl border-l-4 border-amber-500 bg-surface-muted/80 px-4 py-4 dark:bg-slate-900/60">
        <h3 className="text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300">
          Important notes
        </h3>
        <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-slate-700 dark:text-slate-300">
          {extension.notes.map((note) => (
            <li key={note} className="text-pretty pl-1 marker:text-amber-600">
              {note}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 rounded-2xl border border-amber-200/80 bg-surface/90 px-4 py-4 dark:border-amber-800/50 dark:bg-slate-900/70">
        <h3 className="text-xs font-bold uppercase tracking-wide text-amber-800 dark:text-amber-300">
          Contact
        </h3>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-4">
          {extension.contactPhoneNumbers.map((number) => (
            <a
              key={number}
              href={phoneDigitsToTelHref(number)}
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-amber-700 px-4 py-2 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-amber-800 active:scale-[0.98] dark:bg-amber-600 dark:hover:bg-amber-500"
            >
              {number}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
