# QUICKSTART.md

## Overview

This document provides a quick start guide for setting up the project. Please follow the steps below to ensure a smooth installation and configuration process.

## Setup and Installation

Unfortunately, the provided code snippets do not include explicit instructions for setting up or installing the project. The snippets primarily focus on utility functions and configuration settings related to themes and image handling.

## Environment Variables

The provided snippets do not specify any environment variables. Ensure to check other parts of the repository or documentation for any necessary environment configurations.

## Configuration

The project uses a `NextConfig` configuration for handling images. Below is the relevant configuration extracted from the code:

```javascript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
```

This configuration allows images to be loaded from `images.unsplash.com` using HTTPS.

## Theme Mode

The project supports two theme modes: "light" and "dark". The function `isThemeMode` checks if a given value is a valid theme mode:

```javascript
export type ThemeMode = "light" | "dark";

function isThemeMode(value: string | null): value is ThemeMode {
  return value === "light" || value === "dark";
}
```

## Path Utilities

The project includes utility functions for building paths related to universities:

- `buildUniversitiesHubPath`: Returns the path to the universities hub.
  
  ```javascript
  function buildUniversitiesHubPath(): string {
    return "/universities";
  }
  ```

- `buildUniversitiesCountryPath`: Constructs a path for a specific country's universities using a `countryRouteId`.

  ```javascript
  function buildUniversitiesCountryPath(countryRouteId: string): string {
    return `/universities/${countryRouteId}`;
  }
  ```

## Conclusion

The provided snippets do not contain comprehensive setup or installation instructions. For a complete setup guide, please refer to other sections of the repository or accompanying documentation.