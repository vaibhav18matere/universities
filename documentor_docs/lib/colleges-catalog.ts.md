# Documentation Guide for `colleges-catalog.ts`

## Overview

The `colleges-catalog.ts` file is a TypeScript module that provides functionality to manage and retrieve information about colleges. It utilizes data from a JSON file containing university records and offers methods to access and manipulate this data.

## Purpose

The primary purpose of this module is to:

1. Retrieve a list of all colleges.
2. Find a specific college by its slug.
3. Generate a list of all college slugs.

## Key Components

### Imports

- **Types**: 
  - `College` and `CollegeRecord` are imported from `./college-types`. These types define the structure of college data used within the module.
  
- **Functions**:
  - `buildColleges` is imported from `./build-colleges`. This function is responsible for transforming raw college records into a structured format.

- **Data**:
  - `universitiesJson` is imported from `../data/universities.json`. This JSON file contains the raw data of university records, which is used as the source for building college information.

### Constants

- **`records`**: 
  - Defined as a `ReadonlyArray<CollegeRecord>`, this constant holds the data from `universitiesJson`, ensuring that the records are immutable.

### Functions

1. **`getAllColleges`**:
   - **Signature**: `getAllColleges(): ReadonlyArray<College>`
   - **Description**: This function returns a list of all colleges. It utilizes the `buildColleges` function to transform the raw `records` into a structured array of `College` objects.
   - **Returns**: A read-only array of `College` objects.

2. **`getCollegeBySlug`**:
   - **Signature**: `getCollegeBySlug(slug: string): College | undefined`
   - **Description**: This function searches for a college by its slug. It iterates over the list of colleges and returns the college object that matches the provided slug. If no match is found, it returns `undefined`.
   - **Parameters**:
     - `slug`: A string representing the unique identifier for a college.
   - **Returns**: A `College` object if a match is found; otherwise, `undefined`.

3. **`getCollegeSlugList`**:
   - **Signature**: `getCollegeSlugList(): ReadonlyArray<string>`
   - **Description**: This function generates a list of all college slugs. It maps over the array of colleges and extracts the `slug` property from each college.
   - **Returns**: A read-only array of strings, each representing a college slug.

## How It Works

1. **Data Initialization**: The module begins by importing necessary types, functions, and data. The `universitiesJson` is cast to a `ReadonlyArray<CollegeRecord>` and stored in the `records` constant.

2. **Building Colleges**: The `getAllColleges` function calls `buildColleges`, passing the `records` to transform them into a structured format of `College` objects.

3. **Retrieving a College by Slug**: The `getCollegeBySlug` function iterates through the list of colleges obtained from `getAllColleges`. It compares each college's `slug` with the provided slug and returns the matching college.

4. **Generating Slug List**: The `getCollegeSlugList` function maps over the list of colleges to extract and return their slugs.

This module provides a straightforward interface for accessing and managing college data, leveraging TypeScript's type safety and immutability features to ensure reliable data handling.