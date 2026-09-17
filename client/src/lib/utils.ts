import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a number into South African Rand (ZAR) currency string
 * e.g. 1499 -> "R 1,499.00" or 62.99 -> "R 62.99"
 */
export function formatZAR(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) return "R 0.00";
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount).replace("ZAR", "R").trim();
}

/**
 * Returns brand accent color styles for popular South African retailers
 */
export function getStoreBrandTheme(storeName: string): {
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  accentHex: string;
} {
  const name = storeName.toLowerCase();
  if (name.includes("checkers")) {
    return {
      badgeBg: "bg-teal-50",
      badgeText: "text-teal-800",
      borderColor: "border-teal-500",
      accentHex: "#007A78",
    };
  }
  if (name.includes("pick n pay") || name.includes("pnp")) {
    return {
      badgeBg: "bg-sky-50",
      badgeText: "text-sky-900",
      borderColor: "border-sky-600",
      accentHex: "#004B87",
    };
  }
  if (name.includes("woolworths") || name.includes("woolies")) {
    return {
      badgeBg: "bg-neutral-100",
      badgeText: "text-neutral-900",
      borderColor: "border-neutral-900",
      accentHex: "#111111",
    };
  }
  if (name.includes("takealot")) {
    return {
      badgeBg: "bg-blue-50",
      badgeText: "text-blue-700",
      borderColor: "border-blue-600",
      accentHex: "#0B72B9",
    };
  }
  if (name.includes("amazon")) {
    return {
      badgeBg: "bg-amber-50",
      badgeText: "text-amber-900",
      borderColor: "border-amber-500",
      accentHex: "#FF9900",
    };
  }
  if (name.includes("makro")) {
    return {
      badgeBg: "bg-indigo-50",
      badgeText: "text-indigo-800",
      borderColor: "border-indigo-600",
      accentHex: "#1A365D",
    };
  }
  if (name.includes("dis-chem")) {
    return {
      badgeBg: "bg-emerald-50",
      badgeText: "text-emerald-800",
      borderColor: "border-emerald-600",
      accentHex: "#059669",
    };
  }
  if (name.includes("clicks")) {
    return {
      badgeBg: "bg-cyan-50",
      badgeText: "text-cyan-900",
      borderColor: "border-cyan-600",
      accentHex: "#0891B2",
    };
  }
  return {
    badgeBg: "bg-primary-50",
    badgeText: "text-primary-700",
    borderColor: "border-primary-500",
    accentHex: "#16a34a",
  };
}