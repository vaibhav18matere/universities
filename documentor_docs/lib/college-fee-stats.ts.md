# Documentation Guide for `college-fee-stats.ts`

## Overview

The `college-fee-stats.ts` file is a TypeScript module designed to compute statistical extents of college fees, specifically tuition and hostel fees, in Russian Rubles (RUB). It provides functionality to determine the minimum and maximum fee extents for a list of colleges and also retrieves the current exchange rate from Rubles to USD.

## Key Components

### Types

1. **`RubExtent`**
   - A TypeScript type representing the extent of fees in Rubles.
   - Properties:
     - `minRub`: The minimum fee in Rubles (number).
     - `maxRub`: The maximum fee in Rubles (number).

2. **`ListingFeeExtents`**
   - A TypeScript type representing the overall fee extents for a list of colleges.
   - Properties:
     - `tuition`: An instance of `RubExtent` or `null`, representing the extent of tuition fees.
     - `hostel`: An instance of `RubExtent` or `null`, representing the extent of hostel fees.
     - `rubPerUsd`: A number representing the exchange rate from Rubles to USD.

### Functions

1. **`accumulateTuitionRubExtent`**
   - Purpose: Computes the minimum and maximum tuition fees in Rubles for a list of colleges.
   - Parameters:
     - `colleges`: A read-only array of `College` objects.
   - Returns: An instance of `RubExtent` if tuition fees are available, otherwise `null`.

2. **`accumulateHostelRubExtent`**
   - Purpose: Computes the minimum and maximum hostel fees in Rubles for a list of colleges.
   - Parameters:
     - `colleges`: A read-only array of `College` objects.
   - Returns: An instance of `RubExtent` if hostel fees are available, otherwise `null`.

3. **`computeListingFeeExtents`**
   - Purpose: Computes the overall fee extents for tuition and hostel fees, and retrieves the current Ruble to USD exchange rate.
   - Parameters:
     - `colleges`: A read-only array of `College` objects.
   - Returns: An instance of `ListingFeeExtents` containing the computed fee extents and the exchange rate.

### External Dependencies

- **`College`**: An imported type from `./college-types`, representing the structure of a college object.
- **`getRubPerUsd`**: An imported function from `./parse-fees`, used to retrieve the current exchange rate from Rubles to USD.

## How It Works

1. **Fee Extent Calculation**:
   - The module provides two functions, `accumulateTuitionRubExtent` and `accumulateHostelRubExtent`, to calculate the minimum and maximum fees in Rubles for tuition and hostel fees, respectively.
   - Both functions iterate over the provided list of colleges, checking if the fee kind is "amount". If so, they update the minimum and maximum values accordingly.

2. **Overall Fee Extents**:
   - The `computeListingFeeExtents` function orchestrates the calculation of fee extents by calling the two accumulation functions and combines their results with the current exchange rate obtained from `getRubPerUsd`.

3. **Return Values**:
   - The functions return structured data types (`RubExtent` and `ListingFeeExtents`) that encapsulate the computed fee extents and exchange rate, providing a clear and organized output for further use.

This module is essential for applications that need to analyze and present college fee data in a structured and currency-aware manner.