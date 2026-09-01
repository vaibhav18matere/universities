# Documentation Guide for `SiteHeader.tsx`

## Overview

The `SiteHeader.tsx` file is a React component that defines the header section of a web application. This component is responsible for rendering the site's navigation bar, which includes links to various sections of the site, a theme toggle, and contact options. It also supports a mobile navigation drawer for smaller screens.

## Key Components

### Imports

- **ThemeToggle**: A component imported from `@/app/components/ThemeToggle` that allows users to switch between different themes.
- **Link**: A component from `next/link` used for client-side navigation.
- **React Hooks**: `useEffect`, `useRef`, and `useState` are used for managing component state and lifecycle events.
- **Utility Functions**: `buildUniversitiesCountryPath` and `buildUniversitiesHubPath` are imported from `@/lib/mega-menu-country-routes` to generate paths for university-related navigation.

### Type Definitions

- **HeaderMenuKey**: A TypeScript type that can be either `"countries"` or `null`.
- **MobileNavIconKind**: A type that can be `"home"`, `"about"`, or `"universities"`.
- **MobileNavItem**: An object type with properties `href`, `label`, `description`, and `iconKind`.

### Components

#### LogoMark

A functional component that returns an SVG logo for the site. It is used in both the desktop and mobile headers.

#### Icon Components

Several SVG icon components are defined for use throughout the header:

- **IconKey**
- **IconHeadset**
- **IconPhone**
- **IconWhatsApp**
- **IconChevronDown**
- **IconMenu**
- **IconClose**
- **IconNavChevron**
- **IconHomeNav**
- **IconAboutNav**
- **IconUniversitiesNav**

These icons are used for navigation links, buttons, and social media links.

#### MobileNavIcon

A component that returns the appropriate icon based on the `iconKind` prop, which can be `"home"`, `"about"`, or `"universities"`.

#### MobileNavDrawer

A component that renders a mobile navigation drawer. It includes:

- A backdrop that closes the drawer when clicked.
- A navigation panel with links to different sections of the site.
- A close button to hide the drawer.

#### Social Icons

SVG components for social media icons:

- **SocialIconFacebook**
- **SocialIconLinkedIn**
- **SocialIconInstagram**
- **SocialIconYouTube**
- **SocialIconMail**

These are used for linking to social media profiles and email.

### Main Component: `SiteHeader`

The `SiteHeader` component is the main export of the file. It manages the state and behavior of the header, including:

- **State Management**: Uses `useState` to manage `activeMenu` and `mobileMenuOpen` states.
- **Effect Hooks**: Uses `useEffect` to handle side effects related to the mobile menu and active menu.
- **Event Handlers**: Functions like `closeMobileMenu` are defined to handle user interactions.

### JSX Structure

- **Header Element**: The main container for the header, styled with classes for layout and appearance.
- **Mobile Header**: Contains the logo, theme toggle, and a button to open the mobile navigation drawer.
- **MobileNavDrawer**: Conditionally rendered based on the `mobileMenuOpen` state.
- **Desktop Header**: Contains the logo, contact information, and primary navigation links.

## How It Works

1. **Responsive Design**: The header adapts to different screen sizes, showing a mobile navigation drawer on smaller screens.
2. **State Management**: The component uses React state to manage the visibility of the mobile menu and the active menu item.
3. **Event Handling**: Event listeners are added and removed using `useEffect` to handle keyboard and pointer events for closing menus.
4. **Navigation**: Uses `next/link` for client-side navigation, allowing for fast transitions between pages.
5. **Theme Toggle**: Integrates a theme toggle component to switch between light and dark modes.

## Conclusion

The `SiteHeader.tsx` component is a comprehensive header solution for a web application, providing navigation, theme toggling, and contact options in a responsive design. It leverages React's state and effect hooks to manage interactions and ensure a smooth user experience.