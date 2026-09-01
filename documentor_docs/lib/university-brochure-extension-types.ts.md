# Documentation Guide for `university-brochure-extension-types.ts`

This document provides a detailed explanation of the TypeScript file `university-brochure-extension-types.ts`. This file defines types used to represent optional marketing or brochure information for university detail pages. The types are designed to structure data related to university brochures, specifically focusing on tuition details and other relevant information.

## Purpose

The primary purpose of this file is to define TypeScript types that structure the data for university brochures. These types are used to ensure that the data conforms to a specific format, which is crucial for maintaining consistency and reliability in applications that display university information.

## Key Components

### 1. `BrochureTuitionYearRow`

This type represents a single row of tuition information for a specific year. It includes the following properties:

- **`yearNumber`**: A `number` representing the academic year. This is a read-only property, indicating that once set, it cannot be modified.
  
- **`feeRubDisplay`**: A `string` that displays the tuition fee in Russian Rubles. This is also a read-only property.
  
- **`feeInrDisplay`**: A `string` that displays the tuition fee in Indian Rupees. This is a read-only property.

### 2. `UniversityBrochureExtension`

This type encapsulates various optional and required fields that extend the information provided in a university brochure. It includes the following properties:

- **`brochureTagline?`**: An optional `string` that provides an additional line under the brochure introduction. This could be used for notes such as "mess compulsory."

- **`tuitionYearsSectionTitle?`**: An optional `string` that allows customization of the section title for tuition by year. This overrides the default title "Tuition by year (6 years)" if the program length is different.

- **`totalTuitionBannerTitle?`**: An optional `string` that allows customization of the banner label for total tuition. This overrides the default label "Total tuition (6 years, INR)."

- **`courseDurationSummary`**: A `string` summarizing the duration of the course. This is a required field.

- **`processingFeesInrDisplay`**: A `string` displaying the processing fees in Indian Rupees. This is a required field.

- **`inclusionItems`**: A `ReadonlyArray<string>` listing items included in the brochure. This is a required field and is read-only.

- **`tuitionYearRows`**: A `ReadonlyArray<BrochureTuitionYearRow>` containing rows of tuition information for each year. This is a required field and is read-only.

- **`totalTuitionSixYearsInrDisplay`**: A `string` displaying the total tuition fee for six years in Indian Rupees. This is a required field.

- **`notes`**: A `ReadonlyArray<string>` containing additional notes related to the brochure. This is a required field and is read-only.

- **`contactPhoneNumbers`**: A `ReadonlyArray<string>` listing contact phone numbers for further inquiries. This is a required field and is read-only.

## How It Works

The types defined in this file are used to ensure that any data related to university brochures adheres to a specific structure. By using TypeScript's type system, developers can catch errors at compile time, ensuring that the data used in applications is consistent and reliable. The read-only properties further enforce immutability, preventing accidental modifications to critical data once it has been set.

These types are particularly useful in applications that need to display detailed university information, allowing for customization and localization of tuition details and other brochure-related content.