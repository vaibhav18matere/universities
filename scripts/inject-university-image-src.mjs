import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");
const poolPath = path.join(rootDir, "data", "college-cover-image-urls.json");
const universitiesPath = path.join(rootDir, "data", "universities.json");

const pool = JSON.parse(fs.readFileSync(poolPath, "utf8"));
if (Array.isArray(pool) === false || pool.length === 0) {
  throw new Error("college-cover-image-urls.json must be a non-empty array");
}

const rows = JSON.parse(fs.readFileSync(universitiesPath, "utf8"));
if (Array.isArray(rows) === false) {
  throw new Error("universities.json must be an array");
}

const nextRows = rows.map((row, index) => {
  const imageSrc = pool[index % pool.length];
  return { ...row, imageSrc };
});

fs.writeFileSync(
  universitiesPath,
  `${JSON.stringify(nextRows, null, 2)}\n`,
  "utf8",
);
