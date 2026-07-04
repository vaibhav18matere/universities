import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");
const sourceImagesDir = path.join(rootDir, "data", "images");
const publicImagesDir = path.join(rootDir, "public", "images", "universities");
const mappingPath = path.join(rootDir, "data", "college-cover-image-urls.json");
const universitiesPath = path.join(rootDir, "data", "universities.json");

/** Explicit matches for filenames with typos or abbreviated names. */
const MANUAL_UNIVERSITY_TO_FILENAME = {
  "Irkutsk State Medical University": "lrkutsk state medical university_.webp",
  "Tver State Medical University": "Tver-State-Medical-Unvieristy-MBBS-Fee.jpeg",
  "Orel State Medical University": "orel-state-university-banner-570x500.jpg",
  "Sechenov First Moscow State Medical University":
    "First moscow State University.jpeg",
  "Ivanovo State Medical University": "Ivanovo-State-Medical-Academy.webp",
  "North Caucasian State Medical Academy":
    "North-Caucasian-State-Academy-1-1024x636.webp",
  "Voronezh State Medical University": "Voronezh-Medical-university-Russia.jpg",
  "Pirogov Russian National Research Medical University":
    "Pirogov Russian National Research Center.jpg",
  "Saint Petersburg State Pediatric Medical University":
    "Saint-Petersburg-Pediatric-Medical-01.webp",
  "MEPHI National Research Nuclear University":
    " MEPhI National Research Nuclear University.webp",
  "Tbilisi State Medical University": "Tblisi State Medical University.jpeg",
  "Bukhara State Medical University":
    "bukhara_state_medical_institute1_f3ae66fb3a.avif",
  "Caucasus University": "Caucasus International University.jpeg",
  "Free University of Tbilisi": "European University.jpg",
  "International Medical University": "International Medical University.jpeg",
  "Central Asian International Medical University (CAIMU)":
    "Central Asian International Medical University (CAIMU).jpeg",
  "Georgian Technical University": "Georgian-American-University-GAU-Georgia.webp",
  "Cairo University, Cairo": "1-Cairo-University.webp",
  "Kazakh National Medical University":
    "Al-Farabi-Kazakh-National-Medical-University-300x155.jpg",
  "Al-Farabi Kazakh National University":
    "Kazakh National Medical University.jpeg",
};

/** Universities with no matching image in data/images — keep default cover. */
const EXPLICIT_FALLBACK_UNIVERSITIES = new Set([
  "Kursk State Medical University",
  "Dagestan State Medical University",
  "ISM (Easy Cool)",
  "Agricultural University of Georgia",
]);

const DEFAULT_COVER_IMAGE_SRC = "/images/default-university-cover.svg";

function normalize(value) {
  return value
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function keywords(value) {
  const stopWords = new Set([
    "state",
    "medical",
    "university",
    "national",
    "research",
    "federal",
    "named",
    "after",
    "the",
    "of",
    "russia",
    "first",
    "academy",
    "institute",
    "center",
    "centre",
  ]);

  return normalize(value)
    .split(" ")
    .filter((word) => word.length > 2 && stopWords.has(word) === false);
}

function scoreMatch(universityName, fileName) {
  const universityNorm = normalize(universityName);
  const fileNorm = normalize(path.parse(fileName).name);

  if (fileNorm.includes(universityNorm) || universityNorm.includes(fileNorm)) {
    return 100;
  }

  const universityKeywords = keywords(universityName);
  const fileKeywords = keywords(fileName);

  if (universityKeywords.length === 0 || fileKeywords.length === 0) {
    return 0;
  }

  let matchedCount = 0;
  for (const universityKeyword of universityKeywords) {
    for (const fileKeyword of fileKeywords) {
      if (
        universityKeyword === fileKeyword ||
        universityKeyword.includes(fileKeyword) ||
        fileKeyword.includes(universityKeyword)
      ) {
        matchedCount += 1;
        break;
      }
    }
  }

  return (matchedCount / Math.max(universityKeywords.length, fileKeywords.length)) * 100;
}

function toPublicImagePath(fileName) {
  return `/images/universities/${encodeURIComponent(fileName.trim())}`;
}

function findBestImageFile(universityName, imageFiles, usedFiles) {
  const manualFileName = MANUAL_UNIVERSITY_TO_FILENAME[universityName];
  if (manualFileName !== undefined && imageFiles.includes(manualFileName)) {
    return manualFileName;
  }

  let bestFileName = null;
  let bestScore = 0;

  for (const fileName of imageFiles) {
    if (usedFiles.has(fileName)) {
      continue;
    }

    const score = scoreMatch(universityName, fileName);
    if (score > bestScore) {
      bestScore = score;
      bestFileName = fileName;
    }
  }

  if (bestScore >= 50) {
    return bestFileName;
  }

  return null;
}

function copyImageFiles(sourceDir, destinationDir) {
  fs.mkdirSync(destinationDir, { recursive: true });

  const sourceFiles = fs.readdirSync(sourceDir);
  for (const sourceFile of sourceFiles) {
    const sourcePath = path.join(sourceDir, sourceFile);
    if (fs.statSync(sourcePath).isFile() === false) {
      continue;
    }

    const trimmedFileName = sourceFile.trim();
    const destinationPath = path.join(destinationDir, trimmedFileName);
    fs.copyFileSync(sourcePath, destinationPath);
  }

  return sourceFiles.filter((fileName) =>
    fs.statSync(path.join(sourceDir, fileName)).isFile(),
  );
}

function buildMapping(universityNames, imageFiles) {
  const usedFiles = new Set();
  const mapping = {};
  const unmatched = [];

  for (const universityName of universityNames) {
    if (EXPLICIT_FALLBACK_UNIVERSITIES.has(universityName)) {
      unmatched.push(universityName);
      continue;
    }

    const fileName = findBestImageFile(universityName, imageFiles, usedFiles);
    if (fileName === null) {
      unmatched.push(universityName);
      continue;
    }

    usedFiles.add(fileName);
    mapping[universityName] = toPublicImagePath(fileName);
  }

  mapping.__fallback__ = DEFAULT_COVER_IMAGE_SRC;

  return { mapping, unmatched, usedFiles };
}

const imageFiles = copyImageFiles(sourceImagesDir, publicImagesDir);
const universities = JSON.parse(fs.readFileSync(universitiesPath, "utf8"));

if (Array.isArray(universities) === false) {
  throw new Error("universities.json must be an array");
}

const universityNames = universities.map((row) => row.universityName);
const { mapping, unmatched, usedFiles } = buildMapping(universityNames, imageFiles);

fs.writeFileSync(mappingPath, `${JSON.stringify(mapping, null, 2)}\n`, "utf8");

console.log(`Mapped ${Object.keys(mapping).length - 1} universities to local images.`);
console.log(`Fallback image: ${mapping.__fallback__}`);
console.log(`Unmatched universities (${unmatched.length}):`);
for (const name of unmatched) {
  console.log(`  - ${name}`);
}

const unusedFiles = imageFiles.filter((fileName) => usedFiles.has(fileName) === false);
console.log(`Unused image files (${unusedFiles.length}):`);
for (const fileName of unusedFiles) {
  console.log(`  - ${fileName}`);
}
