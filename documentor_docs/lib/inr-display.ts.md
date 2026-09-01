# Documentation Guide for `lib/inr-display.ts`

This document provides a detailed explanation of the `lib/inr-display.ts` file, which is responsible for handling currency conversions and formatting related to Indian Rupees (INR) in the context of a college fee management system. The file includes functions to convert and format amounts between different currencies, specifically INR, USD, and RUB (Russian Ruble).

## Overview

The primary purpose of this module is to provide utility functions for converting and formatting currency values, particularly focusing on INR. It includes functions to convert amounts from USD and RUB to INR, as well as functions to format these amounts for display purposes.

## Key Components

### Imports

- **`MessChargesParsed` and `ParsedMoneyField`**: These are types imported from `./college-types`. They are used to define the structure of objects that represent parsed monetary fields and mess charges.
- **`getRubPerUsd`**: A function imported from `./parse-fees` that returns the conversion rate from USD to RUB.

### Functions

1. **`getInrPerUsd`**
   - Returns a fixed conversion rate of 86 INR per USD.
   - This rate is used for on-screen estimates and is not a live quote.

2. **`getInrPerRub`**
   - Calculates the conversion rate from RUB to INR by dividing the INR per USD rate by the RUB per USD rate.

3. **`convertRubToInr`**
   - Converts an amount in RUB to INR using the `getInrPerRub` conversion rate.

4. **`convertInrToRub`**
   - Converts an amount in INR to RUB using the inverse of the `getInrPerRub` conversion rate.

5. **`convertUsdToInr`**
   - Converts an amount in USD to INR using the `getInrPerUsd` conversion rate.

6. **`formatInrWhole`**
   - Formats an INR amount as a string with a currency symbol and comma-separated thousands.
   - Rounds the amount to the nearest whole number.

7. **`formatTuitionInrFilterRangeLabel`**
   - Formats a range of INR amounts for display, using the `formatInrWhole` function for each boundary of the range.

8. **`formatRubAmountInInr`**
   - Converts an amount in RUB to INR and formats it using `formatInrWhole`.

9. **`formatUsdAmountInInr`**
   - Converts an amount in USD to INR and formats it using `formatInrWhole`.

10. **`formatParsedMoneyFieldInr`**
    - Formats a `ParsedMoneyField` object in INR.
    - If the field is not available, it returns a trimmed version of the raw display or "NA" if empty.
    - Otherwise, it converts the RUB amount to INR and formats it.

11. **`formatMessChargesInr`**
    - Formats a `MessChargesParsed` object in INR.
    - If the mess charges are not available, it returns a trimmed version of the raw fallback or "NA" if empty.
    - Otherwise, it converts the USD amount to INR and formats it.

## Usage

This module is intended to be used in applications where currency conversion and display formatting are required, particularly in the context of college fee management. The functions provided allow for consistent and accurate representation of monetary values in INR, ensuring that users can easily understand and compare costs.

## Conclusion

The `lib/inr-display.ts` file provides essential utilities for handling currency conversions and formatting in INR. By leveraging these functions, developers can ensure that monetary values are accurately represented and easily understood by users.