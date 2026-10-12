// Dados confirmados pelo responsável do escritório.
// Podem ser trocados por variáveis NEXT_PUBLIC_* no build (veja o README).
// Os valores padrão usam `||` porque o GitHub Actions entrega variáveis não definidas como texto vazio.
const whatsappConfigured = Boolean(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER);
const rawWhatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

export const accountantName = "João Márcio Santos Sena";
export const whatsappNumber = rawWhatsappNumber.replace(/\D/g, "");
// Número informado pelo responsável. Pode ser alterado no ambiente de produção.
export const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE || "(71) 9988-3331";
export const contactPhoneDigits = contactPhone.replace(/\D/g, "");
export const whatsappDisplay = process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY || contactPhone;
export const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contabahiacontabilidade@gmail.com";
export const officeLocation = process.env.NEXT_PUBLIC_OFFICE_LOCATION || "Av. Raul Seixas, 999 · Dias d’Ávila, BA";

export function phoneLink() {
  return `tel:+55${contactPhoneDigits}`;
}

export function whatsappLink(message = "Olá, João Márcio! Gostaria de conversar sobre a Conta Bahia Contabilidade.") {
  if (whatsappConfigured && whatsappNumber.length >= 12) {
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  }
  return phoneLink();
}
