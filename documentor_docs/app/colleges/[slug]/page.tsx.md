# Documentation Guide for `app/colleges/[slug]/page.tsx`

This document provides a detailed explanation of the `page.tsx` file located at `app/colleges/[slug]/`. This file is a part of a Next.js application and is responsible for rendering the detailed page of a specific college based on the provided slug. The file utilizes various components and functions to display college information, including fees and rankings.

## Purpose

The primary purpose of this file is to render a detailed page for a specific college. It fetches college data based on a slug parameter and displays various details such as the college's name, fees, rankings, and other relevant information.

## Key Components and Functions

### Imports

- **Metadata and ReactNode**: Types imported from Next.js and React, respectively, for type definitions.
- **notFound**: A function from Next.js used to handle cases where a college is not found.
- **Link**: A component from Next.js for client-side navigation.
- **CollegeCoverImage and UniversityBrochureSection**: Custom components used to display the college's cover image and brochure section.
- **getCollegeBySlug and getCollegeSlugList**: Functions from the `colleges-catalog` library to fetch college data.
- **Formatting Functions**: Functions from the `inr-display` library to format various monetary values into INR.
- **resolveCollegeCountryLabel**: A function to resolve and display the college's country label.

### Types

- **CollegeDetailPageProps**: A type defining the props for the `CollegeDetailPage` component, which includes a `params` promise containing a `slug`.

### Functions

#### `generateStaticParams`

- **Purpose**: Generates a list of static parameters for pre-rendering pages at build time.
- **Returns**: An array of objects, each containing a `slug` property.

#### `generateMetadata`

- **Purpose**: Generates metadata for the college detail page.
- **Parameters**: Accepts `CollegeDetailPageProps`.
- **Returns**: A promise that resolves to a `Metadata` object containing the page title and description. If the college is not found, it returns a title indicating that the university is not found.

#### `FeeBlock`

- **Purpose**: A functional component to display a block of fee information.
- **Props**: Accepts `title` and `children` as props.
- **Returns**: A styled `div` containing the title and children elements.

### `CollegeDetailPage` Component

- **Purpose**: The default exported asynchronous function component that renders the college detail page.
- **Parameters**: Accepts `CollegeDetailPageProps`.
- **Logic**:
  - Fetches the college data using the `slug` from `props.params`.
  - If the college is not found, it calls the `notFound` function.
  - Renders various sections of the page, including:
    - Breadcrumb navigation.
    - College cover image using `CollegeCoverImage`.
    - College name and country label.
    - Optional brochure section using `UniversityBrochureSection`.
    - Optional Webometrics ranking section.
    - Fee details using the `FeeBlock` component for each fee type.
    - A sticky footer link to navigate back to the list of all universities.

## How It Works

1. **Static Params Generation**: The `generateStaticParams` function is used to pre-generate pages for each college based on their slugs during the build process.

2. **Metadata Generation**: The `generateMetadata` function provides dynamic metadata for each college page, enhancing SEO and providing meaningful page titles and descriptions.

3. **Data Fetching and Rendering**: The `CollegeDetailPage` component fetches the college data using the provided slug. It conditionally renders various sections based on the availability of data, such as the brochure and rankings.

4. **Styling and Layout**: The page uses Tailwind CSS classes for styling, ensuring a responsive and visually appealing layout.

This file is a crucial part of the application, providing users with detailed information about each college in a structured and user-friendly manner.