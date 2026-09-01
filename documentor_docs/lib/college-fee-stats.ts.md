# Documentation Guide for `college-fee-stats.ts`

## Overview

The `college-fee-stats.ts` file is a TypeScript module designed to compute statistical extents of college fees, specifically tuition and hostel fees, in Russian Rubles (RUB). It provides functionality to determine the minimum and maximum fee extents for a list of colleges and also retrieves the current exchange rate from RUB to USD.

## Key Components

### Types

1. **`RubExtent`**
   - A TypeScript type representing the extent of fees in RUB.
   - Properties:
     - `minRub`: The minimum fee in RUB.
     - `maxRub`: The maximum fee in RUB.

2. **`ListingFeeExtents`**
   - A TypeScript type representing the overall fee extents for a list of colleges.
   - Properties:
     - `tuition`: An instance of `RubExtent` or `null`, representing the extent of tuition fees.
     - `hostel`: An instance of `RubExtent` or `null`, representing the extent of hostel fees.
     - `rubPerUsd`: A number representing the exchange rate from RUB to USD.

### Functions

1. **`accumulateTuitionRubExtent`**
   - Purpose: Computes the minimum and maximum tuition fees in RUB for a list of colleges.
   - Parameters:
     - `colleges`: A read-only array of `College` objects.
   - Returns: An instance of `RubExtent` if tuition fees are available, otherwise `null`.

2. **`accumulateHostelRubExtent`**
   - Purpose: Computes the minimum and maximum hostel fees in RUB for a list of colleges.
   - Parameters:
     - `colleges`: A read-only array of `College` objects.
   - Returns: An instance of `RubExtent` if hostel fees are available, otherwise `null`.

3. **`computeListingFeeExtents`**
   - Purpose: Computes the overall fee extents for tuition and hostel fees, and retrieves the RUB to USD exchange rate.
   - Parameters:
     - `colleges`: A read-only array of `College` objects.
   - Returns: An instance of `ListingFeeExtents` containing the tuition and hostel fee extents and the exchange rate.

### External Dependencies

- **`College`**: An imported type from `./college-types`, representing the structure of a college object.
- **`getRubPerUsd`**: An imported function from `./parse-fees`, used to retrieve the current exchange rate from RUB to USD.

## How It Works

1. **Fee Extent Calculation**:
   - The module provides two functions, `accumulateTuitionRubExtent` and `accumulateHostelRubExtent`, to calculate the minimum and maximum fees in RUB for tuition and hostel, respectively.
   - Both functions iterate over the provided list of colleges, checking if the fee kind is "amount". If so, they update the minimum and maximum values accordingly.

2. **Overall Fee Extents**:
   - The `computeListingFeeExtents` function orchestrates the calculation of both tuition and hostel fee extents by calling the respective accumulation functions.
   - It also retrieves the RUB to USD exchange rate using the `getRubPerUsd` function.
   - The results are returned as a `ListingFeeExtents` object.

## Usage

To use the functionality provided by this module, import the `computeListingFeeExtents` function and pass a list of `College` objects to it. The function will return an object containing the fee extents and the exchange rate, which can be used for further processing or display.

```typescript
import { computeListingFeeExtents } from './lib/college-fee-stats';
import type { College } from './college-types';

const colleges: ReadonlyArray<College> = [...]; // Define your array of colleges
const feeExtents = computeListingFeeExtents(colleges);

console.log(feeExtents);
```

This documentation provides a comprehensive understanding of the `college-fee-stats.ts` module, its components, and its functionality.