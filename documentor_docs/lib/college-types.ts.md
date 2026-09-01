# Documentation Guide for `college-types.ts`

This document provides a detailed explanation of the TypeScript file `college-types.ts`, which defines various types related to college data management. The file is structured to support the representation and manipulation of college-related information, including rankings, fees, and other attributes.

## Purpose

The primary purpose of `college-types.ts` is to define TypeScript types that model the data structure for colleges, including their rankings, fees, and other relevant attributes. These types are used to ensure type safety and consistency across the application when handling college data.

## Key Components

### 1. WebometricsRanking

```typescript
export type WebometricsRanking = {
  readonly countryRank: number;
  readonly worldRank: number;
  readonly impactRank: number;
  readonly opennessRank: number;
  readonly excellenceRank: number;
};
```

- **Description**: Represents the Webometrics/Cybermetrics style rankings for a university. Lower numbers indicate better rankings.
- **Fields**:
  - `countryRank`: Rank within the country.
  - `worldRank`: Global rank.
  - `impactRank`: Rank based on the impact.
  - `opennessRank`: Rank based on openness.
  - `excellenceRank`: Rank based on excellence.

### 2. FeeCurrency

```typescript
export type FeeCurrency = "RUB" | "USD";
```

- **Description**: Enumerates the possible currencies for fees, either Russian Ruble (RUB) or US Dollar (USD).

### 3. MessChargesParsed

```typescript
export type MessChargesParsed =
  | { readonly kind: "amount"; readonly amountUsd: number }
  | { readonly kind: "not_available" };
```

- **Description**: Represents the parsed mess charges.
- **Variants**:
  - `amount`: Contains the mess charge amount in USD.
  - `not_available`: Indicates that the mess charges are not available.

### 4. ParsedMoneyField

```typescript
export type ParsedMoneyField =
  | {
      readonly kind: "amount";
      readonly rawDisplay: string;
      readonly amount: number;
      readonly currency: FeeCurrency;
      readonly amountRub: number;
    }
  | {
      readonly kind: "not_available";
      readonly rawDisplay: string;
    };
```

- **Description**: Represents a parsed monetary field, which can either be an amount or not available.
- **Variants**:
  - `amount`: Contains the raw display string, amount, currency, and the amount converted to RUB.
  - `not_available`: Contains the raw display string indicating unavailability.

### 5. CollegeRecord

```typescript
export type CollegeRecord = {
  readonly id: string;
  readonly universityName: string;
  readonly imageSrc?: string;
  readonly country?: string;
  readonly webometricsRanking?: WebometricsRanking;
  readonly tuitionFeesRaw: string;
  readonly hostelFeesRaw: string;
  readonly medicalBundleRub: number;
  readonly otcChargesUsd: number;
  readonly messChargesRaw: string;
  readonly serviceChargesRub: number;
  readonly brochureExtension?: UniversityBrochureExtension;
};
```

- **Description**: Represents the basic record for a college.
- **Fields**:
  - `id`: Unique identifier for the college.
  - `universityName`: Name of the university.
  - `imageSrc`: Optional cover photo for the college.
  - `country`: Optional country of the college; defaults to Russia if omitted.
  - `webometricsRanking`: Optional Webometrics ranking.
  - `tuitionFeesRaw`: Raw tuition fees string.
  - `hostelFeesRaw`: Raw hostel fees string.
  - `medicalBundleRub`: Medical bundle cost in RUB.
  - `otcChargesUsd`: Over-the-counter charges in USD.
  - `messChargesRaw`: Raw mess charges string.
  - `serviceChargesRub`: Service charges in RUB.
  - `brochureExtension`: Optional extension for the university brochure.

### 6. College

```typescript
export type College = CollegeRecord & {
  readonly slug: string;
  readonly tuition: ParsedMoneyField;
  readonly hostel: ParsedMoneyField;
  readonly messCharges: MessChargesParsed;
  readonly imageSrc: string;
};
```

- **Description**: Extends `CollegeRecord` with additional fields for a more comprehensive college representation.
- **Fields**:
  - `slug`: URL-friendly identifier for the college.
  - `tuition`: Parsed tuition fees.
  - `hostel`: Parsed hostel fees.
  - `messCharges`: Parsed mess charges.
  - `imageSrc`: Image source, always set after build.

### 7. CollegeFilterState

```typescript
export type CollegeFilterState = {
  readonly searchQuery: string;
  readonly selectedCountry: string | null;
  readonly tuitionMinRub: number | null;
  readonly tuitionMaxRub: number | null;
};
```

- **Description**: Represents the state of filters applied to a list of colleges.
- **Fields**:
  - `searchQuery`: Search query string.
  - `selectedCountry`: Resolved country label; `null` indicates all countries.
  - `tuitionMinRub`: Minimum tuition in RUB; `null` if not set.
  - `tuitionMaxRub`: Maximum tuition in RUB; `null` if not set.

## Conclusion

The `college-types.ts` file provides a robust type system for managing college-related data, ensuring consistency and type safety across the application. By defining types for rankings, fees, and other attributes, it facilitates the structured handling of college information.