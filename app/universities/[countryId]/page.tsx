import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CollegeDirectory } from "@/app/components/CollegeDirectory";
import { getAllColleges } from "@/lib/colleges-catalog";
import {
  buildUniversitiesHubPath,
  findMegaMenuCountryByRouteId,
  listMegaMenuCountryRouteParams,
} from "@/lib/mega-menu-country-routes";

type UniversitiesByCountryPageProps = {
  readonly params: Promise<{ countryId: string }>;
};

export function generateStaticParams(): Array<{ countryId: string }> {
  return listMegaMenuCountryRouteParams();
}

export async function generateMetadata(
  props: UniversitiesByCountryPageProps,
): Promise<Metadata> {
  const { countryId } = await props.params;
  const country = findMegaMenuCountryByRouteId(countryId);
  if (country === undefined) {
    return { title: "Country not found" };
  }
  return {
    title: `${country.label} universities`,
    description: `Browse universities in ${country.label}. Filter by fees in INR and compare options.`,
  };
}

export default async function UniversitiesByCountryPage(
  props: UniversitiesByCountryPageProps,
) {
  const { countryId } = await props.params;
  const country = findMegaMenuCountryByRouteId(countryId);
  if (country === undefined) {
    notFound();
  }

  const colleges = getAllColleges();

  return (
      <section className="relative min-w-0 overflow-x-clip pb-12 pt-8 sm:pb-16 sm:pt-10 md:pt-12">
      <div className="mx-auto mb-8 max-w-7xl px-4 sm:mb-10 sm:px-6 lg:px-8">
        <nav
          className="mb-6 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="font-medium text-slate-600 transition hover:text-accent dark:text-slate-400"
          >
            Home
          </Link>
          <span className="text-slate-300 dark:text-slate-600" aria-hidden>
            /
          </span>
          <Link
            href={buildUniversitiesHubPath()}
            className="font-medium text-slate-600 transition hover:text-accent dark:text-slate-400"
          >
            Universities
          </Link>
          <span className="text-slate-300 dark:text-slate-600" aria-hidden>
            /
          </span>
          <span className="font-semibold text-slate-900 dark:text-slate-100">
            {country.label}
          </span>
        </nav>
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-4xl" aria-hidden>
            {country.flagEmoji}
          </p>
          <h1 className="text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl dark:text-slate-50">
            Universities in {country.label}
          </h1>
          <p className="max-w-2xl text-sm text-slate-600 sm:text-base dark:text-slate-400">
            All catalog universities for this country are listed below. Adjust
            tuition and hostel ranges in INR, or search by university name.
          </p>
        </div>
      </div>
      <CollegeDirectory
        colleges={colleges}
        showDirectoryHeader={false}
        fixedCountryLabel={country.label}
      />
    </section>
  );
}
