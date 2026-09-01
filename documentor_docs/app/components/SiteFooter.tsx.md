# Documentation Guide for `SiteFooter.tsx`

## Overview

The `SiteFooter.tsx` file defines a React component named `SiteFooter`. This component is responsible for rendering the footer section of a web application. The footer includes branding, contact information, office addresses, and a scroll-to-top feature. The component utilizes several sub-components and SVG icons to achieve its functionality.

## Key Components

### 1. `FooterLogoMark`

- **Purpose**: Renders a logo mark within the footer.
- **Structure**: 
  - A `span` element with a flexbox layout, rounded corners, and background color defined by the `bg-accent` class.
  - Contains an SVG graphic with multiple `path` elements to form the logo design.

### 2. `IconEnvelope`

- **Purpose**: Represents an envelope icon, typically used for email links.
- **Structure**: 
  - An SVG element with a `viewBox` of `0 0 24 24`.
  - Contains a single `path` element that outlines the shape of an envelope.

### 3. `IconPhone`

- **Purpose**: Represents a phone icon, used for telephone links.
- **Structure**: 
  - An SVG element with a `viewBox` of `0 0 24 24`.
  - Contains a single `path` element that outlines the shape of a phone.

### 4. `IconWhatsApp`

- **Purpose**: Represents a WhatsApp icon, used for WhatsApp contact links.
- **Structure**: 
  - An SVG element with a `viewBox` of `0 0 24 24`.
  - Contains two `path` elements that outline the shape of the WhatsApp logo.

### 5. `SiteFooter`

- **Purpose**: Main component that renders the footer section of the site.
- **Structure**:
  - A `footer` element with a class of `glass-footer`, providing styling and layout.
  - Contains several sections:
    - **Branding Section**: Displays the `FooterLogoMark` and the text "University Directory".
    - **Contact Section**: Provides contact information with icons for phone and WhatsApp. The email link is commented out.
    - **Office Addresses Section**: Displays the office address in Nashik, Maharashtra, India.
    - **Footer Bottom Section**: Displays copyright information with the current year.
  - Includes the `FooterScrollToTop` component to enable a scroll-to-top feature.

## How It Works

- The `SiteFooter` component is structured using a combination of flexbox and grid layouts to ensure responsive design.
- The component dynamically retrieves the current year using `new Date().getFullYear()` and displays it in the copyright section.
- The contact section includes interactive links for phone and WhatsApp, styled with transition effects for hover states.
- The `FooterScrollToTop` component is included at the bottom of the footer to provide users with a convenient way to scroll back to the top of the page.

## Usage

To use the `SiteFooter` component, import it into the desired file and include it within the JSX of your application. Ensure that the necessary CSS classes and styles are defined in your project's stylesheet to achieve the intended design and layout.