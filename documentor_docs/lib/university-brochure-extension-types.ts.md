# Documentation Guide for `university-brochure-extension-types.ts`

This document provides a detailed explanation of the TypeScript file `university-brochure-extension-types.ts`. This file defines TypeScript types used to represent optional marketing or brochure information for university detail pages. The types are designed to structure data related to university brochures, specifically focusing on tuition details and other relevant information.

## Purpose

The primary purpose of this file is to define TypeScript types that encapsulate the structure of brochure-related data for universities. These types are used to ensure that the data conforms to a specific format, which is crucial for maintaining consistency and reliability in applications that display university brochures.

## Key Components

### 1. `BrochureTuitionYearRow`

This type represents a single row of tuition information for a specific year. It includes the following properties:

- **`yearNumber`**: A `number` representing the academic year. This is a read-only property, indicating that once set, it cannot be modified.
  
- **`feeRubDisplay`**: A `string` representing the tuition fee for the year, displayed in Russian Rubles (RUB). This is a read-only property.
  
- **`feeInrDisplay`**: A `string` representing the tuition fee for the year, displayed in Indian Rupees (INR). This is a read-only property.

### 2. `UniversityBrochureExtension`

This type encapsulates various optional and required properties related to a university's brochure. It includes the following properties:

- **`brochureTagline?`**: An optional `string` that provides an additional line under the brochure introduction. This could be used for notes such as "mess compulsory."

- **`tuitionYearsSectionTitle?`**: An optional `string` that allows customization of the section title for tuition by year. This overrides the default title "Tuition by year (6 years)" if the program length is different.

- **`totalTuitionBannerTitle?`**: An optional `string` that allows customization of the banner label for total tuition. This overrides the default label "Total tuition (6 years, INR)."

- **`courseDurationSummary`**: A `string` providing a summary of the course duration. This is a required field.

- **`processingFeesInrDisplay`**: A `string` representing the processing fees displayed in Indian Rupees (INR). This is a required field.

- **`inclusionItems`**: A `ReadonlyArray<string>` listing items included in the brochure. This is a required field and is read-only.

- **`tuitionYearRows`**: A `ReadonlyArray<BrochureTuitionYearRow>` containing rows of tuition information for each year. This is a required field and is read-only.

- **`totalTuitionSixYearsInrDisplay`**: A `string` representing the total tuition fee for six years, displayed in Indian Rupees (INR). This is a required field.

- **`notes`**: A `ReadonlyArray<string>` containing additional notes related to the brochure. This is a required field and is read-only.

- **`contactPhoneNumbers`**: A `ReadonlyArray<string>` listing contact phone numbers for further inquiries. This is a required field and is read-only.

## How It Works

The types defined in this file are used to structure data related to university brochures. By using these types, developers can ensure that the data adheres to a specific format, which is crucial for rendering consistent and accurate information on university detail pages. The use of read-only properties and arrays ensures that once the data is set, it cannot be inadvertently modified, thus preserving data integrity.

These types are particularly useful in applications where university brochures are dynamically generated or displayed, as they provide a clear contract for the data structure, making it easier to manage and manipulate brochure-related information.