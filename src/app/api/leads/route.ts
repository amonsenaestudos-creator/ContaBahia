import { db } from "@/db";
import { leads } from "@/db/schema";
import { getSupabaseClient } from "@/lib/supabase";

export const runtime = "nodejs";

const allowedCompanyTypes = new Set(["Ainda vou abrir", "Já tenho empresa", "Sou MEI", "Candidato Eleitoral"]);

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return Response.json({ message: "Confira os dados e tente novamente." }, { status: 400 });
    }

    const fields = body as Record<string, unknown>;
    if (typeof fields.website === "string" && fields.website.trim()) {
      return Response.json({ ok: true, message: "Solicitação recebida." });
    }

    const name = typeof fields.name === "string" ? fields.name.trim() : "";
    const email = typeof fields.email === "string" ? fields.email.trim().toLowerCase() : "";
    const phone = typeof fields.phone === "string" ? fields.phone.trim() : "";
    const companyType = typeof fields.companyType === "string" ? fields.companyType.trim() : "";
    const message = typeof fields.message === "string" ? fields.message.trim() : "";

    if (name.length < 2 || name.length > 160) {
      return Response.json({ message: "Informe seu nome completo." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
      return Response.json({ message: "Informe um e-mail válido." }, { status: 400 });
    }
    if (phone.replace(/\D/g, "").length < 8 || phone.length > 40) {
      return Response.json({ message: "Informe um telefone ou WhatsApp válido." }, { status: 400 });
    }
    if (!allowedCompanyTypes.has(companyType)) {
      return Response.json({ message: "Selecione como podemos ajudar." }, { status: 400 });
    }
    if (message.length < 10 || message.length > 3000) {
      return Response.json({ message: "Escreva uma mensagem entre 10 e 3.000 caracteres." }, { status: 400 });
    }

    const supabase = getSupabaseClient();
    if (supabase) {
      const { error } = await supabase.from("leads").insert({
        name,
        email,
        phone,
        company_type: companyType,
        message,
      });
      if (error) {
        console.error("Supabase lead insert failed:", error.message);
        return Response.json({ message: "Não foi possível salvar sua solicitação. Tente novamente em instantes." }, { status: 502 });
      }
    } else {
      await db.insert(leads).values({ name, email, phone, companyType, message });
    }

    return Response.json({ ok: true, message: "Recebemos sua solicitação." }, { status: 201 });
  } catch (error) {
    console.error("Lead submission failed:", error);
    return Response.json({ message: "Ocorreu um erro ao enviar. Tente novamente em instantes." }, { status: 500 });
  }
}
