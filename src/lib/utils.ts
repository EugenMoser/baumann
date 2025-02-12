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

export function sendInquiry(articleWithColorNumber: string): void {
  // Hier musst du die E-Mail-Adresse und den Inhalt der Anfrage definieren
  const recipientEmail = "deine-email-adresse@example.com";
  const subject = "Unverbindliche Anfrage für Produkt";
  const body = `Hallo, ich möchte gerne unverbindlich das Produkt ${articleWithColorNumber} anfragen.`;

  // Hier kannst du die Anfrage per E-Mail senden
  window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
}
