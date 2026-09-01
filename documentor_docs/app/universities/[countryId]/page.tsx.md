# Documentation Guide for `app/universities/[countryId]/page.tsx`

This document provides a detailed explanation of the `page.tsx` file located at `app/universities/[countryId]/`. This file is a part of a Next.js application and is responsible for rendering a page that displays a list of universities for a specific country, identified by `countryId`.

## Purpose

The primary purpose of this file is to generate a dynamic page that lists universities for a given country. The page is dynamically generated based on the `countryId` parameter, which is part of the URL path. It utilizes server-side rendering to fetch and display data related to universities in the specified country.

## Key Components

### Imports

- **`Metadata`**: A type imported from "next" used for defining metadata for the page.
- **`Link`**: A component from "next/link" used for client-side navigation.
- **`notFound`**: A function from "next/navigation" used to handle cases where a country is not found.
- **`CollegeDirectory`**: A component imported from "@/app/components/CollegeDirectory" that is used to display the list of colleges.
- **`getAllColleges`**: A function from "@/lib/colleges-catalog" that retrieves all colleges.
- **`buildUniversitiesHubPath`, `findMegaMenuCountryByRouteId`, `listMegaMenuCountryRouteParams`**: Functions from "@/lib/mega-menu-country-routes" used for handling country routes and paths.

### Types

- **`UniversitiesByCountryPageProps`**: A type defining the props for the page component. It includes a `params` property, which is a promise resolving to an object containing `countryId`.

### Functions

#### `generateStaticParams`

- **Purpose**: Generates an array of static parameters for the page. This is used by Next.js to pre-render pages at build time.
- **Returns**: An array of objects, each containing a `countryId`.

#### `generateMetadata`

- **Purpose**: Generates metadata for the page based on the `countryId`.
- **Parameters**: 
  - `props`: An object of type `UniversitiesByCountryPageProps`.
- **Returns**: A promise that resolves to a `Metadata` object containing the page title and description. If the country is not found, it returns a title indicating "Country not found".

#### `UniversitiesByCountryPage`

- **Purpose**: The default exported asynchronous function that renders the page.
- **Parameters**: 
  - `props`: An object of type `UniversitiesByCountryPageProps`.
- **Functionality**:
  - Extracts `countryId` from `props.params`.
  - Uses `findMegaMenuCountryByRouteId` to find the country details based on `countryId`.
  - If the country is not found, it calls `notFound()` to handle the error.
  - Retrieves all colleges using `getAllColleges()`.
  - Renders a section containing:
    - A breadcrumb navigation using `Link` components.
    - A header displaying the country's flag emoji and name.
    - A description of the page.
    - The `CollegeDirectory` component to list colleges, with `colleges` and `fixedCountryLabel` props.

## How It Works

1. **Static Parameters Generation**: The `generateStaticParams` function is used to define which country pages should be pre-rendered at build time by returning a list of `countryId` parameters.

2. **Metadata Generation**: The `generateMetadata` function dynamically creates metadata for the page based on the `countryId`. It sets the page title and description, providing context about the universities listed.

3. **Page Rendering**: The `UniversitiesByCountryPage` function is responsible for rendering the page. It checks if the country exists, retrieves the list of colleges, and displays them using the `CollegeDirectory` component. The page includes a breadcrumb navigation and a header with the country's details.

This file leverages Next.js features such as dynamic routing, server-side rendering, and metadata management to create a dynamic and SEO-friendly page for listing universities by country.