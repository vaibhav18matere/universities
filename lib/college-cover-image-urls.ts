import collegeCoverImageMapping from "../data/college-cover-image-urls.json";

type CollegeCoverImageMapping = Record<string, string> & {
  readonly __fallback__: string;
};

const mapping = collegeCoverImageMapping as CollegeCoverImageMapping;

export function resolveCollegeCoverImageSrc(universityName: string): string {
  const fromMapping = mapping[universityName];
  if (fromMapping !== undefined && fromMapping.length > 0) {
    return fromMapping;
  }

  return mapping.__fallback__;
}
