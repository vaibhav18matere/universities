import type { UniversityBrochureExtension } from "./university-brochure-extension-types";

/** Webometrics / Cybermetrics style ranks (lower numbers are better). */
export type WebometricsRanking = {
  readonly countryRank: number;
  readonly worldRank: number;
  readonly impactRank: number;
  readonly opennessRank: number;
  readonly excellenceRank: number;
};

export type FeeCurrency = "RUB" | "USD";

export type MessChargesParsed =
  | { readonly kind: "amount"; readonly amountUsd: number }
  | { readonly kind: "not_available" };

export type ParsedMoneyField =
  | {
      readonly kind: "amount";
      readonly rawDisplay: string;
      readonly amount: number;
      readonly currency: FeeCurrency;
      /** Annual amount converted to RUB for internal range filters (display uses INR via `inr-display`) */
      readonly amountRub: number;
    }
  | {
      readonly kind: "not_available";
      readonly rawDisplay: string;
    };

export type CollegeRecord = {
  readonly id: string;
  readonly universityName: string;
  /** When omitted, listings treat the institution as Russia (legacy rows). */
  readonly country?: string;
  readonly webometricsRanking?: WebometricsRanking;
  readonly tuitionFeesRaw: string;
  readonly hostelFeesRaw: string;
  readonly medicalBundleRub: number;
  readonly otcChargesUsd: number;
  readonly messChargesRaw: string;
  readonly serviceChargesRub: number;
  readonly brochureExtension?: UniversityBrochureExtension;
};

export type College = CollegeRecord & {
  readonly slug: string;
  readonly tuition: ParsedMoneyField;
  readonly hostel: ParsedMoneyField;
  readonly messCharges: MessChargesParsed;
};

export type CollegeFilterState = {
  readonly searchQuery: string;
  /** Resolved country label (e.g. `Russia`, `Uzbekistan`); `null` = all countries. */
  readonly selectedCountry: string | null;
  readonly tuitionMinRub: number | null;
  readonly tuitionMaxRub: number | null;
  readonly hostelMinRub: number | null;
  readonly hostelMaxRub: number | null;
};
