import type { UniversityBrochureExtension } from "./university-brochure-extension-types";

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
      /** Annual amount converted to RUB for range filters */
      readonly amountRub: number;
    }
  | {
      readonly kind: "not_available";
      readonly rawDisplay: string;
    };

export type CollegeRecord = {
  readonly id: string;
  readonly universityName: string;
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
  readonly tuitionMinRub: number | null;
  readonly tuitionMaxRub: number | null;
  readonly hostelMinRub: number | null;
  readonly hostelMaxRub: number | null;
};
