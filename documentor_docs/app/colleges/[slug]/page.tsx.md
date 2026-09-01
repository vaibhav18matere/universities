# Documentation Guide for `app/colleges/[slug]/page.tsx`

This document provides a detailed explanation of the `page.tsx` file located at `app/colleges/[slug]/`. This file is a part of a Next.js application and is responsible for rendering the detailed page of a specific college based on the provided slug. The file utilizes various components and functions to display college information, including fees and rankings.

## Purpose

The primary purpose of this file is to generate a detailed page for a college using a dynamic route based on the college's slug. It fetches college data, generates metadata for the page, and renders various sections such as the college's cover image, brochure, rankings, and fee details.

## Key Components and Functions

### Imports

- **Metadata and ReactNode**: Types imported from Next.js and React for type-checking.
- **notFound**: A function from Next.js used to handle cases where a college is not found.
- **Link**: A component from Next.js for client-side navigation.
- **CollegeCoverImage and UniversityBrochureSection**: Custom components for displaying the college's cover image and brochure section.
- **getCollegeBySlug and getCollegeSlugList**: Functions from the `colleges-catalog` library to fetch college data.
- **Formatting Functions**: Functions to format various monetary values into INR.
- **resolveCollegeCountryLabel**: A function to resolve the country label for a college.

### Types

- **CollegeDetailPageProps**: A type defining the props for the `CollegeDetailPage` component, which includes a promise that resolves to an object containing the college slug.

### Functions

#### `generateStaticParams`

- **Purpose**: Generates a list of static parameters for the dynamic routes based on the available college slugs.
- **Returns**: An array of objects, each containing a `slug` key.

#### `generateMetadata`

- **Purpose**: Generates metadata for the college detail page.
- **Parameters**: Accepts `CollegeDetailPageProps`.
- **Returns**: A promise that resolves to a `Metadata` object containing the page title and description. If the college is not found, it returns a title indicating that the university is not found.

#### `FeeBlock`

- **Purpose**: A functional component to render a block of fee information.
- **Parameters**: Accepts `FeeBlockProps` which includes a title and children (ReactNode).
- **Returns**: A styled div containing the title and children.

### `CollegeDetailPage`

- **Purpose**: The default exported asynchronous function component that renders the college detail page.
- **Parameters**: Accepts `CollegeDetailPageProps`.
- **Logic**:
  - Fetches the college data using the provided slug.
  - If the college is not found, it calls the `notFound` function.
  - Renders various sections including:
    - Breadcrumb navigation.
    - College cover image using `CollegeCoverImage`.
    - Header with college name and country label.
    - Brochure section if available.
    - Webometrics ranking section if available.
    - Fee details using the `FeeBlock` component for different fee categories.
  - A sticky footer link to navigate back to the list of all universities.

## How It Works

1. **Dynamic Routing**: The file uses Next.js dynamic routing to render pages based on the college slug provided in the URL.
2. **Data Fetching**: It fetches college data using the `getCollegeBySlug` function and generates a list of slugs using `getCollegeSlugList`.
3. **Metadata Generation**: Metadata for the page is dynamically generated based on the college data.
4. **Conditional Rendering**: The page conditionally renders sections like the brochure and rankings based on the availability of data.
5. **Styling and Layout**: The page uses Tailwind CSS classes for styling and layout, ensuring a responsive and visually appealing design.

This documentation provides a comprehensive overview of the `page.tsx` file, explaining its purpose, components, and functionality without introducing any external or non-existent features.