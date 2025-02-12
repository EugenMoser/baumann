import {
  type ClassValue,
  clsx,
} from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function addThousendSeperator(value: string | number | null) {
  if (!value) return null;
  return Number(value).toLocaleString("de-DE");
}
