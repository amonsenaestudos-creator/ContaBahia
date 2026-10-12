"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, BriefcaseBusiness, Calculator, Check, FileCheck2, Landmark, Plus, ReceiptText, Scale, UsersRound, Workflow } from "lucide-react";
import { HorizonMotif } from "@/components/Brand";
import { Reveal } from "@/components/motion/Reveal";
import SlideTextButton from "@/components/kokonutui/slide-text-button";

const services = [
  { icon: Calculator, title: "Contábil", subtitle: "Informação para decidir com segurança.", items: ["Escrituração contábil", "Balanços e demonstrações", "Relatórios gerenciais"] },
  { icon: ReceiptText, title: "Fiscal e tributário", subtitle: "Planejamento e atenção a cada obrigação.", items: ["Apuração de tributos", "Livros fiscais e SPED", "Orientação tributária"] },
  { icon: UsersRound, title: "Departamento pessoal", subtitle: "Cuidado com a sua equipe, de ponta a ponta.", items: ["Folha de pagamento", "Admissões e rescisões", "eSocial e encargos"] },
  { icon: FileCheck2, title: "Legalização", subtitle: "Do primeiro CNPJ às próximas mudanças.", items: ["Abertura e alterações", "Certidões e regularização", "Baixa de empresas"] },
];
const additional = [
  { icon: BriefcaseBusiness, title: "Consultoria e gestão", text: "Diagnóstico financeiro, auditoria e apoio à gestão." },
  { icon: Workflow, title: "Automação comercial", text: "Sistemas e documentos fiscais com menos retrabalho." },
  { icon: Scale, title: "Mediação e homologação", text: "Apoio técnico em processos de resolução de conflitos." },
];

export function Services() {
  const [opened, setOpened] = useState<number | null>(null);
  const reduce = useReducedMotion();

  return (
    <section id="servicos" className="section-space bg-[#f4f7fb]">
      <div className="container-shell">
        <Reveal className="grid gap-6 md:grid-cols-[1.2fr_.8fr] md:items-end">
          <div><span className="eyebrow">01 / Nossas especialidades</span><h2 className="display-heading mt-5 max-w-[630px]">Seu negócio muda.<br /><span className="text-[var(--cyan)]">A gente acompanha.</span></h2></div>
          <p className="max-w-[365px] text-[14px] leading-[1.85] text-[#5e748b]">Uma estrutura completa para cuidar das obrigações e transformar os números em informação útil para sua empresa.</p>
        </Reveal>
        <motion.div layout className="mt-11 grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, title, subtitle, items }, index) => {
            const dark = index === 0;
            const expanded = opened === index;
            return (
              <motion.article key={title} layout initial={reduce ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: .55, delay: index * .07 }} whileHover={reduce ? {} : { y: -6, transition: { duration: .25, delay: 0 } }} className={`relative overflow-hidden rounded-[20px] border p-6 ${dark ? "border-[var(--ink)] bg-[var(--ink)] text-white" : "border-[var(--line)] bg-white text-[var(--ink)]"}`}>
                {dark && <HorizonMotif className="pointer-events-none absolute -bottom-16 -right-16 size-64 text-[#90c3ff]/15" />}
                <div className="relative flex items-center justify-between"><span className={`grid size-12 place-items-center rounded-[14px] ${dark ? "bg-white/10 text-[#a6d0ff]" : "bg-[#edf4ff] text-[var(--cyan)]"}`}><Icon size={22} strokeWidth={1.7} /></span><span className={`text-[10px] font-bold ${dark ? "text-[#7699c0]" : "text-[#9bafc2]"}`}>0{index + 1}</span></div>
                <h3 className="relative mt-8 text-[16px] font-bold tracking-[-.03em]">{title}</h3>
                <p className={`relative mt-2 min-h-12 text-[12px] leading-[1.7] ${dark ? "text-[#b2cae3]" : "text-[#667e94]"}`}>{subtitle}</p>
                <button type="button" aria-expanded={expanded} aria-controls={`service-detail-${index}`} onClick={() => setOpened(expanded ? null : index)} className={`relative mt-7 flex min-h-10 w-full items-center justify-between border-t pt-4 text-[11px] font-bold ${dark ? "border-white/15 text-[#a6d0ff]" : "border-[#e8eef5] text-[var(--cyan)]"}`}>
                  {expanded ? "Menos detalhes" : "O que está incluído"}<motion.span animate={{ rotate: expanded ? 45 : 0 }} transition={{ duration: .2 }}><Plus size={17} /></motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {expanded && <motion.div id={`service-detail-${index}`} key="details" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduce ? 0 : .28 }} className="relative overflow-hidden"><ul className="space-y-2.5 pt-5">{items.map((item) => <li key={item} className="flex gap-2 text-[11px] leading-relaxed"><Check size={13} className="mt-0.5 shrink-0 text-[#72b0ff]" />{item}</li>)}</ul><a href="#contato" className={`mt-5 inline-flex items-center gap-2 text-[11px] font-bold hover:underline ${dark ? "text-[#a6d0ff]" : "text-[var(--cyan)]"}`}>Falar sobre este serviço <ArrowUpRight size={13} /></a></motion.div>}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </motion.div>
        <Reveal delay={.08} className="mt-7 grid gap-5 border-t border-[#dce6f0] pt-7 md:grid-cols-3">
          {additional.map(({ icon: Icon, title, text }) => <a key={title} href="#contato" className="group flex gap-3.5"><Icon size={21} strokeWidth={1.7} className="mt-1 shrink-0 text-[var(--cyan)]" /><div><h3 className="text-[12px] font-bold text-[var(--ink)]">{title}</h3><p className="mt-1 text-[11px] leading-relaxed text-[#6c8399]">{text}</p></div><ArrowUpRight size={14} className="ml-auto shrink-0 text-[#89a1ba] transition group-hover:translate-x-1 group-hover:-translate-y-1" /></a>)}
        </Reveal>
        <Reveal className="mt-10">
          <div id="eleitoral" className="relative grid gap-5 overflow-hidden rounded-[22px] bg-[var(--cyan)] px-7 py-8 text-white sm:px-9 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-7">
            <HorizonMotif className="pointer-events-none absolute -bottom-40 -right-6 w-[420px] text-white/15" />
            <span className="relative grid size-14 place-items-center rounded-2xl border border-white/20 bg-white/10"><Landmark size={25} strokeWidth={1.7} /></span>
            <div className="relative"><p className="text-[9px] font-semibold uppercase tracking-[.2em] text-[#d1e3ff]">Uma especialidade da Conta Bahia</p><h3 className="mt-2 text-[22px] font-semibold tracking-[-.035em]">Prestação de contas eleitoral</h3><p className="mt-2 max-w-[520px] text-[12px] leading-[1.7] text-[#d6e5ff]">Orientação contábil para organizar receitas, despesas e documentos de partidos e candidaturas.</p></div>
            <SlideTextButton href="#contato" text="Conhecer a especialidade" hoverText="Fale com João Márcio" variant="light" containerClassName="relative" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
