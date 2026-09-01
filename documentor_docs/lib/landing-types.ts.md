# Documentation Guide for `landing-types.ts`

## Overview

The `landing-types.ts` file defines TypeScript types used for structuring data related to a landing page. These types are essential for ensuring that the data conforms to a specific structure, which helps in maintaining consistency and reducing errors during development. The file includes four distinct types: `MegaMenuCountryItem`, `StudyAbroadMenuItem`, `TopUniversityCard`, and `MediaOutletCard`.

## Type Definitions

### 1. MegaMenuCountryItem

```typescript
export type MegaMenuCountryItem = {
  readonly id: string;
  readonly label: string;
  readonly flagEmoji: string;
};
```

#### Purpose
The `MegaMenuCountryItem` type is used to define the structure of an item in a mega menu that represents a country. This type ensures that each country item has a unique identifier, a display label, and an associated flag emoji.

#### Key Components
- `id`: A `string` that uniquely identifies the country item.
- `label`: A `string` representing the name or label of the country.
- `flagEmoji`: A `string` containing the emoji of the country's flag.

### 2. StudyAbroadMenuItem

```typescript
export type StudyAbroadMenuItem = {
  readonly id: string;
  readonly label: string;
  readonly href: string;
};
```

#### Purpose
The `StudyAbroadMenuItem` type is designed to define the structure of a menu item related to studying abroad. This type ensures that each menu item has a unique identifier, a display label, and a hyperlink reference.

#### Key Components
- `id`: A `string` that uniquely identifies the study abroad menu item.
- `label`: A `string` representing the name or label of the menu item.
- `href`: A `string` containing the URL or hyperlink reference associated with the menu item.

### 3. TopUniversityCard

```typescript
export type TopUniversityCard = {
  readonly id: string;
  readonly name: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
};
```

#### Purpose
The `TopUniversityCard` type is used to define the structure of a card component that represents a top university. This type ensures that each card has a unique identifier, a name, and image details for display purposes.

#### Key Components
- `id`: A `string` that uniquely identifies the university card.
- `name`: A `string` representing the name of the university.
- `imageSrc`: A `string` containing the source URL of the university's image.
- `imageAlt`: A `string` providing alternative text for the image, used for accessibility.

### 4. MediaOutletCard

```typescript
export type MediaOutletCard = {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly accentClassName: string;
};
```

#### Purpose
The `MediaOutletCard` type is intended to define the structure of a card component that represents a media outlet. This type ensures that each card has a unique identifier, a title, a subtitle, and a class name for styling purposes.

#### Key Components
- `id`: A `string` that uniquely identifies the media outlet card.
- `title`: A `string` representing the title of the media outlet.
- `subtitle`: A `string` providing additional information or a subtitle for the media outlet.
- `accentClassName`: A `string` containing the class name used for styling the card with specific accent colors or styles.

## Conclusion

The `landing-types.ts` file provides a clear and structured way to define data types for various components on a landing page. By using these types, developers can ensure that the data used in the application is consistent and adheres to the expected format, which is crucial for maintaining the integrity and functionality of the application.