# Documentation Guide for `SiteHeader.tsx`

## Overview

The `SiteHeader.tsx` file is a React component that defines the header section of a web application. This component is responsible for rendering the site's navigation bar, which includes links to various sections of the site, a theme toggle, and contact options. It also supports a mobile navigation drawer for smaller screens.

## Key Components

### Imports

- **ThemeToggle**: A component imported from `@/app/components/ThemeToggle` that allows users to switch between different themes.
- **Link**: A component from `next/link` used for client-side navigation.
- **React Hooks**: `useEffect`, `useRef`, and `useState` are used for managing component state and lifecycle.
- **Utility Functions**: `buildUniversitiesCountryPath` and `buildUniversitiesHubPath` are imported from `@/lib/mega-menu-country-routes` to generate paths for university-related links.
- **Static Data**: `megaMenuCountries` is imported from `@/lib/landing-static` but not used in the current code.

### Components

1. **LogoMark**: A functional component that renders the logo of the site as an SVG within a styled span element.

2. **Icon Components**: Several SVG icon components are defined for various UI elements, including:
   - `IconKey`
   - `IconHeadset`
   - `IconPhone`
   - `IconWhatsApp`
   - `IconChevronDown`
   - `IconMenu`
   - `IconClose`
   - `IconNavChevron`
   - `IconHomeNav`
   - `IconAboutNav`
   - `IconUniversitiesNav`
   - Social media icons: `SocialIconFacebook`, `SocialIconLinkedIn`, `SocialIconInstagram`, `SocialIconYouTube`, `SocialIconMail`

3. **MobileNavIcon**: A component that selects and renders the appropriate icon based on the `iconKind` prop.

4. **MobileNavDrawer**: A component that renders a mobile navigation drawer. It includes:
   - A backdrop that closes the drawer when clicked.
   - A navigation panel with links to different sections of the site.
   - Contact options for calling or chatting on WhatsApp.
   - A theme toggle for changing the site's appearance.

5. **SiteHeader**: The main component that renders the header. It includes:
   - A logo and site title.
   - A theme toggle button.
   - A mobile menu button that toggles the `MobileNavDrawer`.
   - A navigation bar with links to "Home", "About", and "Universities".
   - Contact options for phone and WhatsApp.

### State Management

- **activeMenu**: A state variable to track the currently active menu, initialized to `null`.
- **mobileMenuOpen**: A state variable to track whether the mobile menu is open, initialized to `false`.

### Event Handling

- **closeMobileMenu**: A function to close the mobile menu by setting `mobileMenuOpen` to `false`.
- **useEffect Hooks**: 
  - One hook manages the body's overflow style and listens for the "Escape" key to close the mobile menu.
  - Another hook listens for clicks outside the countries menu to close it and also listens for the "Escape" key.

## How It Works

- The `SiteHeader` component renders a header with a logo, navigation links, and contact options.
- On mobile devices, a hamburger button toggles the `MobileNavDrawer`, which slides in from the side.
- The `MobileNavDrawer` contains links to different sections of the site and contact options.
- The `ThemeToggle` component allows users to switch between themes.
- The header is styled with Tailwind CSS classes for responsiveness and theming.

## Conclusion

The `SiteHeader.tsx` component provides a responsive and interactive header for a web application, featuring navigation links, a theme toggle, and contact options. It adapts to different screen sizes by providing a mobile navigation drawer.