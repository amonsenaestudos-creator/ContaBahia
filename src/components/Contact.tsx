"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ChevronDown, Mail, MapPin, Phone, UserRound } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { accountantName, contactEmail, contactPhone, officeLocation, phoneLink } from "@/lib/site";

export function Contact() {
  const [mapOpen, setMapOpen] = useState(false);
  const reduce = useReducedMotion();
  return (
    <section id="contato" className="section-space bg-[#f4f7fb]">
      <div className="container-shell grid items-start gap-10 lg:grid-cols-[.83fr_1.17fr] lg:gap-20">
        <Reveal>
          <span className="eyebrow">06 / Vamos conversar</span>
          <h2 className="display-heading mt-5">Fale diretamente com quem cuida da sua contabilidade.</h2>
          <p className="mt-5 max-w-[390px] text-[14px] leading-[1.85] text-[#5e748b]">Conte os seus planos ou tire uma dúvida. O atendimento é realizado diretamente pelo contador responsável da Conta Bahia.</p>
          <div className="mt-7 flex items-center gap-3 rounded-[14px] border border-[#dce9f3] bg-white p-4"><span className="grid size-10 place-items-center rounded-full bg-[#eaf6fd] text-[var(--cyan)]"><UserRound size={18} /></span><div><p className="text-[12px] font-bold text-[var(--ink)]">{accountantName}</p><p className="mt-0.5 text-[10px] text-[#70869a]">Contador responsável · atendimento direto</p></div></div>
          <div className="mt-8 space-y-5">
            <a href={phoneLink()} className="group flex items-center gap-3.5"><span className="grid size-11 shrink-0 place-items-center rounded-[13px] bg-white text-[var(--cyan)]"><Phone size={18} strokeWidth={1.8} /></span><div><p className="text-[9px] font-bold uppercase tracking-[.16em] text-[#8198ae]">Contato direto</p><p className="mt-1 text-[15px] font-bold text-[var(--ink)]">{contactPhone}</p></div><ArrowUpRight size={15} className="text-[#7e9dbc] transition group-hover:translate-x-1 group-hover:-translate-y-1" /></a>
            <a href={`mailto:${contactEmail}`} className="group flex items-center gap-3.5"><span className="grid size-11 shrink-0 place-items-center rounded-[13px] bg-white text-[var(--cyan)]"><Mail size={18} strokeWidth={1.8} /></span><div className="min-w-0"><p className="text-[9px] font-bold uppercase tracking-[.16em] text-[#8198ae]">E-mail</p><p className="mt-1 break-all text-[11px] font-semibold text-[#466581]">{contactEmail}</p></div></a>
          </div>
          <div className="mt-8 rounded-[17px] border border-[#dde7f2] bg-white p-5"><div className="flex items-start gap-3"><MapPin size={19} className="mt-0.5 shrink-0 text-[var(--cyan)]" /><div><p className="text-[11px] font-bold text-[var(--ink)]">Conta Bahia · Dias d’Ávila</p><p className="mt-1.5 text-[11px] leading-[1.7] text-[#6a829a]">{officeLocation}</p><p className="mt-2 text-[9px] leading-relaxed text-[#859aaf]">Confirme endereço e horário diretamente com o contador antes de visitar.</p></div></div><button type="button" aria-expanded={mapOpen} aria-controls="contact-map" onClick={() => setMapOpen(!mapOpen)} className="mt-4 flex w-full items-center justify-between border-t border-[#e5edf6] pt-4 text-[11px] font-bold text-[var(--cyan)]">{mapOpen ? "Fechar mapa" : "Ver região no mapa"}<motion.span animate={{ rotate: mapOpen ? 180 : 0 }}><ChevronDown size={15} /></motion.span></button><AnimatePresence initial={false}>{mapOpen && <motion.div id="contact-map" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: reduce ? 0 : .35 }} className="overflow-hidden"><iframe title="Mapa da região de Dias d'Ávila, Bahia" src="https://maps.google.com/maps?q=Av.%20Raul%20Seixas%2C%20999%2C%20Dias%20d%27Avila%2C%20BA&z=14&output=embed" width="100%" height="175" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="mt-4 rounded-xl border-0" /></motion.div>}</AnimatePresence></div>
        </Reveal>
        <Reveal direction="right" delay={.12}><ContactForm /></Reveal>
      </div>
    </section>
  );
}
