import fs from "fs";
import path from "path";
import collegeCoverImageUrls from "../data/college-cover-image-urls.json";

const PUBLIC_COLLEGE_IMAGE_DIR = path.join(process.cwd(), "public", "images");
const SUPPORTED_IMAGE_EXTENSIONS = [
  ".avif",
  ".webp",
  ".png",
  ".jpg",
  ".jpeg",
  ".svg",
];

function normalizeCollegeName(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const LOCAL_COLLEGE_IMAGE_URLS: ReadonlyArray<string> = fs.existsSync(
  PUBLIC_COLLEGE_IMAGE_DIR,
)
  ? fs
      .readdirSync(PUBLIC_COLLEGE_IMAGE_DIR)
      .filter((file) =>
        SUPPORTED_IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase()),
      )
      .map((file) => `/images/${file}`)
  : [];

const LOCAL_COLLEGE_IMAGE_URL_MAP = fs.existsSync(PUBLIC_COLLEGE_IMAGE_DIR)
  ? new Map(
      fs
        .readdirSync(PUBLIC_COLLEGE_IMAGE_DIR)
        .filter((file) =>
          SUPPORTED_IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase()),
        )
        .map((file) => [
          normalizeCollegeName(path.parse(file).name),
          `/images/${file}`,
        ]),
    )
  : new Map<string, string>();

export const COLLEGE_COVER_IMAGE_URLS: ReadonlyArray<string> =
  LOCAL_COLLEGE_IMAGE_URLS.length > 0
    ? LOCAL_COLLEGE_IMAGE_URLS
    : collegeCoverImageUrls;

export function getLocalCollegeImageUrl(
  universityName: string,
): string | undefined {
  return LOCAL_COLLEGE_IMAGE_URL_MAP.get(normalizeCollegeName(universityName));
}
