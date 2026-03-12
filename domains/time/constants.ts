import { SelectOption } from "@/components/feature/menu-dropdown/radio-group";

export const days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;

export const dayAbbreviations = [
  "sun",
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
] as const;

export const dayOptions: SelectOption[] = [
  { label: "Monday", value: "monday" },
  { label: "Tuesday", value: "tuesday" },
  { label: "Wednesday", value: "wednesday" },
  { label: "Thursday", value: "thursday" },
  { label: "Friday", value: "friday" },
  { label: "Saturday", value: "saturday" },
  { label: "Sunday", value: "sunday" },
];
