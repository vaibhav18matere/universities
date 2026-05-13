import type { MessChargesParsed, ParsedMoneyField } from "./college-types";

function normalizeWhitespace(input: string): string {
  return input.trim().replace(/\s+/g, " ");
}

function detectCurrency(normalized: string): "RUB" | "USD" {
  const upper = normalized.toUpperCase();
  if (upper.includes("USD") || normalized.includes("$")) {
    return "USD";
  }
  return "RUB";
}

function extractNumber(normalized: string): number | null {
  const match = normalized.replace(/,/g, "").match(/-?\d+(\.\d+)?/);
  if (match === null) {
    return null;
  }
  return Number.parseFloat(match[0]);
}

export function parseMoneyField(
  rawInput: string,
  rubPerUsd: number,
): ParsedMoneyField {
  const rawDisplay = rawInput.trim();
  if (rawDisplay.length === 0) {
    return { kind: "not_available", rawDisplay: "—" };
  }

  const normalized = normalizeWhitespace(rawDisplay);
  const upper = normalized.toUpperCase();
  if (upper === "NA" || upper === "N/A") {
    return { kind: "not_available", rawDisplay };
  }

  const currency = detectCurrency(normalized);
  const amount = extractNumber(normalized);
  if (amount === null || Number.isNaN(amount)) {
    throw new Error(`Could not parse money value: "${rawInput}"`);
  }

  const amountRub = currency === "USD" ? amount * rubPerUsd : amount;

  return {
    kind: "amount",
    rawDisplay,
    amount,
    currency,
    amountRub,
  };
}

export function parseMessCharges(rawInput: string): MessChargesParsed {
  const normalized = normalizeWhitespace(rawInput).toUpperCase();
  if (normalized === "NA" || normalized === "N/A" || normalized.length === 0) {
    return { kind: "not_available" };
  }

  const amount = extractNumber(normalized);
  if (amount === null || Number.isNaN(amount)) {
    throw new Error(`Could not parse mess charges: "${rawInput}"`);
  }

  return { kind: "amount", amountUsd: amount };
}

export function getRubPerUsd(): number {
  return 92;
}
