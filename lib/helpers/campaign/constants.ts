import type { Writeable } from "@/lib/type-helpers";
import { add } from "date-fns";

const $targetCountries = ["Nigeria", "Ghana", "Mali", "Liberia", "Cameroon", "Gambia"] as const;

export const targetCountries = $targetCountries as Writeable<typeof $targetCountries>;

export const DATE_TODAY = new Date();

export const DATE_NEXT_TOMORROW = add(DATE_TODAY, { days: 2 });
