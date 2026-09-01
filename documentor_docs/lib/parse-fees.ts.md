# Documentation Guide for `lib/parse-fees.ts`

## Overview

The `lib/parse-fees.ts` file is a TypeScript module designed to parse and interpret monetary values and mess charges from raw string inputs. It provides utility functions to normalize input strings, detect currency types, extract numerical values, and convert currency amounts. The module is particularly focused on handling values in Russian Rubles (RUB) and US Dollars (USD).

## Key Components

### Types

- **`MessChargesParsed`**: Represents the parsed result of mess charges, which can either be an amount in USD or indicate that the value is not available.
- **`ParsedMoneyField`**: Represents the parsed result of a monetary field, including the raw display string, the amount, the currency type, and the equivalent amount in RUB.

### Functions

1. **`normalizeWhitespace(input: string): string`**

   - **Purpose**: Trims leading and trailing whitespace from the input string and replaces multiple spaces with a single space.
   - **Parameters**: 
     - `input`: The raw string input to be normalized.
   - **Returns**: A string with normalized whitespace.

2. **`detectCurrency(normalized: string): "RUB" | "USD"`**

   - **Purpose**: Determines the currency type of a normalized string based on specific indicators.
   - **Parameters**: 
     - `normalized`: The normalized string to analyze.
   - **Returns**: `"USD"` if the string contains "USD" or "$", otherwise `"RUB"`.

3. **`extractNumber(normalized: string): number | null`**

   - **Purpose**: Extracts the first numerical value from a normalized string.
   - **Parameters**: 
     - `normalized`: The normalized string from which to extract the number.
   - **Returns**: A number if a valid numerical value is found, otherwise `null`.

4. **`parseMoneyField(rawInput: string, rubPerUsd: number): ParsedMoneyField`**

   - **Purpose**: Parses a raw input string to extract monetary information, including currency type and amount.
   - **Parameters**: 
     - `rawInput`: The raw string input representing a monetary value.
     - `rubPerUsd`: The conversion rate from USD to RUB.
   - **Returns**: A `ParsedMoneyField` object containing the parsed monetary information.
   - **Throws**: An error if the monetary value cannot be parsed.

5. **`parseMessCharges(rawInput: string): MessChargesParsed`**

   - **Purpose**: Parses a raw input string to extract mess charges in USD.
   - **Parameters**: 
     - `rawInput`: The raw string input representing mess charges.
   - **Returns**: A `MessChargesParsed` object containing the parsed mess charges information.
   - **Throws**: An error if the mess charges cannot be parsed.

6. **`getRubPerUsd(): number`**

   - **Purpose**: Provides the conversion rate from USD to RUB.
   - **Returns**: The conversion rate, which is hardcoded as `92`.

## How It Works

1. **Normalization**: The `normalizeWhitespace` function is used to clean up input strings by removing excess whitespace.

2. **Currency Detection**: The `detectCurrency` function checks for specific indicators to determine if the currency is USD or RUB.

3. **Number Extraction**: The `extractNumber` function searches for and extracts numerical values from strings, handling potential formatting issues like commas.

4. **Parsing Monetary Fields**: The `parseMoneyField` function combines the above utilities to parse a string into a structured monetary field, converting amounts to RUB if necessary.

5. **Parsing Mess Charges**: The `parseMessCharges` function specifically handles the parsing of mess charges, assuming they are in USD.

6. **Currency Conversion**: The `getRubPerUsd` function provides a fixed conversion rate for currency conversion tasks.

This module is essential for applications that need to process and interpret financial data, particularly in contexts involving RUB and USD currencies.