# Documentation Guide for `not-found.tsx`

## Overview

The `not-found.tsx` file is a React component designed to handle 404 errors specifically for the college pages within a Next.js application. When a user navigates to a college page that does not exist, this component is rendered to inform the user that the requested university page could not be found.

## File Path

```
app/colleges/[slug]/not-found.tsx
```

## Purpose

The primary purpose of this component is to provide a user-friendly message when a college page is not found. It serves as a custom 404 error page for the college section of the application, guiding users back to the main browsing page.

## Key Components

### Import Statements

- **`Link` from `next/link`:** This is a Next.js component used for client-side navigation. It allows users to navigate to different pages within the application without a full page reload.

### `CollegeNotFound` Component

This is the default exported function component that renders the 404 error message for the college pages.

#### JSX Structure

- **Container `<div>`:**
  - The outermost `<div>` uses utility classes to style the component. It centers the content both vertically and horizontally, with responsive padding and text alignment.
  - Classes used:
    - `mx-auto`: Centers the component horizontally.
    - `flex`, `flex-col`: Utilizes Flexbox for layout, arranging children in a column.
    - `min-h-[60vh]`: Sets a minimum height of 60% of the viewport height.
    - `w-full`, `max-w-lg`: Sets the width to full and limits the maximum width to a large size.
    - `items-center`, `justify-center`: Centers the content within the flex container.
    - `gap-6`: Adds space between child elements.
    - `px-4`, `py-16`, `sm:px-6`: Adds padding with responsive adjustments.
    - `text-center`: Centers the text.

- **404 Indicator `<div>`:**
  - Displays a "404" message indicating the page is not found.
  - Styled with rounded borders, background color, and text styling for visibility.
  - Classes used:
    - `rounded-full`, `border`, `border-slate-200`, `bg-surface-muted`: Styles the border and background.
    - `px-4`, `py-1.5`: Adds padding.
    - `text-xs`, `font-bold`, `uppercase`, `tracking-wide`, `text-slate-500`: Styles the text.
    - Dark mode styles: `dark:border-slate-700`, `dark:bg-slate-800`, `dark:text-slate-400`.

- **Message Container `<div>`:**
  - Contains the main message and description.
  - Classes used:
    - `space-y-3`: Adds vertical spacing between elements.

- **Heading `<h1>`:**
  - Displays the main message "University not found".
  - Styled for emphasis and responsiveness.
  - Classes used:
    - `text-2xl`, `font-bold`, `text-slate-900`, `sm:text-3xl`: Styles the text size and weight.
    - Dark mode style: `dark:text-slate-50`.

- **Description `<p>`:**
  - Provides additional context about the missing page.
  - Classes used:
    - `text-pretty`, `text-sm`, `leading-relaxed`, `text-slate-600`, `sm:text-base`: Styles the text size and line height.
    - Dark mode style: `dark:text-slate-400`.

- **Back to Browse Link `<Link>`:**
  - A link that navigates users back to the main browsing page.
  - Styled as a button with hover and active states.
  - Classes used:
    - `inline-flex`, `min-h-12`, `w-full`, `max-w-xs`: Styles the button size and layout.
    - `items-center`, `justify-center`: Centers the text within the button.
    - `rounded-2xl`, `bg-accent`, `px-6`, `py-3`: Styles the button shape and background.
    - `text-sm`, `font-semibold`, `text-accent-foreground`: Styles the button text.
    - `shadow-lg`, `shadow-indigo-500/25`: Adds shadow effects.
    - `transition`, `hover:brightness-110`, `active:scale-[0.98]`: Adds interactive effects.
    - Dark mode shadow: `dark:shadow-indigo-900/40`.

## How It Works

When a user attempts to access a college page that does not exist, the `CollegeNotFound` component is rendered. It displays a 404 error message, a brief explanation, and a link to return to the main browsing page. The component is styled to be responsive and visually appealing, with support for dark mode. The use of the `Link` component from Next.js ensures smooth client-side navigation back to the homepage.