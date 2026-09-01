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

- **Description**: Enumerates the possible currencies for fees, specifically Russian Ruble (RUB) and US Dollar (USD).

### 3. MessChargesParsed

```typescript
export type MessChargesParsed =
  | { readonly kind: "amount"; readonly amountUsd: number }
  | { readonly kind: "not_available" };
```

- **Description**: Represents the parsed mess charges, which can either be a specific amount in USD or marked as not available.
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

- **Description**: Represents a parsed monetary field, which can either be a specific amount or marked as not available.
- **Variants**:
  - `amount`: Contains detailed information about the monetary amount, including its raw display, numerical value, currency, and conversion to RUB.
  - `not_available`: Indicates that the monetary information is not available.

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

- **Description**: Represents the basic record structure for a college.
- **Fields**:
  - `id`: Unique identifier for the college.
  - `universityName`: Name of the university.
  - `imageSrc`: Source URL for the college's cover photo.
  - `country`: Country where the college is located.
  - `webometricsRanking`: Optional Webometrics ranking information.
  - `tuitionFeesRaw`: Raw string representation of tuition fees.
  - `hostelFeesRaw`: Raw string representation of hostel fees.
  - `medicalBundleRub`: Medical bundle cost in RUB.
  - `otcChargesUsd`: Over-the-counter charges in USD.
  - `messChargesRaw`: Raw string representation of mess charges.
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

- **Description**: Extends `CollegeRecord` to include additional fields for a more comprehensive college representation.
- **Additional Fields**:
  - `slug`: URL-friendly identifier for the college.
  - `tuition`: Parsed tuition fee information.
  - `hostel`: Parsed hostel fee information.
  - `messCharges`: Parsed mess charges information.
  - `imageSrc`: Source URL for the college's cover photo, always set after build.

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
  - `searchQuery`: The search query string used for filtering.
  - `selectedCountry`: The selected country for filtering, or `null` for all countries.
  - `tuitionMinRub`: Minimum tuition fee in RUB for filtering, or `null` if not set.
  - `tuitionMaxRub`: Maximum tuition fee in RUB for filtering, or `null` if not set.

## Conclusion

The `college-types.ts` file provides a robust type system for managing college-related data, ensuring consistency and type safety across the application. By defining these types, developers can work with college data more effectively, leveraging TypeScript's type-checking capabilities to prevent errors and improve code quality.