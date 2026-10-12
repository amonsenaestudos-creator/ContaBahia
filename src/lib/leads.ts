import { contactEmail } from "@/lib/site";
import { getSupabaseClient } from "@/lib/supabase";

/**
 * Envio do formulário de contato sem servidor (GitHub Pages).
 *
 * - Com o Supabase configurado, o navegador grava a solicitação na tabela `leads` usando a
 *   chave pública. A política RLS de `supabase/schema.sql` só aceita inserções válidas.
 * - Sem o Supabase, o formulário abre o aplicativo de e-mail do visitante com a mensagem pronta.
 */

export const companyTypeOptions = [
  { value: "Ainda vou abrir", label: "Ainda vou abrir empresa" },
  { value: "Já tenho empresa", label: "Já tenho empresa" },
  { value: "Sou MEI", label: "Sou MEI" },
  { value: "Candidato Eleitoral", label: "Sou candidato(a) eleitoral" },
] as const;

export type Lead = { name: string; email: string; phone: string; companyType: string; message: string };
export type LeadValidation = { ok: true; lead: Lead } | { ok: false; message: string };

const text = (value: unknown) => (typeof value === "string" ? value.trim() : "");

/** Campo "isca" invisível: robôs costumam preenchê-lo, pessoas não. */
export function isSpam(fields: Record<string, unknown>) {
  return text(fields.website) !== "";
}

/** Mesmas regras da antiga rota /api/leads e da política RLS do Supabase. */
export function validateLead(fields: Record<string, unknown>): LeadValidation {
  const name = text(fields.name);
  const email = text(fields.email).toLowerCase();
  const phone = text(fields.phone);
  const companyType = text(fields.companyType);
  const message = text(fields.message);

  if (name.length < 2 || name.length > 160) return { ok: false, message: "Informe seu nome completo." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return { ok: false, message: "Informe um e-mail válido." };
  if (phone.replace(/\D/g, "").length < 8 || phone.length > 40) return { ok: false, message: "Informe um telefone ou WhatsApp válido." };
  if (!companyTypeOptions.some((option) => option.value === companyType)) return { ok: false, message: "Selecione como podemos ajudar." };
  if (message.length < 10 || message.length > 3000) return { ok: false, message: "Escreva uma mensagem entre 10 e 3.000 caracteres." };

  return { ok: true, lead: { name, email, phone, companyType, message } };
}

/** Grava a solicitação no Supabase. Lança um erro se não for possível. */
export async function saveLead(lead: Lead) {
  const supabase = await getSupabaseClient();
  if (!supabase) throw new Error("Supabase não configurado.");

  const { error } = await supabase.from("leads").insert({
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    company_type: lead.companyType,
    message: lead.message,
  });
  if (error) throw new Error(error.message);
}

/** Link mailto: com assunto e corpo preenchidos para o e-mail da Conta Bahia. */
export function leadMailtoLink(lead: Lead) {
  const companyType = companyTypeOptions.find((option) => option.value === lead.companyType)?.label ?? lead.companyType;
  const subject = `Contato pelo site — ${lead.name}`;
  const body = [
    "Olá, João Márcio!",
    "",
    lead.message,
    "",
    "—",
    `Nome: ${lead.name}`,
    `E-mail: ${lead.email}`,
    `Telefone: ${lead.phone}`,
    `Momento: ${companyType}`,
    "",
    "Mensagem enviada pelo formulário do site da Conta Bahia.",
  ].join("\r\n");

  return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
