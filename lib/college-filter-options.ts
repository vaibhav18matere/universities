import type { College } from "./college-types";

function uniqueSortedNumbers(values: ReadonlyArray<number>): ReadonlyArray<number> {
  const set = new Set<number>();
  for (let index = 0; index < values.length; index += 1) {
    set.add(values[index]);
  }
  return Array.from(set).sort((left, right) => left - right);
}

export function getTuitionRubFilterOptions(
  colleges: ReadonlyArray<College>,
): ReadonlyArray<number> {
  const values: number[] = [];
  for (let index = 0; index < colleges.length; index += 1) {
    const tuition = colleges[index].tuition;
    if (tuition.kind === "amount") {
      values.push(Math.round(tuition.amountRub));
    }
  }
  return uniqueSortedNumbers(values);
}
