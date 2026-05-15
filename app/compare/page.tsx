import type { Metadata } from "next";
import { UniversityCompareView } from "@/app/components/UniversityCompareView";
import type { UniversityCompareColumn } from "@/app/components/UniversityCompareView";
import { getCollegeBySlug } from "@/lib/colleges-catalog";
import { parseUniversityCompareSlugsFromSearchParam } from "@/lib/university-compare-url";

type ComparePageProps = {
  readonly searchParams: Promise<{
    readonly u?: string | ReadonlyArray<string>;
  }>;
};

export const metadata: Metadata = {
  title: "Compare universities",
  description:
    "Compare up to three Russian universities: tuition, hostel, medical bundle, and other fees in approximate INR.",
};

function buildCompareColumns(
  slugs: ReadonlyArray<string>,
): ReadonlyArray<UniversityCompareColumn> {
  const columns: Array<UniversityCompareColumn> = [];
  for (let index = 0; index < slugs.length; index += 1) {
    const slug = slugs[index];
    const college = getCollegeBySlug(slug);
    columns.push({ slug, college });
  }
  return columns;
}

export default async function ComparePage(props: ComparePageProps) {
  const resolvedSearchParams = await props.searchParams;
  const slugs = parseUniversityCompareSlugsFromSearchParam(
    resolvedSearchParams.u,
  );
  const columns = buildCompareColumns(slugs);
  return <UniversityCompareView columns={columns} />;
}
