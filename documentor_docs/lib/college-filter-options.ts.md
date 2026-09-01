# Documentation Guide for `college-filter-options.ts`

## Overview

The `college-filter-options.ts` file is a TypeScript module designed to handle the filtering of college tuition fees based on specified ranges. It provides functionality to convert tuition amounts between Indian Rupees (INR) and Russian Rubles (RUB), and to generate filter ranges for tuition fees in INR. The module is particularly useful for applications that need to display or filter colleges based on tuition costs.

## Key Components

### Constants

- **`ONE_LAKH_INR`**: Represents 100,000 INR. This constant is used as a basic unit for calculating tuition ranges.
- **`TEN_LAKH_INR`**: Represents 1,000,000 INR. This constant is used as a threshold to determine the granularity of the tuition range steps.
- **`COARSE_RANGE_STEP_INR`**: Represents 1,000,000 INR (10 lakhs). This is used as a step size for tuition ranges when the minimum amount is greater than or equal to 10 lakhs.

### Types

- **`TuitionInrFilterRange`**: A TypeScript type that defines the structure of a tuition filter range. It includes:
  - `minInr`: The minimum tuition fee in INR.
  - `maxInr`: The maximum tuition fee in INR.
  - `minRub`: The minimum tuition fee in RUB.
  - `maxRub`: The maximum tuition fee in RUB.

### Functions

1. **`getTuitionRangeStepInr(bucketMinInr: number): number`**
   - Determines the step size for tuition ranges based on the minimum INR value.
   - Returns `ONE_LAKH_INR` if `bucketMinInr` is less than `TEN_LAKH_INR`, otherwise returns `COARSE_RANGE_STEP_INR`.

2. **`getTuitionBucketMinInr(amountInr: number): number`**
   - Calculates the minimum INR value for a tuition bucket.
   - Uses `ONE_LAKH_INR` for amounts less than `TEN_LAKH_INR` and `COARSE_RANGE_STEP_INR` for larger amounts.

3. **`createTuitionInrFilterRange(bucketMinInr: number): TuitionInrFilterRange`**
   - Creates a `TuitionInrFilterRange` object for a given minimum INR value.
   - Converts the INR values to RUB using the `convertInrToRub` function.

4. **`sortTuitionInrFilterRanges(left: TuitionInrFilterRange, right: TuitionInrFilterRange): number`**
   - Comparator function for sorting `TuitionInrFilterRange` objects by their `minInr` value.

5. **`getTuitionInrFilterRanges(colleges: ReadonlyArray<College>): ReadonlyArray<TuitionInrFilterRange>`**
   - Main function that generates a sorted array of `TuitionInrFilterRange` objects from a list of colleges.
   - Iterates over the colleges, converts tuition amounts from RUB to INR, and creates filter ranges.
   - Uses a `Map` to ensure unique ranges based on the minimum INR value.

## How It Works

1. **Conversion and Range Calculation**: The module first converts tuition amounts from RUB to INR using the `convertRubToInr` function. It then calculates the appropriate bucket minimum INR value using `getTuitionBucketMinInr`.

2. **Range Creation**: For each unique bucket minimum INR value, a `TuitionInrFilterRange` is created using `createTuitionInrFilterRange`. This range includes both INR and RUB values.

3. **Sorting**: The generated ranges are sorted by their minimum INR value using the `sortTuitionInrFilterRanges` comparator.

4. **Output**: The function `getTuitionInrFilterRanges` returns a sorted array of `TuitionInrFilterRange` objects, which can be used to filter or display colleges based on tuition costs.

This module is essential for applications that need to handle tuition data in both INR and RUB, providing a structured way to filter and display this information.