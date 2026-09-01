# CollegeDirectory.tsx Documentation

## Overview

The `CollegeDirectory.tsx` file is a React component designed to display a directory of colleges. It provides a user interface for filtering and searching through a list of colleges based on specific criteria such as university name, country, and tuition fees. The component is built using React hooks and leverages Next.js for routing.

## Key Components and Functions

### Imports

- **React and Next.js Imports**: The component imports `useMemo` and `useState` from React for state management and memoization. It also imports `Link` from Next.js for client-side navigation.
- **Custom Components and Types**: 
  - `CollegeCoverImage`: A component for displaying the cover image of a college.
  - Types `College` and `CollegeFilterState` from `college-types`.
- **Utility Functions**: 
  - `getTuitionInrFilterRanges`, `getCountryFilterLabels`, `filterColleges`: Functions for handling filtering logic.
  - `formatMessChargesInr`, `formatParsedMoneyFieldInr`, `formatTuitionInrFilterRangeLabel`: Functions for formatting monetary values.
  - `resolveCollegeCountryLabel`: Resolves the country label for a college.

### Types

- **CollegeDirectoryProps**: Defines the props for the `CollegeDirectory` component, including:
  - `colleges`: An array of college objects.
  - `showDirectoryHeader`: A boolean to control the display of the directory header.
  - `fixedCountryLabel`: A string to fix the country filter to a specific country.

### CSS Class Names

- **labelClassName**: Styles for labels.
- **controlClassName**: Styles for input controls.
- **primaryButtonClassName**: Styles for primary buttons.
- **ghostButtonClassName**: Styles for secondary buttons.

### Helper Functions

- **createCollegeFilterState**: Initializes the filter state with default values.
- **findSelectedTuitionRange**: Finds the selected tuition range based on minimum and maximum values.
- **findTuitionRangeByMinInr**: Finds a tuition range by its minimum INR value.

### TuitionRangeSelect Component

A sub-component used to select a range of tuition fees. It takes the following props:
- `id`, `label`, `ranges`, `selectedMinRub`, `selectedMaxRub`, `anyLabel`, `onSelectedRangeChange`.

### CollegeDirectory Component

The main component that renders the college directory. It uses several hooks and functions to manage state and render the UI:

- **State Management**: Uses `useState` to manage filter states.
- **Memoization**: Uses `useMemo` to optimize performance by memoizing the results of expensive calculations like tuition ranges, country options, and filtered colleges.
- **Rendering Logic**:
  - Displays a header if `showDirectoryHeader` is true.
  - Provides input fields for searching by university name and filtering by country and tuition fees.
  - Displays a list of colleges that match the current filters.
  - Provides a button to reset all filters.

### UI Structure

- **Header**: Displays the title "Find your university" if `showDirectoryHeader` is true.
- **Filters Section**: Contains input fields for searching and filtering colleges.
- **Results Section**: Displays the list of colleges that match the filters. Each college is displayed with its cover image, name, country, tuition, hostel, and mess charges.
- **No Matches Message**: Displays a message when no colleges match the current filters, with an option to clear filters.

## Usage

The `CollegeDirectory` component is designed to be used within a Next.js application. It requires a list of colleges and optional props to control the display of the header and country filter. The component provides a user-friendly interface for exploring and filtering colleges based on user preferences.