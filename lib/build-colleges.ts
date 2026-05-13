import type { College, CollegeRecord } from "./college-types";
import { ensureUniqueSlug, universityNameToBaseSlug } from "./college-slug";
import { getRubPerUsd, parseMessCharges, parseMoneyField } from "./parse-fees";

export function buildColleges(records: ReadonlyArray<CollegeRecord>): ReadonlyArray<College> {
  const rubPerUsd = getRubPerUsd();
  const slugSet = new Set<string>();
  const colleges: College[] = [];

  for (let index = 0; index < records.length; index += 1) {
    const record = records[index];
    const baseSlug = universityNameToBaseSlug(record.universityName);
    const slug =
      baseSlug.length > 0
        ? ensureUniqueSlug(baseSlug, slugSet)
        : ensureUniqueSlug(`college-${record.id}`, slugSet);

    slugSet.add(slug);

    const tuition = parseMoneyField(record.tuitionFeesRaw, rubPerUsd);
    const hostel = parseMoneyField(record.hostelFeesRaw, rubPerUsd);
    const messCharges = parseMessCharges(record.messChargesRaw);

    colleges.push({
      ...record,
      slug,
      tuition,
      hostel,
      messCharges,
    });
  }

  return colleges;
}
