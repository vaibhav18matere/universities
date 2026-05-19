export type MegaMenuCountryItem = {
  readonly id: string;
  readonly label: string;
  readonly flagEmoji: string;
};

export type StudyAbroadMenuItem = {
  readonly id: string;
  readonly label: string;
  readonly href: string;
};

export type TopUniversityCard = {
  readonly id: string;
  readonly name: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
};

export type MediaOutletCard = {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly accentClassName: string;
};
