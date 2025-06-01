import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("lo-LA", {
    // "lo-LA" for Lao, Laos
    style: "currency",
    currency: "LAK", // Set currency to Lao Kip
  }).format(price);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function getAbsoluteUrl(path: string): string {
  // In a real app, you'd use environment variables for the domain
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://NGO².com";
  return `${baseUrl}${path}`;
}
