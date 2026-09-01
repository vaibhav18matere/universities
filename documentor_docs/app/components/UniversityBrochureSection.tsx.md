# UniversityBrochureSection Component Documentation

## Overview

The `UniversityBrochureSection` component is a React functional component designed to display a detailed section of a university brochure. It utilizes TypeScript for type safety and is styled using Tailwind CSS classes. The component is responsible for rendering various sections of a university brochure, including program overview, course duration, processing fees, tuition details, and contact information.

## Purpose

The primary purpose of the `UniversityBrochureSection` component is to present information about a university program in a structured and visually appealing manner. It displays key details such as course duration, processing fees, tuition by year, and contact information, all of which are derived from the `UniversityBrochureExtension` type.

## Key Components

### Props

- **`extension`**: An object of type `UniversityBrochureExtension`. This prop contains all the necessary data to populate the brochure section, including course details, fees, and contact information.

### Helper Function

- **`phoneDigitsToTelHref(digits: string): string`**: A utility function that converts a string of phone digits into a `tel:` hyperlink format. It strips non-numeric characters and formats the number for dialing, assuming an Indian country code (`+91`) for 10-digit numbers.

### Rendered Sections

1. **Program Overview**
   - Displays a heading and a brief description of the program.
   - Optionally shows a brochure tagline if provided in the `extension`.

2. **Course Duration and Processing Fees**
   - Two separate sections displaying the course duration and processing fees using data from the `extension`.

3. **Processing Coverage**
   - Lists items included in the processing fees, using the `inclusionItems` array from the `extension`.

4. **Tuition by Year**
   - Displays tuition fees per year. It adapts to different screen sizes by showing a list on smaller screens and a table on larger screens.
   - Uses `tuitionYearRows` from the `extension` to populate the data.

5. **Total Tuition**
   - Shows the total tuition cost over six years, using the `totalTuitionSixYearsInrDisplay` from the `extension`.

6. **Important Notes**
   - Lists important notes related to the program, using the `notes` array from the `extension`.

7. **Contact Information**
   - Displays contact phone numbers as clickable links, formatted using the `phoneDigitsToTelHref` function.

## Styling

The component uses Tailwind CSS for styling, providing a responsive and visually consistent design. It includes styles for both light and dark themes, ensuring readability and aesthetic appeal across different user preferences.

## Usage

To use the `UniversityBrochureSection` component, import it into a React application and provide it with the necessary `extension` prop containing the university brochure data. Ensure that the data structure matches the `UniversityBrochureExtension` type to avoid type errors.

```tsx
import { UniversityBrochureSection } from 'path/to/UniversityBrochureSection';
import type { UniversityBrochureExtension } from 'path/to/university-brochure-extension-types';

const brochureData: UniversityBrochureExtension = {
  // Populate with appropriate data
};

function App() {
  return (
    <div>
      <UniversityBrochureSection extension={brochureData} />
    </div>
  );
}
```

This component is designed to be flexible and reusable, making it suitable for displaying university brochure information in various contexts within a React application.