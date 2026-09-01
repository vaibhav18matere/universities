# Documentation Guide for `lib/build-colleges.ts`

## Overview

The `lib/build-colleges.ts` file is a TypeScript module designed to process and transform an array of college records into a structured format suitable for further use. The primary function in this module, `buildColleges`, takes raw college data and enriches it with additional computed properties such as unique slugs, parsed financial information, and resolved image sources.

## Key Components

### Imports

- **Types**: 
  - `College` and `CollegeRecord` are imported from `./college-types`. These types define the structure of the college data before and after processing.
  
- **Utilities**:
  - `COLLEGE_COVER_IMAGE_URLS` and `getLocalCollegeImageUrl` from `./college-cover-image-urls` are used to resolve image URLs for colleges.
  - `ensureUniqueSlug` and `universityNameToBaseSlug` from `./college-slug` are used to generate unique slugs for each college.
  - `getRubPerUsd`, `parseMessCharges`, and `parseMoneyField` from `./parse-fees` are used to handle financial data conversion and parsing.

### Functions

#### `resolveCollegeImageSrc`

- **Purpose**: Determines the appropriate image source URL for a college.
- **Parameters**:
  - `record: CollegeRecord`: The college record containing raw data.
  - `rowIndex: number`: The index of the current record in the array.
- **Returns**: A `string` representing the resolved image URL.
- **Logic**:
  1. Attempts to get a local image URL using `getLocalCollegeImageUrl`.
  2. If a local image is not found, checks if the `imageSrc` field in the record is non-empty and uses it.
  3. If neither is available, defaults to a URL from `COLLEGE_COVER_IMAGE_URLS`, cycling through the array based on the `rowIndex`.

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

This module is intended to be used in scenarios where raw college data needs to be transformed into a more structured and enriched format. It handles tasks such as slug generation, financial data parsing, and image URL resolution, making it a comprehensive solution for preparing college data for display or further processing.