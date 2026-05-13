import type { College, CollegeRecord } from "./college-types";
import { buildColleges } from "./build-colleges";
import universitiesJson from "../data/universities.json";

const records = universitiesJson as ReadonlyArray<CollegeRecord>;

export function getAllColleges(): ReadonlyArray<College> {
  return buildColleges(records);
}

export function getCollegeBySlug(slug: string): College | undefined {
  const colleges = getAllColleges();
  for (let index = 0; index < colleges.length; index += 1) {
    const college = colleges[index];
    if (college.slug === slug) {
      return college;
    }
  }
  return undefined;
}

export function getCollegeSlugList(): ReadonlyArray<string> {
  return getAllColleges().map((college) => college.slug);
}
