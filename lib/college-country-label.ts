/** Display label for listing; existing Russian rows omit `country`. */
export function resolveCollegeCountryLabel(
  country: string | undefined,
): string {
  if (country === undefined) {
    return "Russia";
  }
  return country;
}
