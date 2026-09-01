# Documentation Guide for `landing-types.ts`

This document provides a detailed explanation of the TypeScript types defined in the `landing-types.ts` file. These types are used to structure data related to a landing page, specifically for handling menu items and card components. The file is located at `lib/landing-types.ts`.

## Purpose

The primary purpose of this file is to define TypeScript types that ensure type safety and consistency when dealing with specific data structures used in a landing page. These types are used to represent menu items and card components, which are likely part of a user interface for a web application.

## Key Components

The file defines four distinct TypeScript types:

1. **MegaMenuCountryItem**
2. **StudyAbroadMenuItem**
3. **TopUniversityCard**
4. **MediaOutletCard**

Each type is described in detail below.

### 1. MegaMenuCountryItem

```typescript
export type MegaMenuCountryItem = {
  readonly id: string;
  readonly label: string;
  readonly flagEmoji: string;
};
```

- **Purpose**: Represents an item in a mega menu that lists countries.
- **Properties**:
  - `id`: A unique identifier for the country item. It is a string and is marked as `readonly`, meaning it cannot be modified after initialization.
  - `label`: A string representing the name or label of the country.
  - `flagEmoji`: A string containing the emoji representation of the country's flag.

### 2. StudyAbroadMenuItem

```typescript
export type StudyAbroadMenuItem = {
  readonly id: string;
  readonly label: string;
  readonly href: string;
};
```

- **Purpose**: Represents a menu item for studying abroad options.
- **Properties**:
  - `id`: A unique identifier for the menu item. It is a string and is marked as `readonly`.
  - `label`: A string representing the name or label of the study abroad option.
  - `href`: A string containing the URL or link associated with the menu item.

### 3. TopUniversityCard

```typescript
export type TopUniversityCard = {
  readonly id: string;
  readonly name: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
};
```

- **Purpose**: Represents a card component for displaying information about a top university.
- **Properties**:
  - `id`: A unique identifier for the university card. It is a string and is marked as `readonly`.
  - `name`: A string representing the name of the university.
  - `imageSrc`: A string containing the source URL of the university's image.
  - `imageAlt`: A string providing alternative text for the image, used for accessibility purposes.

### 4. MediaOutletCard

```typescript
export type MediaOutletCard = {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly accentClassName: string;
};
```

- **Purpose**: Represents a card component for displaying information about a media outlet.
- **Properties**:
  - `id`: A unique identifier for the media outlet card. It is a string and is marked as `readonly`.
  - `title`: A string representing the title of the media outlet.
  - `subtitle`: A string providing additional information or a subtitle for the media outlet.
  - `accentClassName`: A string containing a CSS class name used to style the card with an accent.

## How It Works

These types are used to enforce structure and type safety in a TypeScript project. By defining these types, developers can ensure that objects representing menu items and card components adhere to a consistent format. This helps prevent errors and improves code readability and maintainability.

Each type is marked with `readonly` properties, indicating that once an object is created, its properties cannot be changed. This immutability is beneficial for maintaining data integrity throughout the application.

## Conclusion

The `landing-types.ts` file provides essential type definitions for handling structured data related to a landing page's menu items and card components. By using these types, developers can create robust and type-safe applications, ensuring consistency and reducing the likelihood of runtime errors.