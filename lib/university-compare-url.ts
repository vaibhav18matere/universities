export const UNIVERSITY_COMPARE_QUERY_KEY = "u";

const MAX_UNIVERSITIES_TO_COMPARE = 3;

function appendUniqueSlug(
  accumulator: Array<string>,
  candidate: string,
): void {
  const trimmed = candidate.trim();
  if (trimmed.length === 0) {
    return;
  }
  if (accumulator.includes(trimmed)) {
    return;
  }
  accumulator.push(trimmed);
}

export function buildUniversityComparePath(
  slugs: ReadonlyArray<string>,
): string {
  const uniqueSlugs: Array<string> = [];
  for (let index = 0; index < slugs.length; index += 1) {
    appendUniqueSlug(uniqueSlugs, slugs[index]);
    if (uniqueSlugs.length === MAX_UNIVERSITIES_TO_COMPARE) {
      break;
    }
  }
  if (uniqueSlugs.length === 0) {
    return "/compare";
  }
  const queryPairs: Array<string> = [];
  for (let index = 0; index < uniqueSlugs.length; index += 1) {
    const slug = uniqueSlugs[index];
    queryPairs.push(
      `${encodeURIComponent(UNIVERSITY_COMPARE_QUERY_KEY)}=${encodeURIComponent(slug)}`,
    );
  }
  return `/compare?${queryPairs.join("&")}`;
}

export function parseUniversityCompareSlugsFromSearchParam(
  raw: string | ReadonlyArray<string> | undefined,
): ReadonlyArray<string> {
  if (raw === undefined) {
    return [];
  }
  const values: ReadonlyArray<string> =
    typeof raw === "string" ? [raw] : raw;
  const uniqueSlugs: Array<string> = [];
  for (let index = 0; index < values.length; index += 1) {
    appendUniqueSlug(uniqueSlugs, values[index]);
    if (uniqueSlugs.length === MAX_UNIVERSITIES_TO_COMPARE) {
      break;
    }
  }
  return uniqueSlugs;
}
