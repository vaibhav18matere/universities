# Documentation Guide for `landing-static.ts`

## Overview

The `landing-static.ts` file is a TypeScript module that exports static data structures used for rendering various components on a landing page. These components include mega menu items for countries, study abroad menu items, top university cards, and media outlet cards. The data is structured in a way that can be easily consumed by a front-end application to display information dynamically.

## Key Components

### Imports

The file imports TypeScript types from `@/lib/landing-types`. These types are used to ensure that the data structures conform to expected shapes, providing type safety and reducing potential runtime errors.

- `MediaOutletCard`
- `MegaMenuCountryItem`
- `StudyAbroadMenuItem`
- `TopUniversityCard`

### Exported Constants

The file exports four main constants, each representing a different set of data:

1. **`megaMenuCountries`**

   - **Type**: `ReadonlyArray<MegaMenuCountryItem>`
   - **Description**: An array of objects representing countries available in the mega menu. Each object contains:
     - `id`: A unique identifier for the country.
     - `label`: The display name of the country.
     - `flagEmoji`: An emoji representing the country's flag.

   ```typescript
   export const megaMenuCountries: ReadonlyArray<MegaMenuCountryItem> = [
     { id: "russia", label: "Russia", flagEmoji: "🇷🇺" },
     { id: "georgia", label: "Georgia", flagEmoji: "🇬🇪" },
     { id: "kazakhstan", label: "Kazakhstan", flagEmoji: "🇰🇿" },
     { id: "uzbekistan", label: "Uzbekistan", flagEmoji: "🇺🇿" },
     { id: "egypt", label: "Egypt", flagEmoji: "🇪🇬" },
   ];
   ```

2. **`studyAbroadMenuItems`**

   - **Type**: `ReadonlyArray<StudyAbroadMenuItem>`
   - **Description**: An array of objects representing menu items related to studying abroad. Each object contains:
     - `id`: A unique identifier for the menu item.
     - `label`: The display name of the menu item.
     - `href`: A URL or anchor link associated with the menu item.

   ```typescript
   export const studyAbroadMenuItems: ReadonlyArray<StudyAbroadMenuItem> = [
     { id: "mbbs", label: "MBBS abroad", href: "/#directory" },
     { id: "fees", label: "Fees & hostel", href: "/#directory" },
   ];
   ```

3. **`topUniversityCards`**

   - **Type**: `ReadonlyArray<TopUniversityCard>`
   - **Description**: An array of objects representing top universities. Each object contains:
     - `id`: A unique identifier for the university.
     - `name`: The name of the university.
     - `imageSrc`: A URL to an image representing the university.
     - `imageAlt`: Alternative text for the image, describing its content.

   ```typescript
   export const topUniversityCards: ReadonlyArray<TopUniversityCard> = [
     {
       id: "perm",
       name: "Perm State Medical University",
       imageSrc:
         "https://images.unsplash.com/photo-1564981797816-1049734bb820?auto=format&fit=crop&w=800&q=80",
       imageAlt: "Historic university building with columns",
     },
     {
       id: "orenburg",
       name: "Orenburg State Medical University",
       imageSrc:
         "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
       imageAlt: "University campus courtyard",
     },
     {
       id: "mari",
       name: "Mari State University",
       imageSrc:
         "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
       imageAlt: "Graduation ceremony at a university",
     },
   ];
   ```

4. **`mediaOutletCards`**

   - **Type**: `ReadonlyArray<MediaOutletCard>`
   - **Description**: An array of objects representing media outlets. Each object contains:
     - `id`: A unique identifier for the media outlet.
     - `title`: The name of the media outlet.
     - `subtitle`: A brief description or tagline of the media outlet.
     - `accentClassName`: A CSS class name for styling purposes.

   ```typescript
   export const mediaOutletCards: ReadonlyArray<MediaOutletCard> = [
     {
       id: "dainik",
       title: "दैनिक भास्कर",
       subtitle: "Dainik Bhaskar",
       accentClassName: "bg-amber-400",
     },
     {
       id: "collegedunia",
       title: "collegedunia",
       subtitle: "College search & reviews",
       accentClassName: "bg-sky-500",
     },
     {
       id: "toi",
       title: "THE TIMES OF INDIA",
       subtitle: "National daily",
       accentClassName: "bg-slate-800",
     },
   ];
   ```

## How It Works

The `landing-static.ts` file provides static data that can be imported and used in other parts of a web application. By exporting these constants, the file allows developers to easily access and render consistent information across different components of a landing page. The use of TypeScript types ensures that the data adheres to a specific structure, promoting maintainability and reducing errors.