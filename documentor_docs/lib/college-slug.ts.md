# Documentation Guide for `college-slug.ts`

## Overview

The `college-slug.ts` file contains utility functions designed to generate and manage URL-friendly slugs for university names. These slugs are typically used in web applications to create readable and SEO-friendly URLs. The file provides two main functions: `universityNameToBaseSlug` and `ensureUniqueSlug`.

## Functions

### 1. `universityNameToBaseSlug`

#### Purpose

The `universityNameToBaseSlug` function converts a given university name into a base slug. A slug is a URL-friendly string that is typically used in web addresses. This function ensures that the generated slug is lowercase, alphanumeric, and hyphen-separated.

#### Parameters

- `universityName: string`: The name of the university that needs to be converted into a slug.

#### Returns

- `string`: A URL-friendly slug derived from the university name.

#### How It Works

1. **Convert to Lowercase**: The function first converts the entire university name to lowercase to ensure uniformity.
2. **Normalize Unicode**: It normalizes the string using the "NFKD" form to separate characters from their diacritics.
3. **Remove Diacritics**: The function removes any diacritical marks (accents) from the characters.
4. **Replace Non-Alphanumeric Characters**: It replaces any sequence of non-alphanumeric characters with a single hyphen (`-`).
5. **Trim Hyphens**: Finally, it trims any leading or trailing hyphens from the resulting string.

#### Example

```typescript
const slug = universityNameToBaseSlug("École Polytechnique");
console.log(slug); // Output: "ecole-polytechnique"
```

### 2. `ensureUniqueSlug`

#### Purpose

The `ensureUniqueSlug` function ensures that a given base slug is unique within a set of already taken slugs. If the base slug is already taken, it appends a numeric suffix to create a unique variant.

#### Parameters

- `baseSlug: string`: The initial slug that needs to be checked for uniqueness.
- `takenSlugs: ReadonlySet<string>`: A set of slugs that are already in use and should not be duplicated.

#### Returns

- `string`: A unique slug that is not present in the `takenSlugs` set.

#### How It Works

1. **Check Base Slug**: The function first checks if the `baseSlug` is not present in the `takenSlugs` set. If it is unique, it returns the `baseSlug`.
2. **Generate Unique Slug**: If the `baseSlug` is already taken, the function enters a loop to find a unique slug:
   - It starts with a suffix of `2` and appends it to the `baseSlug`.
   - It checks if this new candidate slug is unique.
   - If not, it increments the suffix and checks again.
   - This process repeats until a unique slug is found.

#### Example

```typescript
const takenSlugs = new Set(["harvard-university", "harvard-university-2"]);
const uniqueSlug = ensureUniqueSlug("harvard-university", takenSlugs);
console.log(uniqueSlug); // Output: "harvard-university-3"
```

## Conclusion

The `college-slug.ts` file provides essential utilities for generating and managing slugs for university names. The `universityNameToBaseSlug` function creates a clean, URL-friendly base slug, while the `ensureUniqueSlug` function ensures that the slug is unique within a given set. These functions are crucial for maintaining readable and SEO-friendly URLs in web applications.