# Documentation Guide for `lib/inr-display.ts`

This document provides a detailed explanation of the `lib/inr-display.ts` file, which is responsible for handling currency conversions and formatting related to Indian Rupees (INR), Russian Rubles (RUB), and United States Dollars (USD). The primary purpose of this module is to facilitate the conversion of monetary values between these currencies and to format these values for display purposes.

## Overview

The module provides functions to:
- Convert between USD, RUB, and INR.
- Format INR values for display.
- Handle specific data structures related to monetary fields and mess charges.

## Key Components

### Constants

- **`getInrPerUsd`**: Returns a constant value of 86, representing the approximate conversion rate of INR per USD. This is used for on-screen estimates and is not a live quote.

### Conversion Functions

- **`getInrPerRub`**: Calculates the conversion rate from RUB to INR using the `getInrPerUsd` and `getRubPerUsd` functions. It divides the INR per USD by the RUB per USD to get the INR per RUB.

- **`convertRubToInr`**: Converts an amount in RUB to INR using the `getInrPerRub` conversion rate.

- **`convertInrToRub`**: Converts an amount in INR to RUB using the inverse of the `getInrPerRub` conversion rate.

- **`convertUsdToInr`**: Converts an amount in USD to INR using the `getInrPerUsd` conversion rate.

### Formatting Functions

- **`formatInrWhole`**: Formats an INR amount as a string with the Indian currency symbol (₹) and uses Indian numbering format (e.g., commas for thousands).

- **`formatTuitionInrFilterRangeLabel`**: Formats a range of INR values for display, showing the minimum and maximum values in the range.

- **`formatRubAmountInInr`**: Converts a RUB amount to INR and formats it for display.

- **`formatUsdAmountInInr`**: Converts a USD amount to INR and formats it for display.

### Specialized Formatting Functions

- **`formatParsedMoneyFieldInr`**: Formats a `ParsedMoneyField` object. If the field is not available, it returns a trimmed version of the raw display or "NA" if empty. Otherwise, it converts the RUB amount to INR and formats it.

- **`formatMessChargesInr`**: Formats a `MessChargesParsed` object. If the mess charges are not available, it returns a trimmed version of the raw fallback or "NA" if empty. Otherwise, it converts the USD amount to INR and formats it.

## How It Works

1. **Conversion Rates**: The module uses a fixed conversion rate for INR per USD (`getInrPerUsd`) and calculates the INR per RUB using the `getRubPerUsd` function from the `parse-fees` module.

2. **Currency Conversion**: Functions are provided to convert amounts between RUB, USD, and INR using the calculated conversion rates.

3. **Formatting**: The module includes functions to format INR amounts for display, ensuring they are presented with the correct currency symbol and number formatting.

4. **Data Handling**: Specialized functions handle specific data structures (`ParsedMoneyField` and `MessChargesParsed`), providing formatted output based on the availability of data.

This module is essential for applications that need to display monetary values in INR, especially when dealing with international currencies like USD and RUB. It ensures that values are converted accurately and presented in a user-friendly format.