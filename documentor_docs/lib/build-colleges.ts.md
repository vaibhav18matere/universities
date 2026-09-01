# Documentation Guide for `lib/build-colleges.ts`

## Overview

The `lib/build-colleges.ts` file is a TypeScript module designed to process and transform an array of college records into a structured format suitable for further use. The primary function in this module, `buildColleges`, takes raw college data and enriches it with additional computed properties such as unique slugs, parsed financial information, and resolved image sources.

## Key Components

### Imports

- **Types**:
  - `College`, `CollegeRecord`: These types are imported from `./college-types` and are used to define the structure of college data before and after processing.

- **Functions and Constants**:
  - `COLLEGE_COVER_IMAGE_URLS`, `getLocalCollegeImageUrl`: Imported from `./college-cover-image-urls`, these are used to resolve the image source for each college.
  - `ensureUniqueSlug`, `universityNameToBaseSlug`: Imported from `./college-slug`, these functions are used to generate unique slugs for each college.
  - `getRubPerUsd`, `parseMessCharges`, `parseMoneyField`: Imported from `./parse-fees`, these functions are used to handle currency conversion and parsing of financial fields.

### Functions

#### `resolveCollegeImageSrc`

- **Purpose**: Determines the appropriate image source for a college record.
- **Parameters**:
  - `record: CollegeRecord`: The college record for which the image source is being resolved.
  - `rowIndex: number`: The index of the current record in the array, used for fallback image selection.
- **Returns**: A `string` representing the URL of the image source.
- **Logic**:
  1. Attempts to get a local image URL using `getLocalCollegeImageUrl`.
  2. If a local image is not found, checks if the `imageSrc` field in the record is non-empty and uses it.
  3. If neither is available, selects a fallback image from `COLLEGE_COVER_IMAGE_URLS` based on the `rowIndex`.

#### `buildColleges`

- **Purpose**: Transforms an array of `CollegeRecord` into an array of `College` with additional computed properties.
- **Parameters**:
  - `records: ReadonlyArray<CollegeRecord>`: An array of college records to be processed.
- **Returns**: A `ReadonlyArray<College>` containing the processed college data.
- **Logic**:
  1. Retrieves the current exchange rate using `getRubPerUsd`.
  2. Initializes a `Set` to track unique slugs.
  3. Iterates over each `CollegeRecord`:
     - Generates a base slug from the university name using `universityNameToBaseSlug`.
     - Ensures the slug is unique using `ensureUniqueSlug`.
     - Parses financial fields (`tuitionFeesRaw`, `hostelFeesRaw`, `messChargesRaw`) using `parseMoneyField` and `parseMessCharges`.
     - Resolves the image source using `resolveCollegeImageSrc`.
     - Constructs a `College` object with the enriched data and adds it to the `colleges` array.
  4. Returns the array of processed `College` objects.

## Usage

The `buildColleges` function is intended to be used in scenarios where raw college data needs to be transformed into a more structured and enriched format. This includes generating unique identifiers, handling currency conversions, and ensuring each college has an appropriate image representation.

## Conclusion

The `lib/build-colleges.ts` module provides a robust mechanism for processing college data, ensuring that each record is uniquely identifiable and enriched with necessary computed properties. This functionality is crucial for applications that require organized and detailed college information.