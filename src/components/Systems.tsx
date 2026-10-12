"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, Cloud, FileBadge2, ReceiptText, Store, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { plans, systems } from "@/lib/commercial";
import { Reveal } from "@/components/motion/Reveal";
import SlideTextButton from "@/components/kokonutui/slide-text-button";
import { whatsappLink } from "@/lib/site";

const systemIcons: Record<"nfc" | "nfe" | "workshop", LucideIcon> = { nfc: ReceiptText, nfe: FileBadge2, workshop: Wrench };
const tabs = [
  { id: "plans" as const, label: "Atendimento contábil", icon: Cloud },
  { id: "systems" as const, label: "Loja de sistemas", icon: Store },
];

export function Systems() {
  const [tab, setTab] = useState<"plans" | "systems">("plans");
  const reduce = useReducedMotion();

  return (
    <section id="sistemas" className="relative overflow-hidden bg-[#f4f9fd] py-20 sm:py-24">
      <div className="container-shell">
        <Reveal className="mx-auto max-w-[680px] text-center">
          <span className="eyebrow justify-center">Atendimento & loja</span>
          <h2 className="display-heading mt-5">Contabilidade e sistemas para a rotina do seu negócio.</h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[13px] leading-relaxed text-[#627a92]">Solicite uma proposta contábil personalizada ou conheça os sistemas comerciais que já fizeram parte da loja da Conta Bahia.</p>
        </Reveal>

        <div className="mt-9 flex justify-center">
          <div role="tablist" aria-label="Alternar entre atendimento e sistemas" className="inline-flex gap-1 rounded-full border border-[#dde8f2] bg-white p-1.5">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button key={id} type="button" role="tab" aria-selected={tab === id} onClick={() => setTab(id)} className={`relative flex min-h-11 items-center gap-2 rounded-full px-5 text-[11px] font-bold transition-colors sm:text-[12px] ${tab === id ? "text-white" : "text-[#60778f] hover:text-[var(--cyan)]"}`}>
                {tab === id && <motion.span layoutId="shop-tab" className="absolute inset-0 rounded-full bg-[var(--ink)]" transition={{ type: "spring", stiffness: 320, damping: 30 }} />}
                <Icon size={15} className="relative shrink-0" /><span className="relative whitespace-nowrap">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-9">
          <AnimatePresence mode="wait" initial={false}>
            {tab === "plans" ? (
              <motion.div key="plans" initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: reduce ? 0 : .28 }} className="grid items-stretch gap-4 lg:grid-cols-3">
                {plans.map((plan, index) => (
                  <motion.article key={plan.name} initial={reduce ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .5, delay: index * .08 }} className={`relative flex flex-col rounded-[20px] border p-7 ${plan.highlight ? "border-[var(--cyan)] bg-[var(--ink)] text-white shadow-[0_20px_50px_rgba(13,43,82,.18)] lg:-my-3 lg:py-10" : "border-[#e0eaf3] bg-white"}`}>
                    {plan.highlight && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--cyan)] px-4 py-1.5 text-[9px] font-extrabold uppercase tracking-[.13em] text-white">Atendimento completo</span>}
                    <p className={`text-[9px] font-bold uppercase tracking-[.15em] ${plan.highlight ? "text-[#9bcaff]" : "text-[var(--cyan)]"}`}>{plan.target}</p>
                    <h3 className={`mt-3 text-[24px] font-extrabold tracking-[-.04em] ${plan.highlight ? "text-white" : "text-[var(--ink)]"}`}>{plan.name}</h3>
                    <p className={`mt-2 min-h-[42px] text-[12px] leading-[1.7] ${plan.highlight ? "text-[#b9d2ea]" : "text-[#6b8399]"}`}>{plan.description}</p>
                    <div className="mt-6 flex flex-col gap-1"><span className={`text-[20px] font-extrabold tracking-[-.04em] ${plan.highlight ? "text-white" : "text-[var(--ink)]"}`}>{plan.price}</span><span className={`text-[10px] font-semibold ${plan.highlight ? "text-[#9bb9d8]" : "text-[#8ba1b6]"}`}>{plan.period}</span></div>
                    <ul className={`mt-6 space-y-3 border-t pt-6 ${plan.highlight ? "border-white/15" : "border-[#eef3f8]"}`}>
                      {plan.features.map((feature) => <li key={feature} className="flex gap-2.5 text-[11.5px] leading-relaxed"><Check size={14} strokeWidth={2.5} className={`mt-0.5 shrink-0 ${plan.highlight ? "text-[#7fc4ff]" : "text-[var(--cyan)]"}`} /><span className={plan.highlight ? "text-[#d3e3f2]" : "text-[#55708c]"}>{feature}</span></li>)}
                    </ul>
                    <a href={whatsappLink(`Olá, João Márcio! Tenho interesse em uma proposta para ${plan.name}.`)} className={`mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-[12px] font-bold transition ${plan.highlight ? "bg-[var(--cyan)] text-white hover:bg-[#34a8d6]" : "border border-[#d8e6f2] text-[var(--ink)] hover:border-[var(--cyan)] hover:text-[var(--cyan)]"}`}>{plan.cta}<ArrowRight size={15} /></a>
                  </motion.article>
                ))}
                <p className="col-span-full text-center text-[10px] text-[#8ba1b6]">O valor do atendimento contábil é definido após conhecer a empresa, o enquadramento e a movimentação mensal.</p>
              </motion.div>
            ) : (
              <motion.div key="systems" initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: reduce ? 0 : .28 }} className="grid gap-4 lg:grid-cols-3">
                {systems.map((system, index) => {
                  const Icon = systemIcons[system.type];
                  return (
                    <motion.article key={system.name} initial={reduce ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .5, delay: index * .08 }} className="flex flex-col rounded-[20px] border border-[#e0eaf3] bg-white p-7 transition hover:border-[var(--cyan)]/45 hover:shadow-[0_16px_38px_rgba(13,43,82,.07)]">
                      <div className="flex items-center justify-between"><span className="grid size-12 place-items-center rounded-[14px] bg-[#eaf6fd] text-[var(--cyan)]"><Icon size={22} strokeWidth={1.7} /></span><span className="rounded-full bg-[#f2f8fc] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[.1em] text-[#5b7c96]">{system.tag}</span></div>
                      <h3 className="mt-6 text-[19px] font-extrabold leading-[1.25] tracking-[-.035em] text-[var(--ink)]">{system.name}</h3>
                      <p className="mt-2.5 text-[12px] leading-[1.75] text-[#6b8399]">{system.description}</p>
                      <ul className="mt-5 space-y-2.5 border-t border-[#eef3f8] pt-5">
                        {system.features.map((feature) => <li key={feature} className="flex gap-2.5 text-[11px] leading-relaxed text-[#55708c]"><Check size={13} strokeWidth={2.5} className="mt-0.5 shrink-0 text-[var(--cyan)]" />{feature}</li>)}
                      </ul>
                      <div className="mt-auto border-t border-[#eef3f8] pt-5"><p className="text-[23px] font-extrabold tracking-[-.04em] text-[var(--ink)]">{system.price}</p><div className="mt-4"><SlideTextButton href={whatsappLink(`Olá, João Márcio! Tenho interesse no produto ${system.name}.`)} text="Solicitar este sistema" hoverText="Falar sobre o produto" className="min-h-11 w-full" /></div></div>
                    </motion.article>
                  );
                })}
                <p className="col-span-full text-center text-[10px] text-[#8ba1b6]">Preços extraídos da loja do site anterior da Conta Bahia. Confirme disponibilidade e condições atuais antes da contratação.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
