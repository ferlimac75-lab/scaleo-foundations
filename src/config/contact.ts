// Centralized contact configuration for the Scaleo site.
// Update the WhatsApp number here — do NOT hardcode it in components.
// Format: country code + area code + number, digits only.
export const SCALEO_WHATSAPP_NUMBER = "5511999999999";

export function buildWhatsAppUrl(number: string, message: string): string {
  const digits = number.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
