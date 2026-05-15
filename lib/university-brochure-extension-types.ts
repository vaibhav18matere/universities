/** Optional marketing / brochure block for a detail page (per-university). */
export type BrochureTuitionYearRow = {
  readonly yearNumber: number;
  readonly feeRubDisplay: string;
  readonly feeInrDisplay: string;
};

export type UniversityBrochureExtension = {
  /** Optional line under the brochure intro (e.g. mess compulsory). */
  readonly brochureTagline?: string;
  /** Overrides default "Tuition by year (6 years)" when programme length differs. */
  readonly tuitionYearsSectionTitle?: string;
  /** Overrides default "Total tuition (6 years, INR)" banner label. */
  readonly totalTuitionBannerTitle?: string;
  readonly courseDurationSummary: string;
  readonly processingFeesInrDisplay: string;
  readonly inclusionItems: ReadonlyArray<string>;
  readonly tuitionYearRows: ReadonlyArray<BrochureTuitionYearRow>;
  readonly totalTuitionSixYearsInrDisplay: string;
  readonly notes: ReadonlyArray<string>;
  readonly contactPhoneNumbers: ReadonlyArray<string>;
};
