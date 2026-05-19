import type {
  MediaOutletCard,
  MegaMenuCountryItem,
  StudyAbroadMenuItem,
  TopUniversityCard,
} from "@/lib/landing-types";

export const megaMenuCountries: ReadonlyArray<MegaMenuCountryItem> = [
  { id: "russia", label: "Russia", flagEmoji: "🇷🇺" },
  { id: "georgia", label: "Georgia", flagEmoji: "🇬🇪" },
  { id: "kazakhstan", label: "Kazakhstan", flagEmoji: "🇰🇿" },
  { id: "uzbekistan", label: "Uzbekistan", flagEmoji: "🇺🇿" },
  { id: "egypt", label: "Egypt", flagEmoji: "🇪🇬" },
];

export const studyAbroadMenuItems: ReadonlyArray<StudyAbroadMenuItem> = [
  { id: "mbbs", label: "MBBS abroad", href: "/#directory" },
  { id: "compare", label: "Compare universities", href: "/#directory" },
  { id: "fees", label: "Fees & hostel", href: "/#directory" },
];

export const topUniversityCards: ReadonlyArray<TopUniversityCard> = [
  {
    id: "perm",
    name: "Perm State Medical University",
    imageSrc:
      "https://images.unsplash.com/photo-1564981797816-1049734bb820?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Historic university building with columns",
  },
  {
    id: "orenburg",
    name: "Orenburg State Medical University",
    imageSrc:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
    imageAlt: "University campus courtyard",
  },
  {
    id: "mari",
    name: "Mari State University",
    imageSrc:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Graduation ceremony at a university",
  },
];

export const mediaOutletCards: ReadonlyArray<MediaOutletCard> = [
  {
    id: "dainik",
    title: "दैनिक भास्कर",
    subtitle: "Dainik Bhaskar",
    accentClassName: "bg-amber-400",
  },
  {
    id: "collegedunia",
    title: "collegedunia",
    subtitle: "College search & reviews",
    accentClassName: "bg-sky-500",
  },
  {
    id: "toi",
    title: "THE TIMES OF INDIA",
    subtitle: "National daily",
    accentClassName: "bg-slate-800",
  },
];
