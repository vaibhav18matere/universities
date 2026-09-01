# Documentation Guide for `college-filter-options.ts`

## Overview

The `college-filter-options.ts` file is a TypeScript module designed to handle the filtering of college tuition fees based on specified ranges. It provides functionality to convert tuition amounts from Russian Rubles (RUB) to Indian Rupees (INR) and to categorize these amounts into defined ranges for filtering purposes.

## Key Components

### Constants

- **`ONE_LAKH_INR`**: Represents 100,000 INR. This constant is used to define the step size for tuition ranges below 1,000,000 INR.
  
- **`TEN_LAKH_INR`**: Represents 1,000,000 INR. This constant is used as a threshold to determine the granularity of the tuition range steps.
  
- **`COARSE_RANGE_STEP_INR`**: Represents 1,000,000 INR (10 times `ONE_LAKH_INR`). This is used as the step size for tuition ranges above 1,000,000 INR.

### Types

- **`TuitionInrFilterRange`**: A TypeScript type that defines the structure of a tuition range object. It includes:
  - `minInr`: The minimum tuition amount in INR.
  - `maxInr`: The maximum tuition amount in INR.
  - `minRub`: The minimum tuition amount in RUB.
  - `maxRub`: The maximum tuition amount in RUB.

### Functions

- **`getTuitionRangeStepInr(bucketMinInr: number): number`**: Determines the step size for a given minimum INR bucket. If the bucket is less than `TEN_LAKH_INR`, it returns `ONE_LAKH_INR`; otherwise, it returns `COARSE_RANGE_STEP_INR`.

- **`getTuitionBucketMinInr(amountInr: number): number`**: Calculates the minimum INR bucket for a given tuition amount. It rounds down the amount to the nearest step defined by `ONE_LAKH_INR` or `COARSE_RANGE_STEP_INR`, depending on the amount.

- **`createTuitionInrFilterRange(bucketMinInr: number): TuitionInrFilterRange`**: Creates a `TuitionInrFilterRange` object for a given minimum INR bucket. It calculates the maximum INR for the range and converts both the minimum and maximum INR values to RUB.

- **`sortTuitionInrFilterRanges(left: TuitionInrFilterRange, right: TuitionInrFilterRange): number`**: A comparator function used to sort `TuitionInrFilterRange` objects by their `minInr` value.

- **`getTuitionInrFilterRanges(colleges: ReadonlyArray<College>): ReadonlyArray<TuitionInrFilterRange>`**: The main function that processes an array of `College` objects to generate a sorted array of `TuitionInrFilterRange` objects. It:
  1. Iterates over the list of colleges.
  2. Converts the tuition amount from RUB to INR.
  3. Determines the minimum INR bucket for each tuition amount.
  4. Creates a `TuitionInrFilterRange` if it does not already exist for the bucket.
  5. Returns a sorted array of unique `TuitionInrFilterRange` objects.

## How It Works

1. **Conversion and Categorization**: The module first converts tuition amounts from RUB to INR using the `convertRubToInr` function. It then categorizes these amounts into defined INR buckets based on their value.

2. **Range Creation**: For each unique INR bucket, a `TuitionInrFilterRange` is created, which includes both INR and RUB values for the range.

3. **Sorting**: The resulting ranges are sorted by their minimum INR value to facilitate easy filtering.

4. **Output**: The function `getTuitionInrFilterRanges` returns a sorted array of `TuitionInrFilterRange` objects, which can be used to filter colleges based on tuition fees.

This module is essential for applications that need to filter colleges by tuition fees, providing a structured and efficient way to handle currency conversion and range categorization.