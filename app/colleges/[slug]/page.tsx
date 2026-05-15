import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { UniversityBrochureSection } from "@/app/components/UniversityBrochureSection";
import { getCollegeBySlug, getCollegeSlugList } from "@/lib/colleges-catalog";
import {
  formatMessChargesInr,
  formatParsedMoneyFieldInr,
  formatRubAmountInInr,
  formatUsdAmountInInr,
} from "@/lib/inr-display";
import { resolveCollegeCountryLabel } from "@/lib/college-country-label";

type CollegeDetailPageProps = {
  readonly params: Promise<{ slug: string }>;
};

export function generateStaticParams(): Array<{ slug: string }> {
  const slugs = getCollegeSlugList();
  const params: Array<{ slug: string }> = [];
  for (let index = 0; index < slugs.length; index += 1) {
    params.push({ slug: slugs[index] });
  }
  return params;
}

export async function generateMetadata(
  props: CollegeDetailPageProps,
): Promise<Metadata> {
  const { slug } = await props.params;
  const college = getCollegeBySlug(slug);
  if (college === undefined) {
    return { title: "University not found" };
  }
  return {
    title: college.universityName,
    description: `Approximate INR fees and charges for ${college.universityName}.`,
  };
}

type FeeBlockProps = {
  readonly title: string;
  readonly children: ReactNode;
};

function FeeBlock(props: FeeBlockProps) {
  const { title, children } = props;
  return (
    <div className="rounded-2xl border border-slate-200/90 bg-surface/90 p-4 shadow-sm ring-1 ring-slate-900/5 dark:border-slate-800 dark:bg-slate-900/80 dark:ring-white/5 sm:p-5">
      <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {title}
      </h3>
      <div className="mt-3 text-sm leading-relaxed text-slate-900 dark:text-slate-100">
        {children}
      </div>
    </div>
  );
}

export default async function CollegeDetailPage(props: CollegeDetailPageProps) {
  const { slug } = await props.params;
  const college = getCollegeBySlug(slug);
  if (college === undefined) {
    notFound();
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-8 sm:gap-10 sm:px-6 sm:py-10 lg:px-8">
      <nav
        className="flex flex-wrap items-center gap-2 text-sm"
        aria-label="Breadcrumb"
      >
        <Link
          href="/"
          className="inline-flex min-h-11 items-center rounded-xl px-2 font-medium text-slate-600 transition hover:bg-surface-muted hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:focus-visible:ring-offset-background"
        >
          Home
        </Link>
        <span className="text-slate-300 dark:text-slate-600" aria-hidden>
          /
        </span>
        <span className="line-clamp-2 min-h-11 flex-1 py-2 font-medium text-slate-900 dark:text-slate-100">
          {college.universityName}
        </span>
      </nav>

      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <p className="inline-flex w-fit rounded-full border border-indigo-200/80 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-950/50 dark:text-indigo-200">
            {resolveCollegeCountryLabel(college.country)}
          </p>
          <p className="inline-flex w-fit rounded-full border border-slate-200/80 bg-surface-muted px-3 py-1 text-xs font-semibold text-slate-600 dark:border-slate-600 dark:bg-slate-800/80 dark:text-slate-300">
            Full fee schedule
          </p>
        </div>
        <h1 className="text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl dark:text-slate-50">
          {college.universityName}
        </h1>
        {/* <p className="text-pretty text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
          Official spreadsheet row below. When a brochure is available for this
          university, it appears first.
        </p> */}
      </header>

      {college.brochureExtension !== undefined ? (
        <UniversityBrochureSection extension={college.brochureExtension} />
      ) : null}

      {college.webometricsRanking !== undefined ? (
        <section
          aria-label="Webometrics ranking snapshot"
          className="rounded-2xl border border-slate-200/90 bg-surface/90 p-4 shadow-sm ring-1 ring-slate-900/5 dark:border-slate-800 dark:bg-slate-900/80 dark:ring-white/5 sm:p-5"
        >
          <h2 className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Webometrics (rank — lower is better)
          </h2>
          <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            <div className="flex justify-between gap-3 rounded-xl bg-surface-muted/80 px-3 py-2 dark:bg-slate-800/60">
              <dt className="text-slate-500 dark:text-slate-400">In country</dt>
              <dd className="font-semibold text-slate-900 dark:text-slate-100">
                {college.webometricsRanking.countryRank}
              </dd>
            </div>
            <div className="flex justify-between gap-3 rounded-xl bg-surface-muted/80 px-3 py-2 dark:bg-slate-800/60">
              <dt className="text-slate-500 dark:text-slate-400">World</dt>
              <dd className="font-semibold text-slate-900 dark:text-slate-100">
                {college.webometricsRanking.worldRank}
              </dd>
            </div>
            <div className="flex justify-between gap-3 rounded-xl bg-surface-muted/80 px-3 py-2 dark:bg-slate-800/60">
              <dt className="text-slate-500 dark:text-slate-400">Impact</dt>
              <dd className="font-semibold text-slate-900 dark:text-slate-100">
                {college.webometricsRanking.impactRank}
              </dd>
            </div>
            <div className="flex justify-between gap-3 rounded-xl bg-surface-muted/80 px-3 py-2 dark:bg-slate-800/60">
              <dt className="text-slate-500 dark:text-slate-400">Openness</dt>
              <dd className="font-semibold text-slate-900 dark:text-slate-100">
                {college.webometricsRanking.opennessRank}
              </dd>
            </div>
            <div className="flex justify-between gap-3 rounded-xl bg-surface-muted/80 px-3 py-2 sm:col-span-2 dark:bg-slate-800/60">
              <dt className="text-slate-500 dark:text-slate-400">Excellence</dt>
              <dd className="font-semibold text-slate-900 dark:text-slate-100">
                {college.webometricsRanking.excellenceRank}
              </dd>
            </div>
          </dl>
        </section>
      ) : null}

      <h2 className="mt-10 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        Fee sheet row
      </h2>

      <div className="flex flex-col gap-4 sm:gap-5">
        <FeeBlock title="University name">
          <p className="text-base font-semibold">{college.universityName}</p>
        </FeeBlock>

        <FeeBlock title="Tuition fees">
          <p className="text-base font-semibold">
            {formatParsedMoneyFieldInr(college.tuition)}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            Approximate INR per year, using the same basis as the directory.
            Confirm the exact amount and currency with the university before
            paying.
          </p>
        </FeeBlock>

        <FeeBlock title="Hostel fees">
          <p className="text-base font-semibold">
            {formatParsedMoneyFieldInr(college.hostel)}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            Approximate INR per year, using the same basis as the directory.
            Confirm the exact amount and currency with the university before
            paying.
          </p>
        </FeeBlock>

        <FeeBlock title="Medical insurance + medical test + biometric + SIM card + registration + visa extension">
          <p className="text-base font-semibold">
            {formatRubAmountInInr(college.medicalBundleRub)}
          </p>
        </FeeBlock>

        <FeeBlock title="OTC charges (development)">
          <p className="text-base font-semibold">
            {formatUsdAmountInInr(college.otcChargesUsd)}
          </p>
        </FeeBlock>

        <FeeBlock title="Mess charges">
          <p className="text-base font-semibold">
            {formatMessChargesInr(college.messCharges, college.messChargesRaw)}
          </p>
        </FeeBlock>

        <FeeBlock title="Service charges">
          <p className="text-base font-semibold">
            {formatRubAmountInInr(college.serviceChargesRub)}
          </p>
        </FeeBlock>
      </div>

      <div className="sticky bottom-0 z-10 -mx-4 border-t border-slate-200/90 bg-background/90 px-4 py-4 backdrop-blur-md dark:border-slate-800 sm:-mx-6 sm:rounded-2xl sm:border sm:px-4 dark:bg-slate-950/90">
        <Link
          href="/"
          className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl border border-slate-200 bg-surface px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-surface-muted active:scale-[0.99] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
        >
          ← Back to all universities
        </Link>
      </div>
    </div>
  );
}
