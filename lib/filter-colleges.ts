import type { College, CollegeFilterState, ParsedMoneyField } from "./college-types";

function matchesSearch(college: College, query: string): boolean {
  if (query.length === 0) {
    return true;
  }
  return college.universityName.toLowerCase().includes(query.toLowerCase());
}

function inNumberRange(
  value: number,
  minValue: number | null,
  maxValue: number | null,
): boolean {
  if (minValue !== null && value < minValue) {
    return false;
  }
  if (maxValue !== null && value > maxValue) {
    return false;
  }
  return true;
}

function inRubRange(
  valueRub: number,
  minRub: number | null,
  maxRub: number | null,
): boolean {
  return inNumberRange(valueRub, minRub, maxRub);
}

function matchesMoneyRange(
  field: ParsedMoneyField,
  minRub: number | null,
  maxRub: number | null,
): boolean {
  const rangeActive = minRub !== null || maxRub !== null;
  if (!rangeActive) {
    return true;
  }
  if (field.kind === "not_available") {
    return false;
  }
  return inRubRange(field.amountRub, minRub, maxRub);
}

export function filterColleges(
  colleges: ReadonlyArray<College>,
  filters: CollegeFilterState,
): ReadonlyArray<College> {
  return colleges.filter((college) => {
    if (!matchesSearch(college, filters.searchQuery)) {
      return false;
    }
    if (
      !matchesMoneyRange(
        college.tuition,
        filters.tuitionMinRub,
        filters.tuitionMaxRub,
      )
    ) {
      return false;
    }
    if (
      !matchesMoneyRange(
        college.hostel,
        filters.hostelMinRub,
        filters.hostelMaxRub,
      )
    ) {
      return false;
    }
    return true;
  });
}
