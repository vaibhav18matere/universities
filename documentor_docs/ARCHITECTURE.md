# ARCHITECTURE.md

## Overview

This document provides a detailed overview of the architecture of the codebase, focusing on the dependencies and key entities within each file. The codebase is structured around a Next.js application, with a clear separation between application components, pages, and library utilities. The architecture is designed to be modular, allowing for easy maintenance and scalability.

## Core Components

### Configuration

- **`next.config.ts`**: This file contains the configuration for the Next.js application. It does not depend on any other files and serves as the entry point for application configuration.

### Pages

- **`app/layout.tsx`**: Defines the `RootLayout` component, which is the main layout for the application. It depends on several components for theming and site structure, including `ThemeProvider`, `SiteFooter`, `SiteHeader`, and `UniverseBackground`.

- **`app/page.tsx`**: Represents the `HomePage` component, which is the main landing page. It depends on various components and libraries to render sections like `LandingTopUniversitiesSection`, `LandingCountryStripSection`, and `LandingHeroSection`.

- **`app/colleges/[slug]/page.tsx`**: This dynamic page renders the `CollegeDetailPage` and includes functions like `generateStaticParams` and `generateMetadata`. It depends on several libraries and components for data and UI rendering.

- **`app/colleges/[slug]/not-found.tsx`**: Contains the `CollegeNotFound` component, which is displayed when a college is not found.

- **`app/about/page.tsx`**: Contains the `AboutPage` component, which provides information about the application.

- **`app/universities/page.tsx`**: Renders the `UniversitiesHubPage`, depending on the `mega-menu-country-routes` library for navigation.

- **`app/universities/[countryId]/page.tsx`**: This dynamic page renders the `UniversitiesByCountryPage` and includes functions like `generateStaticParams` and `generateMetadata`. It depends on several libraries and components for data and UI rendering.

- **`app/universities/[countryId]/not-found.tsx`**: Contains the `UniversitiesCountryNotFound` component, which is displayed when a university country is not found.

### Components

- **`app/components/SiteHeader.tsx`**: Defines the `SiteHeader` component and various icons used in the header. It depends on the `mega-menu-country-routes` library and other components like `ThemeToggle` and `SiteFooter`.

- **`app/components/ThemeProvider.tsx`**: Provides theming capabilities through the `ThemeProvider` and `useTheme` hook. It depends on the `theme-storage` library.

- **`app/components/UniversityBrochureSection.tsx`**: Contains the `UniversityBrochureSection` component, which does not have any dependencies.

- **`app/components/CollegeDirectory.tsx`**: Defines the `CollegeDirectory` component and related utilities for filtering colleges. It depends on several libraries for data processing and UI rendering.

- **`app/components/SiteFooter.tsx`**: Contains the `SiteFooter` component and various icons used in the footer. It depends on components like `FooterScrollToTop` and `FooterNewsletterForm`.

- **`app/components/ScrollReveal.tsx`**: Provides the `ScrollReveal` component for animations, with no dependencies.

- **`app/components/ThemeToggle.tsx`**: Contains the `ThemeToggle` component, which depends on the `ThemeProvider`.

### Libraries

- **`lib/colleges-catalog.ts`**: Provides functions to retrieve college data, depending on the `build-colleges` library.

- **`lib/inr-display.ts`**: Contains utilities for currency conversion and formatting, depending on the `parse-fees` library.

- **`lib/mega-menu-country-routes.ts`**: Provides utilities for building navigation paths related to universities.

- **`lib/parse-fees.ts`**: Offers functions for parsing and handling fee-related data.

## Mermaid.js Diagram

Below is a Mermaid.js diagram illustrating the core interactions within the codebase:

```mermaid
graph TD;
  next.config.ts -->|Configuration| app/layout.tsx;
  app/layout.tsx -->|Uses| app/components/ThemeProvider.tsx;
  app/layout.tsx -->|Uses| app/components/SiteFooter.tsx;
  app/layout.tsx -->|Uses| app/components/SiteHeader.tsx;
  app/layout.tsx -->|Uses| app/components/UniverseBackground.tsx;
  app/page.tsx -->|Uses| app/components/ScrollReveal.tsx;
  app/page.tsx -->|Uses| app/components/LandingTopUniversitiesSection.tsx;
  app/page.tsx -->|Uses| lib/colleges-catalog.ts;
  app/page.tsx -->|Uses| app/components/LandingCountryStripSection.tsx;
  app/page.tsx -->|Uses| app/components/LandingHeroSection.tsx;
  app/page.tsx -->|Uses| app/components/CollegeDirectory.tsx;
  app/colleges/[slug]/page.tsx -->|Uses| lib/college-country-label.ts;
  app/colleges/[slug]/page.tsx -->|Uses| lib/inr-display.ts;
  app/colleges/[slug]/page.tsx -->|Uses| app/universities/[countryId]/page.tsx;
  app/colleges/[slug]/page.tsx -->|Uses| lib/colleges-catalog.ts;
  app/colleges/[slug]/page.tsx -->|Uses| app/components/UniversityBrochureSection.tsx;
  app/colleges/[slug]/page.tsx -->|Uses| app/components/CollegeCoverImage.tsx;
  app/universities/page.tsx -->|Uses| lib/mega-menu-country-routes.ts;
  app/universities/[countryId]/page.tsx -->|Uses| lib/mega-menu-country-routes.ts;
  app/universities/[countryId]/page.tsx -->|Uses| lib/colleges-catalog.ts;
  app/universities/[countryId]/page.tsx -->|Uses| app/components/CollegeDirectory.tsx;
  app/components/SiteHeader.tsx -->|Uses| lib/mega-menu-country-routes.ts;
  app/components/SiteHeader.tsx -->|Uses| app/components/ThemeToggle.tsx;
  app/components/SiteHeader.tsx -->|Uses| app/components/SiteFooter.tsx;
  app/components/ThemeProvider.tsx -->|Uses| lib/theme-storage.ts;
  app/components/CollegeDirectory.tsx -->|Uses| lib/college-country-label.ts;
  app/components/CollegeDirectory.tsx -->|Uses| lib/inr-display.ts;
  app/components/CollegeDirectory.tsx -->|Uses| lib/filter-colleges.ts;
  app/components/CollegeDirectory.tsx -->|Uses| lib/college-filter-options.ts;
  app/components/CollegeDirectory.tsx -->|Uses| lib/college-country-filter-options.ts;
  app/components/CollegeDirectory.tsx -->|Uses| app/components/CollegeCoverImage.tsx;
  lib/colleges-catalog.ts -->|Uses| lib/build-colleges.ts;
  lib/inr-display.ts -->|Uses| lib/parse-fees.ts;
  lib/college-filter-options.ts -->|Uses| lib/inr-display.ts;
  lib/college-country-filter-options.ts -->|Uses| lib/college-country-label.ts;
  lib/filter-colleges.ts -->|Uses| lib/college-country-label.ts;
  lib/build-colleges.ts -->|Uses| lib/college-slug.ts;
  lib/build-colleges.ts -->|Uses| lib/college-cover-image-urls.ts;
  lib/build-colleges.ts -->|Uses| lib/parse-fees.ts;
```

## Conclusion

This architecture document provides a comprehensive overview of the codebase's structure, highlighting the dependencies and key entities within each file. The modular design ensures that components and libraries are reusable and maintainable, facilitating future development and scalability.