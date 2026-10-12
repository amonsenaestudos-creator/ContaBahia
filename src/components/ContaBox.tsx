"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, Database, FileSpreadsheet, FileText, RefreshCw, ServerCog, Store, UserRound } from "lucide-react";
import { HorizonMotif } from "@/components/Brand";
import { Reveal } from "@/components/motion/Reveal";
import SlideTextButton from "@/components/kokonutui/slide-text-button";
import { accountantName, whatsappLink } from "@/lib/site";

const dataTypes = [
  { label: "Vendas e movimentações", icon: Store },
  { label: "Notas e documentos fiscais", icon: FileText },
  { label: "Planilhas e arquivos", icon: FileSpreadsheet },
];

export function ContaBox() {
  const [synced, setSynced] = useState(false);
  const reduce = useReducedMotion();

  return (
    <section id="ferramentas" className="relative overflow-hidden bg-[var(--navy)] py-20 text-white sm:py-24">
      <HorizonMotif className="pointer-events-none absolute -bottom-32 -left-48 w-[780px] rotate-90 text-[#8dc4ff]/10" />
      <div className="container-shell relative grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <Reveal direction="left" className="order-2 lg:order-1">
          <span className="eyebrow eyebrow--light">Conta Box · sincronizador contábil</span>
          <h2 className="mt-5 text-[clamp(2.2rem,4.1vw,3.6rem)] font-semibold leading-[1.12] tracking-[-.05em]">Os dados da empresa chegam ao contador <span className="text-[#9bcaff]">sem caminho complicado.</span></h2>
          <p className="mt-5 max-w-[520px] text-[14px] leading-[1.85] text-[#b4cce4]">O Conta Box é um sincronizador contábil: reúne dados relevantes da rotina da empresa e os envia automaticamente para o ambiente do contador, reduzindo retrabalho e atrasos na escrituração.</p>
          <div className="mt-8 space-y-5">{dataTypes.map(({ label, icon: Icon }, i) => <Reveal key={label} delay={i * .08} className="flex items-start gap-3"><span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-white/10 text-[#9bcaff]"><Icon size={13} strokeWidth={1.8} /></span><p className="text-[12px] leading-[1.7] text-[#c9d9e8]">{label}</p></Reveal>)}</div>
          <div className="mt-8"><SlideTextButton href={whatsappLink("Olá, João Márcio! Gostaria de entender como o Conta Box sincroniza os dados da minha empresa.")} text="Entender o sincronizador" hoverText="Falar com João Márcio" variant="light" /></div>
          <div className="mt-8 flex items-start gap-3 border-t border-white/15 pt-6"><ServerCog size={20} className="mt-1 shrink-0 text-[#9bcaff]" /><div><p className="text-[11px] font-bold">Integração de dados para a contabilidade</p><p className="mt-1 text-[11px] leading-relaxed text-[#95b2d0]">O fluxo é configurado conforme os sistemas e os dados que fazem parte da operação do cliente.</p></div></div>
        </Reveal>

        <Reveal direction="right" delay={.12} className="order-1 mx-auto w-full max-w-[520px] lg:order-2">
          <div className="relative rounded-[23px] border border-white/15 bg-white/[.05] p-5 shadow-[0_24px_60px_rgba(0,0,0,.22)] sm:p-7">
            <div className="flex items-center justify-between border-b border-white/10 pb-5"><div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#9bcaff]">Fluxo Conta Box</p><p className="mt-1 text-[15px] font-semibold">Sincronização de dados</p></div><span className="rounded-full border border-white/15 bg-white/[.06] px-3 py-1.5 text-[9px] font-bold text-[#cde2f8]">DEMONSTRAÇÃO</span></div>
            <div className="relative mt-7 grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
              <DataPanel title="Dados da empresa" subtitle="Sistemas, arquivos e documentos" icon={Database} items={["Vendas", "Notas fiscais", "Documentos"]} />
              <motion.div className="flex justify-center sm:block" animate={synced && !reduce ? { rotate: 360 } : { rotate: 0 }} transition={{ duration: .7, ease: "easeInOut" }}><span className="grid size-11 place-items-center rounded-full bg-[var(--cyan)] text-white shadow-[0_0_0_7px_rgba(64,184,232,.12)]"><RefreshCw size={18} /></span></motion.div>
              <DataPanel title="Contabilidade" subtitle="Ambiente do contador" icon={UserRound} items={["Dados recebidos", "Conferência", "Escrituração"]} />
              <div className="absolute left-[20%] right-[20%] top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-[#9bcaff]/10 via-[#9bcaff]/70 to-[#9bcaff]/10 sm:block" />
            </div>
            <div className="mt-7 rounded-[14px] border border-white/10 bg-[#061b34]/55 p-4"><div className="flex items-center justify-between gap-4"><div><p className="text-[11px] font-bold">Status da sincronização</p><p className="mt-1 text-[10px] text-[#a5bdd5]">Uma representação do envio de dados ao contador.</p></div><span className={`shrink-0 rounded-full px-3 py-1.5 text-[9px] font-bold ${synced ? "bg-[#e4f6ef] text-[#2e805f]" : "bg-white/10 text-[#c9d9e8]"}`}>{synced ? "DADOS SINCRONIZADOS" : "AGUARDANDO ENVIO"}</span></div><motion.div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10"><motion.span className="block h-full rounded-full bg-[#72cff0]" initial={false} animate={{ width: synced ? "100%" : "18%" }} transition={{ duration: reduce ? 0 : .65 }} /></motion.div></div>
            <button type="button" onClick={() => setSynced(!synced)} aria-pressed={synced} className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-white text-[12px] font-bold text-[var(--ink)] transition hover:bg-[#eaf7fe]">{synced ? <><Check size={15} /> Reiniciar demonstração</> : <><RefreshCw size={15} /> Simular sincronização</>}</button>
          </div>
          <p className="mt-4 text-center text-[9px] text-[#8ba9c8]">Representação visual do fluxo de sincronização. A configuração depende da operação de cada cliente.</p>
        </Reveal>
      </div>
    </section>
  );
}

function DataPanel({ title, subtitle, icon: Icon, items }: { title: string; subtitle: string; icon: typeof Database; items: string[] }) {
  return <div className="relative z-10 rounded-[15px] border border-white/12 bg-white/[.06] p-4"><span className="grid size-9 place-items-center rounded-[10px] bg-white/10 text-[#a8d4ff]"><Icon size={17} strokeWidth={1.8} /></span><p className="mt-4 text-[11px] font-bold">{title}</p><p className="mt-1 text-[9px] leading-relaxed text-[#9db8d3]">{subtitle}</p><ul className="mt-4 space-y-2 border-t border-white/10 pt-3">{items.map((item) => <li key={item} className="flex items-center gap-1.5 text-[9px] text-[#c5d7e8]"><span className="size-1 rounded-full bg-[#72cff0]" />{item}</li>)}</ul></div>;
}
