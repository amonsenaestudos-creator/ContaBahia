"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, BriefcaseBusiness, Check, FileCheck2, Landmark, Repeat2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import SlideTextButton from "@/components/kokonutui/slide-text-button";
import { whatsappLink } from "@/lib/site";

const paths: { icon: LucideIcon; label: string; title: string; description: string; points: string[]; message: string }[] = [
  { icon: BriefcaseBusiness, label: "Vou abrir uma empresa", title: "Um bom começo faz diferença.", description: "Da definição da atividade ao registro do CNPJ, ajudamos você a entender o caminho de formalização adequado ao seu caso.", points: ["Orientação sobre enquadramento", "Registro e legalização", "Rotina fiscal desde o início"], message: "Olá! Quero orientação para abrir minha empresa." },
  { icon: Repeat2, label: "Quero trocar de contador", title: "Uma transição mais tranquila.", description: "Analisamos sua situação atual, alinhamos os documentos e acompanhamos a mudança para você não perder o ritmo do negócio.", points: ["Levantamento da situação atual", "Organização de documentos", "Continuidade das obrigações"], message: "Olá! Gostaria de conversar sobre a troca de contador." },
  { icon: FileCheck2, label: "Já tenho empresa", title: "Apoio para a rotina e para o futuro.", description: "Oferecemos suporte contábil, fiscal e trabalhista para acompanhar o seu dia a dia e esclarecer as dúvidas que surgem pelo caminho.", points: ["Escrituração e relatórios", "Obrigações fiscais", "Folha de pagamento e eSocial"], message: "Olá! Já tenho empresa e gostaria de conhecer os serviços da Conta Bahia." },
  { icon: Landmark, label: "Atuação eleitoral", title: "Organização desde o primeiro registro.", description: "Apoiamos a gestão contábil de receitas e despesas de candidaturas e partidos, conforme as regras aplicáveis ao processo eleitoral.", points: ["Orientação documental", "Acompanhamento dos registros", "Apoio na prestação de contas"], message: "Olá! Gostaria de informações sobre prestação de contas eleitoral." },
];

export function JourneyGuide() {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();
  const selected = paths[active];

  function keySelect(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (["ArrowRight", "ArrowDown"].includes(event.key)) next = (index + 1) % paths.length;
    else if (["ArrowLeft", "ArrowUp"].includes(event.key)) next = (index + paths.length - 1) % paths.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = paths.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    buttons.current[next]?.focus();
  }

  return (
    <section id="orientacao" className="section-space bg-white">
      <div className="container-shell grid items-start gap-10 lg:grid-cols-[.88fr_1.12fr] lg:gap-20">
        <Reveal>
          <span className="eyebrow">02 / Seu momento</span>
          <h2 className="display-heading mt-5">Cada negócio tem uma história.<br /><span className="text-[var(--cyan)]">Qual é a sua?</span></h2>
          <p className="mt-5 max-w-[385px] text-[14px] leading-[1.85] text-[#5e748b]">Começar, mudar ou crescer. Selecione o momento da sua empresa e veja como podemos estar ao seu lado.</p>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} className="mt-8 h-[3px] w-16 origin-left rounded-full bg-[var(--cyan)]" />
        </Reveal>
        <Reveal delay={.12}>
          <div className="rounded-[22px] border border-[#dfe7f1] bg-[#f4f7fb] p-3 sm:p-5">
            <div role="tablist" aria-label="Escolha o momento da sua empresa" className="grid gap-2 sm:grid-cols-2">
              {paths.map(({ icon: Icon, label }, index) => <button key={label} type="button" role="tab" id={`path-tab-${index}`} ref={(element) => { buttons.current[index] = element; }} tabIndex={active === index ? 0 : -1} aria-selected={active === index} aria-controls="path-panel" onClick={() => setActive(index)} onKeyDown={(event) => keySelect(event, index)} className={`relative flex min-h-12 items-center gap-2.5 rounded-[12px] px-4 text-left text-[11px] font-bold transition-colors sm:text-[12px] ${active === index ? "text-white" : "bg-white text-[#60778f] hover:text-[var(--cyan)]"}`}>
                {active === index && <motion.span layoutId="journey-active" className="absolute inset-0 rounded-[12px] bg-[var(--navy)] shadow-sm" transition={{ type: "spring", stiffness: 330, damping: 30 }} />}
                <Icon size={16} className="relative shrink-0" /><span className="relative">{label}</span>
              </button>)}
            </div>
            <div role="tabpanel" id="path-panel" aria-labelledby={`path-tab-${active}`} className="mt-3 min-h-[339px] overflow-hidden rounded-[16px] bg-white p-6 sm:p-8">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={active} initial={reduce ? false : { opacity: 0, y: 14, filter: "blur(3px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -9, filter: "blur(3px)" }} transition={{ duration: reduce ? 0 : .23 }}>
                  <div className="flex items-center justify-between"><span className="text-[9px] font-bold uppercase tracking-[.18em] text-[var(--cyan)]">Seu caminho, com orientação</span><span className="text-[10px] font-semibold text-[#a1b3c5]">0{active + 1} / 04</span></div>
                  <h3 className="mt-4 text-[22px] font-semibold leading-snug tracking-[-.04em] text-[var(--ink)]">{selected.title}</h3>
                  <p className="mt-3 text-[12px] leading-[1.85] text-[#637b93]">{selected.description}</p>
                  <ul className="mt-5 space-y-2.5">{selected.points.map((point) => <li key={point} className="flex items-center gap-2 text-[11px] font-semibold text-[#476581]"><Check size={13} className="text-[var(--cyan)]" />{point}</li>)}</ul>
                  <div className="mt-6"><SlideTextButton href={whatsappLink(selected.message)} text="Falar com João Márcio" hoverText="Dar o próximo passo" className="min-h-11" /></div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <p className="mt-3 flex items-center justify-end gap-1.5 text-[10px] text-[#8298ad]">Orientação pensada para a sua realidade <ArrowRight size={12} /></p>
        </Reveal>
      </div>
    </section>
  );
}
