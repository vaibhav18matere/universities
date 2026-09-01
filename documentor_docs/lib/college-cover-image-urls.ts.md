# Documentation Guide for `lib/college-cover-image-urls.ts`

## Overview

The `lib/college-cover-image-urls.ts` file is a TypeScript module designed to manage and provide URLs for college cover images. It handles both local images stored in a public directory and external image URLs sourced from a JSON file. The module ensures that image URLs are accessible and normalized for consistent usage across an application.

## Key Components

### Imports

- **`fs`**: Node.js File System module used for interacting with the file system, specifically to check for directory existence and read directory contents.
- **`path`**: Node.js Path module used for handling and transforming file paths.
- **`collegeCoverImageUrls`**: Imported JSON data containing external college cover image URLs.

### Constants

- **`PUBLIC_COLLEGE_IMAGE_DIR`**: A constant that defines the path to the directory where local college images are stored. It uses the current working directory and appends the path to the `public/images` directory.
  
- **`SUPPORTED_IMAGE_EXTENSIONS`**: An array of strings listing the supported image file extensions. This ensures that only files with these extensions are considered as valid image files.

### Functions

- **`normalizeCollegeName(value: string): string`**: 
  - Purpose: Normalizes a given college name by converting it to lowercase, trimming whitespace, replacing non-alphanumeric characters with hyphens, and removing leading or trailing hyphens.
  - Usage: This function is used to create a consistent key format for mapping college names to their respective image URLs.

### Variables

- **`LOCAL_COLLEGE_IMAGE_URLS`**: 
  - Type: `ReadonlyArray<string>`
  - Description: An array of URLs for local college images. It is populated by reading the `PUBLIC_COLLEGE_IMAGE_DIR` and filtering files based on the supported image extensions. If the directory does not exist, it defaults to an empty array.

- **`LOCAL_COLLEGE_IMAGE_URL_MAP`**: 
  - Type: `Map<string, string>`
  - Description: A map that associates normalized college names with their corresponding local image URLs. It is constructed similarly to `LOCAL_COLLEGE_IMAGE_URLS`, but maps each file name (normalized) to its URL path.

- **`COLLEGE_COVER_IMAGE_URLS`**: 
  - Type: `ReadonlyArray<string>`
  - Description: A consolidated array of college cover image URLs. It prioritizes local image URLs (`LOCAL_COLLEGE_IMAGE_URLS`) if available; otherwise, it falls back to the external URLs from `collegeCoverImageUrls`.

### Exported Functions

- **`getLocalCollegeImageUrl(universityName: string): string | undefined`**: 
  - Purpose: Retrieves the local image URL for a given university name. It normalizes the university name and looks it up in the `LOCAL_COLLEGE_IMAGE_URL_MAP`.
  - Returns: The URL of the local college image if found; otherwise, `undefined`.

## How It Works

1. **Directory and File Handling**: The module first checks if the `PUBLIC_COLLEGE_IMAGE_DIR` exists. If it does, it reads the directory contents and filters the files to include only those with supported image extensions.

2. **Normalization**: College names are normalized to ensure consistent mapping and retrieval of image URLs.

3. **URL Mapping**: 
   - Local image URLs are stored in `LOCAL_COLLEGE_IMAGE_URLS`.
   - A map of normalized college names to local image URLs is created in `LOCAL_COLLEGE_IMAGE_URL_MAP`.

4. **URL Consolidation**: The `COLLEGE_COVER_IMAGE_URLS` array is populated with local image URLs if available; otherwise, it uses the external URLs from the JSON data.

5. **Image URL Retrieval**: The `getLocalCollegeImageUrl` function allows for the retrieval of a local image URL based on a given university name, utilizing the normalization process for accurate mapping.

This module provides a robust mechanism for managing and accessing college cover image URLs, supporting both local and external sources.