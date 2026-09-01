# Documentation Guide for `lib/landing-static.ts`

This document provides a detailed explanation of the `lib/landing-static.ts` file, which is part of a TypeScript project. This file is responsible for exporting static data structures used in a landing page, specifically for a website that deals with study abroad programs and media outlets.

## Purpose

The primary purpose of the `lib/landing-static.ts` file is to define and export static arrays of objects that represent various entities such as countries, study abroad menu items, top universities, and media outlets. These data structures are likely used to populate UI components on a landing page.

## Key Components

The file consists of four main exported constants, each representing a different set of data:

1. **`megaMenuCountries`**: An array of countries with associated metadata for a mega menu.
2. **`studyAbroadMenuItems`**: An array of menu items related to studying abroad.
3. **`topUniversityCards`**: An array of top universities with associated metadata.
4. **`mediaOutletCards`**: An array of media outlets with associated metadata.

### Detailed Explanation

#### 1. `megaMenuCountries`

- **Type**: `ReadonlyArray<MegaMenuCountryItem>`
- **Description**: This array contains objects representing countries that are likely displayed in a mega menu on the landing page.
- **Structure**:
  - `id`: A unique identifier for the country.
  - `label`: The display name of the country.
  - `flagEmoji`: An emoji representing the country's flag.

- **Example**:
  ```typescript
  { id: "russia", label: "Russia", flagEmoji: "🇷🇺" }
  ```

#### 2. `studyAbroadMenuItems`

- **Type**: `ReadonlyArray<StudyAbroadMenuItem>`
- **Description**: This array contains objects representing menu items related to studying abroad.
- **Structure**:
  - `id`: A unique identifier for the menu item.
  - `label`: The display name of the menu item.
  - `href`: A hyperlink reference, likely used for navigation.

- **Example**:
  ```typescript
  { id: "mbbs", label: "MBBS abroad", href: "/#directory" }
  ```

#### 3. `topUniversityCards`

- **Type**: `ReadonlyArray<TopUniversityCard>`
- **Description**: This array contains objects representing top universities, likely displayed as cards on the landing page.
- **Structure**:
  - `id`: A unique identifier for the university.
  - `name`: The name of the university.
  - `imageSrc`: A URL to an image representing the university.
  - `imageAlt`: Alternative text for the image, describing its content.

- **Example**:
  ```typescript
  {
    id: "perm",
    name: "Perm State Medical University",
    imageSrc: "https://images.unsplash.com/photo-1564981797816-1049734bb820?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Historic university building with columns"
  }
  ```

#### 4. `mediaOutletCards`

- **Type**: `ReadonlyArray<MediaOutletCard>`
- **Description**: This array contains objects representing media outlets, likely displayed as cards on the landing page.
- **Structure**:
  - `id`: A unique identifier for the media outlet.
  - `title`: The title of the media outlet.
  - `subtitle`: A subtitle or description of the media outlet.
  - `accentClassName`: A CSS class name for styling purposes.

- **Example**:
  ```typescript
  {
    id: "dainik",
    title: "दैनिक भास्कर",
    subtitle: "Dainik Bhaskar",
    accentClassName: "bg-amber-400"
  }
  ```

## How It Works

The file imports type definitions from `@/lib/landing-types`, which are used to ensure that the objects in the arrays conform to expected structures. Each exported constant is a `ReadonlyArray`, indicating that the arrays are immutable and should not be modified after their initial definition. This immutability is beneficial for maintaining consistent data throughout the application.

These data structures are likely used in the front-end of the application to render components such as menus, cards, and lists on a landing page, providing users with information about study abroad opportunities and media outlets.

## Conclusion

The `lib/landing-static.ts` file is a crucial part of the application, providing static data for rendering various components on a landing page. By defining these data structures as `ReadonlyArray`, the file ensures data integrity and consistency across the application.