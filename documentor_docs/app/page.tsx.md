# Documentation Guide for `app/page.tsx`

## Overview

The `app/page.tsx` file defines the main component for the homepage of a web application. This component is responsible for rendering various sections of the homepage, including a hero section, a country strip section, a top universities section, and a college directory section. The file imports several components and a utility function to achieve this functionality.

## Purpose

The primary purpose of this file is to construct and render the homepage of the application. It organizes and displays different sections that provide information and interactive features related to colleges and universities.

## Key Components

### Imports

- **Components:**
  - `CollegeDirectory`: Displays a list of colleges with filtering options.
  - `LandingCountryStripSection`: Represents a section that likely displays information related to countries.
  - `LandingHeroSection`: Represents the hero section of the homepage, typically used for introductory content.
  - `LandingTopUniversitiesSection`: Displays a section highlighting top universities.
  - `ScrollReveal`: A component used to apply scroll-based animations to its children.

- **Utility Function:**
  - `getAllColleges`: A function imported from `@/lib/colleges-catalog` that retrieves a list of all colleges.

### HomePage Component

The `HomePage` component is the default export of this file. It is a functional component that performs the following tasks:

1. **Data Retrieval:**
   - Calls the `getAllColleges` function to retrieve a list of colleges, which is stored in the `colleges` constant.

2. **Rendering:**
   - Returns a JSX fragment containing the following sections:
     - **`<LandingHeroSection />`:** Renders the hero section of the homepage.
     - **`<LandingCountryStripSection />`:** Renders the country strip section.
     - **`<LandingTopUniversitiesSection />`:** Renders the top universities section.
     - **`<ScrollReveal>`:**
       - Wraps a `<section>` element to apply a "fade-up" animation effect when the section comes into view.
       - The section contains:
         - A heading and a paragraph providing instructions for finding universities.
         - The `CollegeDirectory` component, which displays the list of colleges with options to filter by country and budget.

### College Directory Section

- **Section Attributes:**
  - The section has various CSS classes applied for styling, including responsive design adjustments and dark mode support.
  - It uses a `ScrollReveal` component to animate its appearance.

- **Content:**
  - A heading (`<h2>`) and a paragraph (`<p>`) provide context and instructions for using the college directory.
  - The `CollegeDirectory` component is rendered with the following props:
    - `colleges`: Passes the list of colleges retrieved earlier.
    - `showDirectoryHeader`: Set to `false`, indicating that the directory header should not be displayed.
    - `fixedCountryLabel`: Set to `null`, suggesting no fixed country label is applied.

## How It Works

1. **Data Fetching:** The `getAllColleges` function is called to fetch the list of colleges, which is then used to populate the `CollegeDirectory` component.

2. **Component Rendering:** The `HomePage` component renders multiple sections, each represented by a specific component. These sections are organized in a logical order to create a cohesive homepage layout.

3. **Scroll Animation:** The `ScrollReveal` component is used to apply a "fade-up" animation to the college directory section, enhancing the user experience by animating the section into view as the user scrolls.

This file effectively combines data retrieval, component composition, and animation to create an interactive and informative homepage for the application.