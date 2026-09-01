# ARCHITECTURE.md

## Overview

This document provides a detailed overview of the architecture of the codebase, focusing on the dependencies and key entities within each file. The codebase is structured around a Next.js application with various components and libraries that interact to form the complete system. The architecture is visualized using a Mermaid.js diagram to illustrate the core interactions between the components.

## Core Components

### Configuration

- **`next.config.ts`**: This file contains the configuration for the Next.js application. It does not depend on any other files.

### Pages

- **`app/layout.tsx`**: Defines the `RootLayout` component, which depends on several components for the site's layout, including the header, footer, theme provider, and background.

- **`app/page.tsx`**: Represents the `HomePage` component, which includes sections for top universities, country strips, and a hero section. It also utilizes a college directory and scroll reveal functionality.

- **`app/colleges/[slug]/page.tsx`**: This dynamic page component, `CollegeDetailPage`, handles college details and depends on various libraries and components for metadata generation, fee display, and college information.

- **`app/colleges/[slug]/not-found.tsx`**: Contains the `CollegeNotFound` component, which does not have any dependencies.

- **`app/about/page.tsx`**: Represents the `AboutPage` component with no dependencies.

- **`app/universities/page.tsx`**: The `UniversitiesHubPage` component depends on the mega menu country routes library.

- **`app/universities/[countryId]/page.tsx`**: This dynamic page component, `UniversitiesByCountryPage`, handles university listings by country and depends on several libraries and components for metadata generation and college directory functionality.

- **`app/universities/[countryId]/not-found.tsx`**: Contains the `UniversitiesCountryNotFound` component, which depends on the mega menu country routes library.

### Components

- **`app/components/SiteHeader.tsx`**: The `SiteHeader` component includes various icons and depends on the mega menu country routes, site footer, and theme toggle components.

- **`app/components/ThemeProvider.tsx`**: Provides theme-related functionality with the `ThemeProvider` and `useTheme` entities, depending on the theme storage library.

- **`app/components/UniversityBrochureSection.tsx`**: Contains the `UniversityBrochureSection` component with no dependencies.

- **`app/components/LandingCountryStripSection.tsx`**: The `LandingCountryStripSection` component depends on the mega menu country routes and scroll reveal components.

- **`app/components/LandingTopUniversitiesSection.tsx`**: The `LandingTopUniversitiesSection` component depends on the scroll reveal component.

- **`app/components/UniverseBackground.tsx`**: The `UniverseBackground` component depends on the theme provider and scene interaction provider components.

- **`app/components/CollegeDirectory.tsx`**: The `CollegeDirectory` component handles college filtering and display, depending on several libraries for country labels, filter options, and image handling.

- **`app/components/SiteFooter.tsx`**: The `SiteFooter` component includes various icons and depends on the footer scroll to top and newsletter form components.

- **`app/components/FloatingAdmissionsTab.tsx`**: Contains the `FloatingAdmissionsTab` component with no dependencies.

- **`app/components/LandingHeroSection.tsx`**: The `LandingHeroSection` component depends on the scroll reveal component.

- **`app/components/FooterNewsletterForm.tsx`**: Contains the `FooterNewsletterForm` component with no dependencies.

- **`app/components/CollegeCoverImage.tsx`**: Contains the `CollegeCoverImage` component with no dependencies.

- **`app/components/ScrollReveal.tsx`**: Provides scroll reveal functionality with no dependencies.

- **`app/components/FooterScrollToTop.tsx`**: Contains the `FooterScrollToTop` component with no dependencies.

- **`app/components/ThemeToggle.tsx`**: The `ThemeToggle` component depends on the theme provider component.

### Scene Components

- **`app/components/scene/ParticleField.tsx`**: The `ParticleFieldComponent` depends on the scene interaction provider component.

- **`app/components/scene/SceneLighting.tsx`**: Contains the `SceneLightingComponent` with no dependencies.

- **`app/components/scene/SceneInteractionProvider.tsx`**: Provides scene interaction functionality with no dependencies.

- **`app/components/scene/FloatingShapes.tsx`**: Contains the `FloatingShapesComponent` with no dependencies.

- **`app/components/scene/PersistentSceneCanvas.tsx`**: The `PersistentSceneCanvasComponent` depends on the camera rig component.

- **`app/components/scene/CameraRig.tsx`**: The `CameraRig` component depends on the scene interaction provider and scene math libraries.

- **`app/components/scene/CountryMarkers.tsx`**: The `CountryMarkersComponent` depends on the scene math library.

- **`app/components/scene/StarField.tsx`**: The `StarFieldComponent` depends on the scene interaction provider component.

- **`app/components/scene/Globe.tsx`**: The `GlobeComponent` depends on the scene interaction provider component.

### Libraries

- **`lib/colleges-catalog.ts`**: Provides functions to retrieve college data, depending on the build colleges library.

- **`lib/college-slug.ts`**: Contains functions for handling college slugs with no dependencies.

- **`lib/college-fee-stats.ts`**: Provides functions for fee statistics, depending on the parse fees library.

- **`lib/college-cover-image-urls.ts`**: Contains functions for handling college cover image URLs with no dependencies.

- **`lib/scene-math.ts`**: Provides mathematical functions for scene calculations with no dependencies.

- **`lib/landing-types.ts`**: Contains type definitions for landing pages with no dependencies.

- **`lib/theme-storage.ts`**: Provides functions for theme storage and application with no dependencies.

- **`lib/scene-config.ts`**: Contains scene configuration data with no dependencies.

- **`lib/college-filter-options.ts`**: Provides functions for college filter options, depending on the inr display library.

- **`lib/inr-display.ts`**: Provides functions for currency conversion and display, depending on the parse fees library.

- **`lib/university-brochure-extension-types.ts`**: Contains type definitions for university brochures with no dependencies.

- **`lib/college-country-label.ts`**: Provides functions for resolving college country labels with no dependencies.

- **`lib/mega-menu-country-routes.ts`**: Provides functions for handling mega menu country routes with no dependencies.

- **`lib/college-country-filter-options.ts`**: Provides functions for country filter options, depending on the college country label library.

- **`lib/college-types.ts`**: Contains type definitions for colleges with no dependencies.

- **`lib/parse-fees.ts`**: Provides functions for parsing fee data with no dependencies.

- **`lib/landing-static.ts`**: Contains static data for landing pages with no dependencies.

- **`lib/theme-types.ts`**: Contains type definitions for themes with no dependencies.

- **`lib/filter-colleges.ts`**: Provides functions for filtering colleges, depending on the college country label library.

- **`lib/build-colleges.ts`**: Provides functions for building college data, depending on the parse fees, college cover image URLs, and college slug libraries.

## Mermaid.js Diagram

Below is a Mermaid.js diagram illustrating the core interactions between the components and libraries in the codebase:

```mermaid
graph TD;
  next.config.ts -->|Configuration| app/layout.tsx;
  app/layout.tsx -->|Layout| app/components/SiteHeader.tsx;
  app/layout.tsx -->|Layout| app/components/SiteFooter.tsx;
  app/layout.tsx -->|Layout| app/components/ThemeProvider.tsx;
  app/layout.tsx -->|Layout| app/components/UniverseBackground.tsx;
  app/page.tsx -->|HomePage| app/components/LandingTopUniversitiesSection.tsx;
  app/page.tsx -->|HomePage| app/components/LandingCountryStripSection.tsx;
  app/page.tsx -->|HomePage| app/components/LandingHeroSection.tsx;
  app/page.tsx -->|HomePage| app/components/ScrollReveal.tsx;
  app/page.tsx -->|HomePage| lib/colleges-catalog.ts;
  app/page.tsx -->|HomePage| app/components/CollegeDirectory.tsx;
  app/colleges/[slug]/page.tsx -->|CollegeDetailPage| lib/college-country-label.ts;
  app/colleges/[slug]/page.tsx -->|CollegeDetailPage| app/universities/[countryId]/page.tsx;
  app/colleges/[slug]/page.tsx -->|CollegeDetailPage| lib/colleges-catalog.ts;
  app/colleges/[slug]/page.tsx -->|CollegeDetailPage| app/components/CollegeCoverImage.tsx;
  app/colleges/[slug]/page.tsx -->|CollegeDetailPage| app/components/UniversityBrochureSection.tsx;
  app/colleges/[slug]/page.tsx -->|CollegeDetailPage| lib/inr-display.ts;
  app/universities/page.tsx -->|UniversitiesHubPage| lib/mega-menu-country-routes.ts;
  app/universities/[countryId]/page.tsx -->|UniversitiesByCountryPage| lib/mega-menu-country-routes.ts;
  app/universities/[countryId]/page.tsx -->|UniversitiesByCountryPage| app/components/CollegeDirectory.tsx;
  app/universities/[countryId]/page.tsx -->|UniversitiesByCountryPage| lib/colleges-catalog.ts;
  app/universities/[countryId]/not-found.tsx -->|UniversitiesCountryNotFound| lib/mega-menu-country-routes.ts;
  app/components/SiteHeader.tsx -->|SiteHeader| lib/mega-menu-country-routes.ts;
  app/components/SiteHeader.tsx -->|SiteHeader| app/components/SiteFooter.tsx;
  app/components/SiteHeader.tsx -->|SiteHeader| app/components/ThemeToggle.tsx;
  app/components/ThemeProvider.tsx -->|ThemeProvider| lib/theme-storage.ts;
  app/components/UniverseBackground.tsx -->|UniverseBackground| app/components/ThemeProvider.tsx;
  app/components/UniverseBackground.tsx -->|UniverseBackground| app/components/scene/SceneInteractionProvider.tsx;
  app/components/CollegeDirectory.tsx -->|CollegeDirectory| lib/college-country-label.ts;
  app/components/CollegeDirectory.tsx -->|CollegeDirectory| lib/college-country-filter-options.ts;
  app/components/CollegeDirectory.tsx -->|CollegeDirectory| app/components/CollegeCoverImage.tsx;
  app/components/CollegeDirectory.tsx -->|CollegeDirectory| lib/inr-display.ts;
  app/components/CollegeDirectory.tsx -->|CollegeDirectory| lib/filter-colleges.ts;
  app/components/CollegeDirectory.tsx -->|CollegeDirectory| lib/college-filter-options.ts;
  app/components/SiteFooter.tsx -->|SiteFooter| app/components/FooterScrollToTop.tsx;
  app/components/SiteFooter.tsx -->|SiteFooter| app/components/FooterNewsletterForm.tsx;
  app/components/LandingCountryStripSection.tsx -->|LandingCountryStripSection| lib/mega-menu-country-routes.ts;
  app/components/LandingCountryStripSection.tsx -->|LandingCountryStripSection| app/components/ScrollReveal.tsx;
  app/components/LandingTopUniversitiesSection.tsx -->|LandingTopUniversitiesSection| app/components/ScrollReveal.tsx;
  app/components/ThemeToggle.tsx -->|ThemeToggle| app/components/ThemeProvider.tsx;
  app/components/scene/ParticleField.tsx -->|ParticleFieldComponent| app/components/scene/SceneInteractionProvider.tsx;
  app/components/scene/PersistentSceneCanvas.tsx -->|PersistentSceneCanvasComponent| app/components/scene/CameraRig.tsx;
  app/components/scene/CameraRig.tsx -->|CameraRig| app/components/scene/SceneInteractionProvider.tsx;
  app/components/scene/CameraRig.tsx -->|CameraRig| lib/scene-math.ts;
  app/components/scene/CountryMarkers.tsx -->|CountryMarkersComponent| lib/scene-math.ts;
  app/components/scene/StarField.tsx -->|StarFieldComponent| app/components/scene/SceneInteractionProvider.tsx;
  app/components/scene/Globe.tsx -->|GlobeComponent| app/components/scene/SceneInteractionProvider.tsx;
  lib/colleges-catalog.ts -->|CollegesCatalog| lib/build-colleges.ts;
  lib/college-fee-stats.ts -->|CollegeFeeStats| lib/parse-fees.ts;
  lib/college-filter-options.ts -->|CollegeFilterOptions| lib/inr-display.ts;
  lib/inr-display.ts -->|InrDisplay| lib/parse-fees.ts;
  lib/college-country-filter-options.ts -->|CollegeCountryFilterOptions| lib/college-country-label.ts;
  lib/filter-colleges.ts -->|FilterColleges| lib/college-country-label.ts;
  lib/build-colleges.ts -->|BuildColleges| lib/parse-fees.ts;
  lib/build-colleges.ts -->|BuildColleges| lib/college-cover-image-urls.ts;
  lib/build-colleges.ts -->|BuildColleges| lib/college-slug.ts;
```

This diagram provides a high-level view of the interactions and dependencies within the codebase, highlighting the relationships between pages, components, and libraries.