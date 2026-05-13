/** Optional marketing / brochure block for a detail page (per-university). */
export type BrochureTuitionYearRow = {
  readonly yearNumber: number;
  readonly feeRubDisplay: string;
  readonly feeInrDisplay: string;
};

export type UniversityBrochureExtension = {
  /** Optional line under the brochure intro (e.g. mess compulsory). */
  readonly brochureTagline?: string;
  readonly courseDurationSummary: string;
  readonly processingFeesInrDisplay: string;
  readonly inclusionItems: ReadonlyArray<string>;
  readonly tuitionYearRows: ReadonlyArray<BrochureTuitionYearRow>;
  readonly totalTuitionSixYearsInrDisplay: string;
  readonly notes: ReadonlyArray<string>;
  readonly contactPhoneNumbers: ReadonlyArray<string>;
};
