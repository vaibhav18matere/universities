import type { College } from "./college-types";
import { getRubPerUsd } from "./parse-fees";

export type RubExtent = {
  readonly minRub: number;
  readonly maxRub: number;
};

function accumulateTuitionRubExtent(
  colleges: ReadonlyArray<College>,
): RubExtent | null {
  let minRub: number | null = null;
  let maxRub: number | null = null;

  for (let index = 0; index < colleges.length; index += 1) {
    const college = colleges[index];
    if (college.tuition.kind !== "amount") {
      continue;
    }
    const valueRub = college.tuition.amountRub;
    if (minRub === null || valueRub < minRub) {
      minRub = valueRub;
    }
    if (maxRub === null || valueRub > maxRub) {
      maxRub = valueRub;
    }
  }

  if (minRub === null || maxRub === null) {
    return null;
  }

  return { minRub, maxRub };
}

function accumulateHostelRubExtent(
  colleges: ReadonlyArray<College>,
): RubExtent | null {
  let minRub: number | null = null;
  let maxRub: number | null = null;

  for (let index = 0; index < colleges.length; index += 1) {
    const college = colleges[index];
    if (college.hostel.kind !== "amount") {
      continue;
    }
    const valueRub = college.hostel.amountRub;
    if (minRub === null || valueRub < minRub) {
      minRub = valueRub;
    }
    if (maxRub === null || valueRub > maxRub) {
      maxRub = valueRub;
    }
  }

  if (minRub === null || maxRub === null) {
    return null;
  }

  return { minRub, maxRub };
}

export type ListingFeeExtents = {
  readonly tuition: RubExtent | null;
  readonly hostel: RubExtent | null;
  readonly rubPerUsd: number;
};

export function computeListingFeeExtents(
  colleges: ReadonlyArray<College>,
): ListingFeeExtents {
  return {
    tuition: accumulateTuitionRubExtent(colleges),
    hostel: accumulateHostelRubExtent(colleges),
    rubPerUsd: getRubPerUsd(),
  };
}
