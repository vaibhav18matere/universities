# CollegeDirectory.tsx Documentation

## Overview

The `CollegeDirectory.tsx` file is a React component designed to display a directory of colleges. It provides a user interface for filtering and searching through a list of colleges based on specific criteria such as university name, country, and tuition fees. The component is built using React hooks and leverages Next.js for routing.

## Key Components and Functions

### Imports

- **React and Next.js Imports**: The component imports `useMemo` and `useState` from React for state management and memoization. It also imports `Link` from Next.js for client-side navigation.
- **Custom Components and Types**: 
  - `CollegeCoverImage`: A component for displaying the cover image of a college.
  - Types `College` and `CollegeFilterState` from `college-types`.
  - Functions and types related to filtering and formatting from various utility modules.

### Types

- **`CollegeDirectoryProps`**: Defines the props for the `CollegeDirectory` component.
  - `colleges`: An array of college objects.
  - `showDirectoryHeader`: A boolean to control the display of the directory header.
  - `fixedCountryLabel`: A string or null to fix the country filter to a specific country.

### CSS Class Names

- **`labelClassName`**: Styles for labels.
- **`controlClassName`**: Styles for input controls.
- **`primaryButtonClassName`**: Styles for primary buttons.
- **`ghostButtonClassName`**: Styles for ghost buttons.

### Helper Functions

- **`createCollegeFilterState`**: Initializes the filter state with default values.
- **`findSelectedTuitionRange`**: Finds the selected tuition range based on minimum and maximum values.
- **`findTuitionRangeByMinInr`**: Finds a tuition range by its minimum INR value.

### Components

#### `TuitionRangeSelect`

A component for selecting a tuition fee range.

- **Props**: 
  - `id`, `label`, `ranges`, `selectedMinRub`, `selectedMaxRub`, `anyLabel`, `onSelectedRangeChange`.
- **Functionality**: 
  - Displays a dropdown for selecting a tuition range.
  - Calls `onSelectedRangeChange` when the selection changes.

#### `CollegeDirectory`

The main component that renders the college directory.

- **State**: 
  - `filters`: Manages the current filter state using `useState`.
- **Memoized Values**:
  - `tuitionInrRanges`: Memoized list of tuition ranges.
  - `countryOptions`: Memoized list of country labels.
  - `visibleColleges`: Memoized list of colleges that match the current filters.
- **Render Logic**:
  - Displays a header if `showDirectoryHeader` is true.
  - Provides input fields for searching by university name and filtering by country and tuition fees.
  - Displays the number of visible colleges and a button to reset filters.
  - Renders a list of colleges that match the filters, each with a cover image, name, country, and financial details.
  - If no colleges match the filters, displays a message with an option to clear filters.

## Usage

The `CollegeDirectory` component is used to display and interact with a list of colleges. It allows users to filter colleges by name, country, and tuition fees, providing a dynamic and interactive user experience. The component is designed to be responsive and accessible, with clear labels and controls for user interaction.

## Conclusion

The `CollegeDirectory.tsx` file is a comprehensive component for managing and displaying a directory of colleges. It utilizes React hooks for state management and memoization, and it provides a user-friendly interface for filtering and searching through college data.