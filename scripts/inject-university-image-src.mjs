import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");
const mappingPath = path.join(rootDir, "data", "college-cover-image-urls.json");
const universitiesPath = path.join(rootDir, "data", "universities.json");

const mapping = JSON.parse(fs.readFileSync(mappingPath, "utf8"));
if (typeof mapping !== "object" || mapping === null || Array.isArray(mapping)) {
  throw new Error("college-cover-image-urls.json must be an object mapping");
}

const fallback = mapping.__fallback__;
if (typeof fallback !== "string" || fallback.length === 0) {
  throw new Error("college-cover-image-urls.json must include __fallback__");
}

const rows = JSON.parse(fs.readFileSync(universitiesPath, "utf8"));
if (Array.isArray(rows) === false) {
  throw new Error("universities.json must be an array");
}

const nextRows = rows.map((row) => {
  const imageSrc = mapping[row.universityName] ?? fallback;
  return { ...row, imageSrc };
});

fs.writeFileSync(
  universitiesPath,
  `${JSON.stringify(nextRows, null, 2)}\n`,
  "utf8",
);
