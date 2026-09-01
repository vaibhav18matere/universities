# Documentation Guide for `SiteFooter.tsx`

## Overview

The `SiteFooter.tsx` file defines a React component named `SiteFooter`. This component is responsible for rendering the footer section of a web application. The footer includes various elements such as a logo, contact information, office addresses, and a copyright notice. Additionally, it incorporates components for a newsletter form and a scroll-to-top button.

## Key Components

### 1. `FooterLogoMark`

- **Purpose**: Renders a logo mark within the footer.
- **Structure**: 
  - A `span` element with a flexbox layout to center its contents.
  - Contains an `svg` element that visually represents the logo using several `path` elements with different opacity and fill properties.

### 2. `IconEnvelope`

- **Purpose**: Provides an envelope icon, typically used to represent email contact.
- **Structure**: 
  - An `svg` element with a single `path` element that outlines an envelope shape.

### 3. `IconPhone`

- **Purpose**: Provides a phone icon, used to represent phone contact.
- **Structure**: 
  - An `svg` element with a single `path` element that outlines a phone shape.

### 4. `IconWhatsApp`

- **Purpose**: Provides a WhatsApp icon, used to represent WhatsApp contact.
- **Structure**: 
  - An `svg` element with two `path` elements that outline the WhatsApp logo.

### 5. `SiteFooter`

- **Purpose**: Main component that renders the entire footer section.
- **Structure**:
  - A `footer` element with a class `glass-footer` for styling.
  - Contains several sections:
    - **Logo and Title**: 
      - Uses `FooterLogoMark` to display the logo.
      - Displays the text "University Directory" next to the logo.
    - **Contact Information**:
      - Displays contact options including phone and WhatsApp, each with corresponding icons (`IconPhone` and `IconWhatsApp`).
    - **Office Addresses**:
      - Displays the office address in a paragraph.
    - **Copyright Notice**:
      - Displays the current year and a copyright message.
  - **Additional Components**:
    - `FooterScrollToTop`: A component that likely provides a button to scroll back to the top of the page.

## How It Works

- The `SiteFooter` component is a functional React component that uses JSX to define the structure of the footer.
- It imports and utilizes other components (`FooterNewsletterForm` and `FooterScrollToTop`) to enhance functionality, although `FooterNewsletterForm` is not used in the current implementation.
- The component dynamically retrieves the current year using JavaScript's `Date` object to display in the copyright notice.
- The footer is styled using Tailwind CSS classes, providing a responsive and visually appealing layout.
- Contact links are styled to change color on hover, enhancing user interaction.

## Notes

- Some parts of the code, such as the email contact link and a text paragraph, are commented out and not currently displayed.
- The `FooterNewsletterForm` component is imported but not used in the current implementation of the `SiteFooter`.

This documentation provides a detailed explanation of the `SiteFooter.tsx` file, focusing on its purpose, key components, and functionality as defined in the provided code snippet.