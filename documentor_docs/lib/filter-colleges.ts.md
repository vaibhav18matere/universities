# Documentation Guide for `lib/filter-colleges.ts`

## Overview

The `lib/filter-colleges.ts` file contains a set of functions designed to filter a list of colleges based on specific criteria. The primary function, `filterColleges`, applies a series of filters to a list of college objects, allowing users to narrow down their search based on search queries, country, and tuition range.

## Key Components

### Imports

- **Types**: The file imports types `College`, `CollegeFilterState`, and `ParsedMoneyField` from `./college-types`. These types are used to define the structure of the data being processed.
- **Function**: The `resolveCollegeCountryLabel` function is imported from `./college-country-label`. This function is used to resolve the country label of a college.

### Functions

1. **`matchesSearch`**

   ```typescript
   function matchesSearch(college: College, query: string): boolean
   ```

   - **Purpose**: Checks if a college's name includes the search query.
   - **Parameters**:
     - `college`: An object of type `College`.
     - `query`: A string representing the search query.
   - **Returns**: `true` if the query is empty or if the college's name includes the query (case-insensitive); otherwise, `false`.

2. **`inNumberRange`**

   ```typescript
   function inNumberRange(value: number, minValue: number | null, maxValue: number | null): boolean
   ```

   - **Purpose**: Determines if a number falls within a specified range.
   - **Parameters**:
     - `value`: The number to check.
     - `minValue`: The minimum value of the range (nullable).
     - `maxValue`: The maximum value of the range (nullable).
   - **Returns**: `true` if the value is within the range; otherwise, `false`.

3. **`inRubRange`**

   ```typescript
   function inRubRange(valueRub: number, minRub: number | null, maxRub: number | null): boolean
   ```

   - **Purpose**: A wrapper around `inNumberRange` specifically for values in Rubles.
   - **Parameters**:
     - `valueRub`: The value in Rubles to check.
     - `minRub`: The minimum Ruble value (nullable).
     - `maxRub`: The maximum Ruble value (nullable).
   - **Returns**: `true` if the value is within the Ruble range; otherwise, `false`.

4. **`matchesMoneyRange`**

   ```typescript
   function matchesMoneyRange(field: ParsedMoneyField, minRub: number | null, maxRub: number | null): boolean
   ```

   - **Purpose**: Checks if a monetary field falls within a specified Ruble range.
   - **Parameters**:
     - `field`: An object of type `ParsedMoneyField`.
     - `minRub`: The minimum Ruble value (nullable).
     - `maxRub`: The maximum Ruble value (nullable).
   - **Returns**: `true` if the field's amount is within the range and the field is available; otherwise, `false`.

5. **`matchesCountry`**

   ```typescript
   function matchesCountry(college: College, selectedCountry: string | null): boolean
   ```

   - **Purpose**: Checks if a college is located in the selected country.
   - **Parameters**:
     - `college`: An object of type `College`.
     - `selectedCountry`: The selected country as a string (nullable).
   - **Returns**: `true` if the college's country matches the selected country or if no country is selected; otherwise, `false`.

6. **`filterColleges`**

   ```typescript
   export function filterColleges(colleges: ReadonlyArray<College>, filters: CollegeFilterState): ReadonlyArray<College>
   ```

   - **Purpose**: Filters a list of colleges based on search query, country, and tuition range.
   - **Parameters**:
     - `colleges`: A read-only array of `College` objects.
     - `filters`: An object of type `CollegeFilterState` containing the filter criteria.
   - **Returns**: A read-only array of `College` objects that match all the specified filters.

## How It Works

The `filterColleges` function iterates over an array of `College` objects and applies several filtering criteria:

1. **Search Query**: Uses `matchesSearch` to check if the college's name includes the search query.
2. **Country**: Uses `matchesCountry` to verify if the college is in the selected country.
3. **Tuition Range**: Uses `matchesMoneyRange` to ensure the college's tuition falls within the specified Ruble range.

If a college satisfies all these conditions, it is included in the returned array. Otherwise, it is excluded. This allows users to effectively narrow down their list of potential colleges based on their preferences.