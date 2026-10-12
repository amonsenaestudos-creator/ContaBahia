"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronDown, LoaderCircle, Mail, MailCheck, ShieldCheck } from "lucide-react";
import { BrandMark } from "@/components/Brand";
import { companyTypeOptions, isSpam, leadMailtoLink, saveLead, validateLead } from "@/lib/leads";
import { contactEmail, contactPhone, phoneLink } from "@/lib/site";
import { isSupabaseConfigured } from "@/lib/supabase";

const labelClass = "text-[11px] font-bold text-[#4c6781]";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "email" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  // Link mailto: com a mensagem pronta (usado sem Supabase ou se o envio falhar).
  const [mailtoHref, setMailtoHref] = useState("");
  const reduce = useReducedMotion();
  const finished = status === "success" || status === "email";

  useEffect(() => { if (finished) successRef.current?.focus({ preventScroll: true }); }, [finished]);

  function resetForm() {
    setStatus("idle");
    setFeedback("");
    setMailtoHref("");
  }

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const fields = Object.fromEntries(new FormData(event.currentTarget).entries());
    setFeedback("");
    setMailtoHref("");

    if (isSpam(fields)) {
      formRef.current?.reset();
      setStatus("success");
      return;
    }

    const validation = validateLead(fields);
    if (!validation.ok) {
      setStatus("error");
      setFeedback(validation.message);
      return;
    }

    const mailto = leadMailtoLink(validation.lead);

    // Site estático sem Supabase: abre o aplicativo de e-mail com a mensagem pronta.
    if (!isSupabaseConfigured) {
      setMailtoHref(mailto);
      setStatus("email");
      window.location.href = mailto;
      return;
    }

    setStatus("sending");
    try {
      await saveLead(validation.lead);
      formRef.current?.reset();
      setStatus("success");
    } catch (error) {
      console.error("Falha ao enviar a solicitação:", error);
      setStatus("error");
      setMailtoHref(mailto);
      setFeedback(`Não foi possível enviar agora. Tente novamente em instantes, ligue para ${contactPhone} ou envie por e-mail.`);
    }
  }

  return (
    <div className="relative overflow-hidden rounded-[24px] border border-[#dce6f0] bg-white p-6 shadow-[0_20px_55px_rgba(16,45,80,.065)] sm:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div key="success" role="status" onAnimationComplete={() => successRef.current?.focus({ preventScroll: true })} initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : .4 }} className="flex min-h-[490px] flex-col items-center justify-center text-center">
            <div className="grid size-20 place-items-center rounded-full bg-[#edf4ff]">
              <motion.svg aria-hidden="true" viewBox="0 0 44 44" className="size-11 text-[var(--cyan)]" fill="none"><motion.circle cx="22" cy="22" r="18" stroke="currentColor" strokeWidth="1.8" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: reduce ? 0 : .5 }} /><motion.path d="m13 22 6 6 12-13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: reduce ? 0 : .45, delay: .3 }} /></motion.svg>
            </div>
            <h3 ref={successRef} tabIndex={-1} className="mt-6 text-[25px] font-semibold tracking-[-.04em] text-[var(--ink)] focus:outline-none">Mensagem recebida.</h3>
            <p className="mt-3 max-w-[300px] text-[13px] leading-[1.85] text-[#667e96]">Obrigado por conversar com a Conta Bahia. João Márcio retornará pelos contatos que você informou.</p>
            <button type="button" onClick={resetForm} className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full border border-[#cddff3] px-5 text-[12px] font-bold text-[var(--cyan)] hover:bg-[#edf4ff]">Enviar outra mensagem <ArrowRight size={14} /></button>
          </motion.div>
        ) : status === "email" ? (
          <motion.div key="email" role="status" onAnimationComplete={() => successRef.current?.focus({ preventScroll: true })} initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : .4 }} className="flex min-h-[490px] flex-col items-center justify-center text-center">
            <div className="grid size-20 place-items-center rounded-full bg-[#edf4ff]"><MailCheck aria-hidden="true" size={38} strokeWidth={1.6} className="text-[var(--cyan)]" /></div>
            <h3 ref={successRef} tabIndex={-1} className="mt-6 text-[25px] font-semibold tracking-[-.04em] text-[var(--ink)] focus:outline-none">Falta só enviar o e-mail.</h3>
            <p className="mt-3 max-w-[330px] text-[13px] leading-[1.85] text-[#667e96]">Abrimos o seu aplicativo de e-mail com a mensagem pronta para a Conta Bahia. Confira os dados e toque em <strong className="font-bold text-[var(--ink)]">Enviar</strong>.</p>
            <p className="mt-3 max-w-[360px] text-[11px] leading-[1.8] text-[#8298ad]">Se nada abriu, fale direto com a Conta Bahia:<br /><a href={`mailto:${contactEmail}`} className="font-semibold text-[var(--cyan)] underline underline-offset-2 [overflow-wrap:anywhere]">{contactEmail}</a> · <a href={phoneLink()} className="whitespace-nowrap font-semibold text-[var(--cyan)] underline underline-offset-2">{contactPhone}</a></p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a href={mailtoHref || `mailto:${contactEmail}`} data-lead-mailto className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--cyan)] px-5 text-[12px] font-bold text-white transition-colors hover:bg-[#34a8d6]"><Mail size={14} /> Abrir e-mail novamente</a>
              <button type="button" onClick={resetForm} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#cddff3] px-5 text-[12px] font-bold text-[var(--cyan)] hover:bg-[#edf4ff]">Voltar ao formulário</button>
            </div>
          </motion.div>
        ) : (
          <motion.form key="contact-form" ref={formRef} onSubmit={submitLead} aria-label="Formulário de contato" aria-busy={status === "sending"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : .2 }}>
            <div className="flex items-center gap-3.5 border-b border-[#e6edf5] pb-6"><BrandMark className="size-10" /><div><h3 className="text-[18px] font-bold tracking-[-.035em] text-[var(--ink)]">Conte o que você precisa.</h3><p className="mt-1 text-[11px] text-[#7b91a6]">João Márcio recebe sua solicitação diretamente.</p></div></div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className={labelClass}>Nome completo *<input className="brand-input" name="name" autoComplete="name" placeholder="Como podemos chamar você?" required minLength={2} maxLength={160} /></label>
              <label className={labelClass}>E-mail *<input className="brand-input" name="email" type="email" autoComplete="email" placeholder="voce@empresa.com.br" required maxLength={254} /></label>
              <label className={labelClass}>Telefone *<input className="brand-input" name="phone" type="tel" autoComplete="tel" placeholder="(71) 99999-9999" required minLength={8} maxLength={40} /></label>
              <label className={labelClass}>Qual é o seu momento? *<span className="relative block"><select className="brand-input appearance-none pr-9" name="companyType" required defaultValue=""><option value="" disabled>Selecione</option>{companyTypeOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select><ChevronDown size={14} className="pointer-events-none absolute right-3 top-[23px] text-[#8198ad]" /></span></label>
              <label className={`${labelClass} sm:col-span-2`}>Sua mensagem *<textarea className="brand-input min-h-[118px] resize-y" name="message" placeholder="Fale um pouco sobre a sua empresa ou dúvida..." required minLength={10} maxLength={3000} /></label>
            </div>
            <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true"><label htmlFor="company-website">Deixe vazio</label><input id="company-website" name="website" tabIndex={-1} autoComplete="off" /></div>
            <motion.button type="submit" disabled={status === "sending"} whileHover={reduce || status === "sending" ? {} : { y: -2, boxShadow: "0 8px 20px rgba(39,108,242,.2)" }} whileTap={reduce ? {} : { scale: .985 }} className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--cyan)] px-6 text-[13px] font-bold text-white transition-colors hover:bg-[#34a8d6] disabled:opacity-70">{status === "sending" ? <><motion.span animate={{ rotate: 360 }} transition={{ duration: 1, ease: "linear", repeat: Infinity }}><LoaderCircle size={16} /></motion.span> Enviando sua mensagem...</> : <>Enviar solicitação <ArrowRight size={16} /></>}</motion.button>
            <p className="mt-4 flex items-start justify-center gap-1.5 text-center text-[9px] leading-relaxed text-[#8298ad]"><ShieldCheck size={12} className="mt-0.5 shrink-0" /><span>Seus dados serão usados para retornar esta solicitação.<br /><Link href="/privacidade" className="font-semibold text-[var(--cyan)] underline underline-offset-2">Aviso de privacidade</Link></span></p>
            <div aria-live="polite"><AnimatePresence>{feedback && <motion.p key="error" role="alert" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-4 rounded-xl bg-[#fff1ed] px-4 py-3 text-[12px] leading-relaxed text-[#a04236]">{feedback}{mailtoHref && <> <a href={mailtoHref} className="font-bold underline underline-offset-2">Enviar por e-mail</a></>}</motion.p>}</AnimatePresence></div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
