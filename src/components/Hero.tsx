"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { ArrowDown, ArrowUpRight, MapPin, Pause, Play, UserRound } from "lucide-react";
import BeamsBackground from "@/components/kokonutui/beams-background";
import TypewriterTitle from "@/components/kokonutui/type-writer";
import SlideTextButton from "@/components/kokonutui/slide-text-button";
import { BrandMark, HorizonMotif } from "@/components/Brand";
import { accountantName, contactPhone } from "@/lib/site";

const phrases = [
  { text: "Negócios fortes.", pauseAfter: 3200 },
  { text: "Decisões claras.", pauseAfter: 2500 },
  { text: "Novos caminhos.", pauseAfter: 2500 },
];
const enter = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } };

export function Hero() {
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const motionPaused = paused || Boolean(reduce);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateY = useSpring(mouseX, { stiffness: 100, damping: 24 });
  const rotateX = useSpring(mouseY, { stiffness: 100, damping: 24 });

  return (
    <section id="inicio" className="relative isolate overflow-hidden bg-[var(--navy)] text-white">
      <BeamsBackground intensity="strong" paused={motionPaused} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(6,27,52,.84)_0%,rgba(6,27,52,.38)_58%,rgba(6,27,52,.08)_100%)]" />
      <HorizonMotif className="pointer-events-none absolute -bottom-28 -right-16 w-[700px] text-[#b5d6ff]/15" />

      <div className="container-shell relative grid items-center gap-12 py-14 sm:py-16 lg:min-h-[650px] lg:grid-cols-[1.07fr_.93fr] lg:gap-14 lg:py-20">
        <motion.div initial={reduce ? false : "hidden"} animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.11, delayChildren: 0.12 } } }}>
          <motion.div variants={enter} className="inline-flex items-center gap-2.5 text-[9px] font-bold uppercase tracking-[.18em] text-[#abcffa] sm:text-[10px]">
            <span className="h-px w-7 bg-[#72cff0]" /> Dias d’Ávila, Bahia · Soluções contábeis
          </motion.div>
          <motion.h1 variants={enter} className="mt-6 text-[clamp(2rem,10vw,3.5rem)] font-semibold leading-[1.1] tracking-[-.055em] lg:text-[clamp(3rem,4.9vw,4.3rem)]">
            Contabilidade<br />próxima.<br />
            <TypewriterTitle sequences={phrases} typingSpeed={68} deleteSpeed={36} paused={motionPaused} className="text-[#72cff0]" />
          </motion.h1>
          <motion.p variants={enter} className="mt-6 max-w-[480px] text-[13px] leading-[1.9] text-[#c1d2e5] sm:text-[14px]">
            Consultoria contábil, fiscal e tributária para organizar a rotina da sua empresa. Atendimento direto com quem cuida da sua contabilidade, sem intermediários.
          </motion.p>
          <motion.div variants={enter} className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center">
            <SlideTextButton href="#contato" text="Falar com o contador" hoverText="Converse com João Márcio" className="min-h-13 text-[12px]" />
            <a href="#servicos" className="group inline-flex items-center justify-center gap-2.5 text-[12px] font-semibold text-white/90 transition hover:text-[#72cff0]">Nossas soluções <ArrowDown size={15} className="transition group-hover:translate-y-1" /></a>
          </motion.div>
          <motion.div variants={enter} className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-[10px] font-medium text-[#b5c7da]">
            <span className="inline-flex items-center gap-2"><UserRound size={13} className="text-[#72cff0]" />{accountantName} · Contador responsável</span>
            <span className="hidden size-1 rounded-full bg-white/25 sm:block" />
            <a href={`tel:+55${contactPhone.replace(/\D/g, "")}`} className="font-semibold text-white hover:text-[#72cff0]">{contactPhone}</a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.95, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onPointerMove={(event) => {
            if (motionPaused || event.pointerType !== "mouse") return;
            const rect = event.currentTarget.getBoundingClientRect();
            mouseX.set(((event.clientX - rect.left) / rect.width - 0.5) * 7);
            mouseY.set(-((event.clientY - rect.top) / rect.height - 0.5) * 7);
          }}
          onPointerLeave={() => { mouseX.set(0); mouseY.set(0); }}
          className="relative mx-auto w-full max-w-[470px] pb-12 pt-5 lg:pt-2"
        >
          <motion.div style={{ rotateY: motionPaused ? 0 : rotateY, rotateX: motionPaused ? 0 : rotateX, transformPerspective: 1200 }} className="relative">
            <div className="relative aspect-[1.06/1] overflow-hidden rounded-[22px] rounded-tr-[82px] border border-white/15 bg-[#cfdce7] shadow-[0_28px_60px_rgba(0,0,0,.18)]">
              <Image src="/images/atendimento-contabil.jpg" alt="Conversa de orientação contábil e revisão de documentos; fotografia ilustrativa" fill priority sizes="(max-width: 1024px) 90vw, 40vw" className="object-cover object-[54%_center]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061e3c]/80 via-transparent to-transparent" />
              <div className="absolute bottom-7 left-6 right-6 flex items-end justify-between gap-4">
                <div><p className="text-[9px] font-semibold uppercase tracking-[.18em] text-[#d0e3f7]">Por trás de cada número</p><p className="mt-2 max-w-[245px] text-[19px] font-semibold leading-[1.35] tracking-[-.025em]">Uma conversa que entende o seu negócio.</p></div>
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/30 bg-white/10 backdrop-blur"><ArrowUpRight size={18} /></span>
              </div>
            </div>
            <motion.div initial={reduce ? false : { opacity: 0, x: 24, y: 10 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ delay: 0.65, duration: 0.7 }} className="absolute -bottom-9 -right-1 flex items-center gap-3.5 rounded-[17px] border border-[#e5edf5] bg-white p-4 text-[var(--ink)] shadow-[0_18px_40px_rgba(0,0,0,.14)] sm:-right-4 sm:px-5"><BrandMark className="size-10" /><div><p className="text-[12px] font-bold">Atendimento direto.</p><p className="mt-1 text-[10px] text-[#698099]">Contabilidade com responsável definido.</p></div></motion.div>
          </motion.div>
          <div className="absolute -top-3 right-6 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[.16em] text-[#accbea] lg:-top-8"><span className="size-1.5 rounded-full bg-[#72cff0]" /> Soluções contábeis integradas</div>
        </motion.div>
      </div>

      <div className="container-shell relative border-t border-white/15">
        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-5 py-5 sm:py-6">
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-[10px] font-semibold text-[#c6d9ed] sm:text-[11px]"><span><span className="mr-2 text-[#72cff0]">01 /</span> Atendimento direto</span><span><span className="mr-2 text-[#72cff0]">02 /</span> Dados sincronizados</span><span><span className="mr-2 text-[#72cff0]">03 /</span> Serviços integrados</span></div>
          <button type="button" onClick={() => setPaused(!paused)} aria-pressed={paused} aria-label={paused ? "Retomar animações do destaque" : "Pausar animações do destaque"} className="inline-flex min-h-8 items-center gap-1.5 rounded-full border border-white/15 px-3 text-[9px] font-medium text-[#aac4df] transition hover:bg-white/10 hover:text-white">{paused ? <Play size={11} /> : <Pause size={11} />}{paused ? "Retomar movimento" : "Pausar movimento"}</button>
        </div>
      </div>
    </section>
  );
}
