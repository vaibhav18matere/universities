import type { MessChargesParsed, ParsedMoneyField } from "./college-types";
import { getRubPerUsd } from "./parse-fees";

/**
 * Approximate INR per USD for on-screen estimates only (not a live quote).
 * Adjust when refreshing marketing figures.
 */
export function getInrPerUsd(): number {
  return 86;
}

export function getInrPerRub(): number {
  return getInrPerUsd() / getRubPerUsd();
}

export function convertRubToInr(amountRub: number): number {
  return amountRub * getInrPerRub();
}

export function convertInrToRub(amountInr: number): number {
  return amountInr / getInrPerRub();
}

export function convertUsdToInr(amountUsd: number): number {
  return amountUsd * getInrPerUsd();
}

export function formatInrWhole(amountInr: number): string {
  const rounded = Math.round(amountInr);
  return `₹${rounded.toLocaleString("en-IN")}`;
}

export function formatRubAmountInInr(amountRub: number): string {
  return formatInrWhole(convertRubToInr(amountRub));
}

export function formatUsdAmountInInr(amountUsd: number): string {
  return formatInrWhole(convertUsdToInr(amountUsd));
}

/**
 * Uses the same RUB-normalized annual figure as directory filters, then INR.
 */
export function formatParsedMoneyFieldInr(field: ParsedMoneyField): string {
  if (field.kind === "not_available") {
    const trimmed = field.rawDisplay.trim();
    return trimmed.length > 0 ? trimmed : "NA";
  }
  return formatRubAmountInInr(field.amountRub);
}

export function formatMessChargesInr(
  mess: MessChargesParsed,
  rawFallback: string,
): string {
  if (mess.kind === "not_available") {
    const trimmed = rawFallback.trim();
    return trimmed.length > 0 ? trimmed : "NA";
  }
  return formatUsdAmountInInr(mess.amountUsd);
}
