import type { College } from "./college-types";
import { convertInrToRub, convertRubToInr } from "./inr-display";

const ONE_LAKH_INR = 100_000;
const TEN_LAKH_INR = 1_000_000;
const COARSE_RANGE_STEP_INR = 10 * ONE_LAKH_INR;

export type TuitionInrFilterRange = {
  readonly minInr: number;
  readonly maxInr: number;
  readonly minRub: number;
  readonly maxRub: number;
};

function getTuitionRangeStepInr(bucketMinInr: number): number {
  if (bucketMinInr < TEN_LAKH_INR) {
    return ONE_LAKH_INR;
  }
  return COARSE_RANGE_STEP_INR;
}

function getTuitionBucketMinInr(amountInr: number): number {
  if (amountInr < TEN_LAKH_INR) {
    return Math.floor(amountInr / ONE_LAKH_INR) * ONE_LAKH_INR;
  }
  return Math.floor(amountInr / COARSE_RANGE_STEP_INR) * COARSE_RANGE_STEP_INR;
}

function createTuitionInrFilterRange(bucketMinInr: number): TuitionInrFilterRange {
  const stepInr = getTuitionRangeStepInr(bucketMinInr);
  const minInr = bucketMinInr;
  const maxInr = bucketMinInr + stepInr;
  return {
    minInr,
    maxInr,
    minRub: convertInrToRub(minInr),
    maxRub: convertInrToRub(maxInr),
  };
}

function sortTuitionInrFilterRanges(
  left: TuitionInrFilterRange,
  right: TuitionInrFilterRange,
): number {
  return left.minInr - right.minInr;
}

export function getTuitionInrFilterRanges(
  colleges: ReadonlyArray<College>,
): ReadonlyArray<TuitionInrFilterRange> {
  const rangeByMinInr = new Map<number, TuitionInrFilterRange>();

  for (let index = 0; index < colleges.length; index += 1) {
    const tuition = colleges[index].tuition;
    if (tuition.kind !== "amount") {
      continue;
    }
    const amountInr = convertRubToInr(tuition.amountRub);
    const bucketMinInr = getTuitionBucketMinInr(amountInr);
    if (!rangeByMinInr.has(bucketMinInr)) {
      rangeByMinInr.set(bucketMinInr, createTuitionInrFilterRange(bucketMinInr));
    }
  }

  return Array.from(rangeByMinInr.values()).sort(sortTuitionInrFilterRanges);
}
