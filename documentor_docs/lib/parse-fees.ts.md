# Documentation Guide for `lib/parse-fees.ts`

This document provides a detailed explanation of the `lib/parse-fees.ts` file, which is responsible for parsing and handling monetary values related to college fees and mess charges. The file includes functions to normalize input strings, detect currency, extract numerical values, and convert currency amounts.

## Purpose

The primary purpose of this module is to parse and process monetary fields related to college fees and mess charges. It handles different formats of input strings, detects the currency type, extracts numerical values, and performs currency conversion from USD to RUB.

## Key Components

### 1. `normalizeWhitespace(input: string): string`

- **Purpose**: This function normalizes whitespace in a given input string by trimming leading and trailing spaces and replacing multiple spaces with a single space.
- **Parameters**: 
  - `input`: A string that may contain irregular whitespace.
- **Returns**: A string with normalized whitespace.

### 2. `detectCurrency(normalized: string): "RUB" | "USD"`

- **Purpose**: This function detects the currency type from a normalized string.
- **Parameters**: 
  - `normalized`: A string with normalized whitespace.
- **Returns**: A string indicating the currency type, either "RUB" or "USD". It checks for the presence of "USD" or "$" to determine if the currency is USD; otherwise, it defaults to RUB.

### 3. `extractNumber(normalized: string): number | null`

- **Purpose**: This function extracts a numerical value from a normalized string.
- **Parameters**: 
  - `normalized`: A string with normalized whitespace.
- **Returns**: A number representing the extracted value, or `null` if no valid number is found. It removes commas and matches a pattern for numbers, including optional decimal points.

### 4. `parseMoneyField(rawInput: string, rubPerUsd: number): ParsedMoneyField`

- **Purpose**: This function parses a raw input string representing a monetary field and converts it to a structured format.
- **Parameters**: 
  - `rawInput`: The raw input string containing the monetary value.
  - `rubPerUsd`: The conversion rate from USD to RUB.
- **Returns**: An object of type `ParsedMoneyField` containing:
  - `kind`: Indicates if the value is "amount" or "not_available".
  - `rawDisplay`: The original input string.
  - `amount`: The extracted numerical value.
  - `currency`: The detected currency type.
  - `amountRub`: The amount converted to RUB if the currency is USD.

### 5. `parseMessCharges(rawInput: string): MessChargesParsed`

- **Purpose**: This function parses a raw input string representing mess charges and converts it to a structured format.
- **Parameters**: 
  - `rawInput`: The raw input string containing the mess charges.
- **Returns**: An object of type `MessChargesParsed` containing:
  - `kind`: Indicates if the value is "amount" or "not_available".
  - `amountUsd`: The extracted numerical value in USD.

### 6. `getRubPerUsd(): number`

- **Purpose**: This function provides the conversion rate from USD to RUB.
- **Returns**: A fixed number `92`, representing the conversion rate.

## How It Works

1. **Normalization**: The input strings are first normalized to handle irregular whitespace using the `normalizeWhitespace` function.

2. **Currency Detection**: The `detectCurrency` function determines whether the currency is USD or RUB based on specific indicators in the string.

3. **Number Extraction**: The `extractNumber` function extracts numerical values from the normalized string, handling potential commas and decimal points.

4. **Parsing Money Fields**: The `parseMoneyField` function processes the raw input to determine if it represents a valid monetary amount or is not available. It also converts USD amounts to RUB using the provided conversion rate.

5. **Parsing Mess Charges**: The `parseMessCharges` function processes the raw input for mess charges, determining if it represents a valid amount or is not available.

6. **Currency Conversion**: The `getRubPerUsd` function provides a fixed conversion rate for converting USD to RUB.

This module is designed to handle various input formats and ensure accurate parsing and conversion of monetary values related to college fees and mess charges.