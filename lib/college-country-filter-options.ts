import type { College } from "./college-types";
import { resolveCollegeCountryLabel } from "./college-country-label";

export function getCountryFilterLabels(
  colleges: ReadonlyArray<College>,
): ReadonlyArray<string> {
  const labels = new Set<string>();
  for (let index = 0; index < colleges.length; index += 1) {
    labels.add(resolveCollegeCountryLabel(colleges[index].country));
  }
  return Array.from(labels).sort((left, right) =>
    left.localeCompare(right, "en"),
  );
}
