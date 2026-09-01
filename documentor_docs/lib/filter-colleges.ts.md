# Documentation Guide for `lib/filter-colleges.ts`

## Overview

The `lib/filter-colleges.ts` file contains TypeScript code designed to filter a list of colleges based on specific criteria. The filtering is performed using a combination of search queries, country selection, and tuition range. This module is essential for applications that need to present a refined list of colleges to users based on their preferences.

## Key Components

### Imports

- **Types**: The file imports types `College`, `CollegeFilterState`, and `ParsedMoneyField` from `./college-types`. These types are used to define the structure of the data being processed.
- **Function**: The `resolveCollegeCountryLabel` function is imported from `./college-country-label`. This function is used to resolve the country label of a college.

### Functions

1. **`matchesSearch`**
   - **Purpose**: Determines if a college's name matches a given search query.
   - **Parameters**:
     - `college: College`: The college object to be checked.
     - `query: string`: The search query string.
   - **Returns**: `boolean` - `true` if the query is empty or if the college's name includes the query string (case-insensitive), otherwise `false`.

2. **`inNumberRange`**
   - **Purpose**: Checks if a number falls within a specified range.
   - **Parameters**:
     - `value: number`: The number to check.
     - `minValue: number | null`: The minimum value of the range (inclusive).
     - `maxValue: number | null`: The maximum value of the range (inclusive).
   - **Returns**: `boolean` - `true` if the value is within the range, otherwise `false`.

3. **`inRubRange`**
   - **Purpose**: A specialized version of `inNumberRange` for values in Rubles.
   - **Parameters**:
     - `valueRub: number`: The value in Rubles to check.
     - `minRub: number | null`: The minimum Ruble value.
     - `maxRub: number | null`: The maximum Ruble value.
   - **Returns**: `boolean` - Delegates to `inNumberRange` to determine if the value is within the specified Ruble range.

4. **`matchesMoneyRange`**
   - **Purpose**: Checks if a college's tuition falls within a specified Ruble range.
   - **Parameters**:
     - `field: ParsedMoneyField`: The tuition field of the college.
     - `minRub: number | null`: The minimum tuition in Rubles.
     - `maxRub: number | null`: The maximum tuition in Rubles.
   - **Returns**: `boolean` - `true` if the tuition is within the range or if no range is specified, otherwise `false`. Returns `false` if the tuition is not available.

5. **`matchesCountry`**
   - **Purpose**: Determines if a college is located in a selected country.
   - **Parameters**:
     - `college: College`: The college object to be checked.
     - `selectedCountry: string | null`: The selected country label.
   - **Returns**: `boolean` - `true` if no country is selected or if the college's country matches the selected country, otherwise `false`.

### Main Function

- **`filterColleges`**
  - **Purpose**: Filters a list of colleges based on search query, country, and tuition range.
  - **Parameters**:
    - `colleges: ReadonlyArray<College>`: The array of college objects to filter.
    - `filters: CollegeFilterState`: The filter criteria including search query, selected country, and tuition range.
  - **Returns**: `ReadonlyArray<College>` - A new array of colleges that match all the specified filter criteria.
  - **Logic**: The function iterates over the list of colleges and applies the following checks:
    - Matches the search query using `matchesSearch`.
    - Matches the selected country using `matchesCountry`.
    - Matches the tuition range using `matchesMoneyRange`.
  - If a college passes all checks, it is included in the returned array.

## Conclusion

The `lib/filter-colleges.ts` file provides a robust mechanism for filtering colleges based on user-defined criteria. By leveraging TypeScript's type system and modular functions, it ensures that only colleges meeting all specified conditions are returned, enhancing the user experience in applications that require college data filtering.