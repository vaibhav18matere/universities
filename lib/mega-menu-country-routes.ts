import type { MegaMenuCountryItem } from "@/lib/landing-types";
import { megaMenuCountries } from "@/lib/landing-static";

export function buildUniversitiesHubPath(): string {
  return "/universities";
}

export function buildUniversitiesCountryPath(countryRouteId: string): string {
  return `/universities/${countryRouteId}`;
}

export function findMegaMenuCountryByRouteId(
  routeId: string,
): MegaMenuCountryItem | undefined {
  for (let index = 0; index < megaMenuCountries.length; index += 1) {
    const country = megaMenuCountries[index];
    if (country.id === routeId) {
      return country;
    }
  }
  return undefined;
}

export function listMegaMenuCountryRouteParams(): Array<{
  countryId: string;
}> {
  const params: Array<{ countryId: string }> = [];
  for (let index = 0; index < megaMenuCountries.length; index += 1) {
    params.push({ countryId: megaMenuCountries[index].id });
  }
  return params;
}
