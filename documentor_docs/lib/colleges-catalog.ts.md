# Documentation Guide for `colleges-catalog.ts`

## Overview

The `colleges-catalog.ts` file is a TypeScript module that provides functionality to manage and retrieve information about colleges. It utilizes data from a JSON file containing university records and offers methods to access and manipulate this data. The primary purpose of this module is to facilitate the retrieval of college information based on specific criteria, such as a unique slug identifier.

## Key Components

### Imports

- **Types**: 
  - `College` and `CollegeRecord` are imported from `./college-types`. These types are used to define the structure of college data within the module.
  
- **Functions**:
  - `buildColleges` is imported from `./build-colleges`. This function is responsible for transforming raw college records into a structured format.

- **Data**:
  - `universitiesJson` is imported from `../data/universities.json`. This JSON file contains the raw data of universities, which is used as the source for building college records.

### Constants

- **`records`**: 
  - Defined as a `ReadonlyArray<CollegeRecord>`, this constant holds the data from `universitiesJson`. It ensures that the data is immutable and cannot be altered within the module.

## Functions

### `getAllColleges`

```typescript
export function getAllColleges(): ReadonlyArray<College>
```

- **Purpose**: 
  - This function returns a list of all colleges by transforming the raw records into a structured format using the `buildColleges` function.

- **Returns**: 
  - A `ReadonlyArray` of `College` objects, ensuring that the list of colleges is immutable.

### `getCollegeBySlug`

```typescript
export function getCollegeBySlug(slug: string): College | undefined
```

- **Purpose**: 
  - This function retrieves a specific college based on its unique slug identifier.

- **Parameters**: 
  - `slug`: A `string` representing the unique identifier for a college.

- **Returns**: 
  - A `College` object if a match is found; otherwise, `undefined`.

- **Logic**: 
  - The function iterates over the list of colleges obtained from `getAllColleges`. It compares each college's slug with the provided slug and returns the matching college if found.

### `getCollegeSlugList`

```typescript
export function getCollegeSlugList(): ReadonlyArray<string>
```

- **Purpose**: 
  - This function provides a list of all college slugs.

- **Returns**: 
  - A `ReadonlyArray` of `string`, containing the slugs of all colleges.

- **Logic**: 
  - It maps over the list of colleges obtained from `getAllColleges` and extracts the `slug` property from each college.

## Summary

The `colleges-catalog.ts` module is designed to manage college data efficiently. It provides methods to retrieve all colleges, find a college by its slug, and obtain a list of all college slugs. The module ensures data integrity by using immutable data structures and relies on external functions and data to perform its operations.