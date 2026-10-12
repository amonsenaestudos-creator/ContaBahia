import { ClipboardCheck, Headphones, FolderCheck } from "lucide-react";
import { BrandMark } from "@/components/Brand";
import { Reveal } from "@/components/motion/Reveal";

const pillars = [
  { icon: ClipboardCheck, title: "Rotinas acompanhadas", text: "Escrituração, tributos e obrigações vistos como parte do todo." },
  { icon: Headphones, title: "Orientação de verdade", text: "Um canal aberto para entender as dúvidas e falar sobre os números." },
  { icon: FolderCheck, title: "Documentação organizada", text: "Ferramentas para compartilhar arquivos e simplificar processos." },
];

export function Testimonials() {
  return (
    <section id="clientes" className="border-y border-[#e1eaf3] bg-[#f4f7fb] py-14 sm:py-16">
      <div className="container-shell">
        <Reveal className="flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
          <div className="max-w-[510px]"><span className="eyebrow">Nosso compromisso</span><h2 className="mt-4 text-[clamp(1.7rem,3vw,2.6rem)] font-semibold leading-[1.17] tracking-[-.05em] text-[var(--ink)]">Confiança se constrói<br /><span className="text-[var(--cyan)]">todos os dias.</span></h2></div>
          <div className="flex items-center gap-4 border-l-2 border-[var(--cyan)] pl-5"><BrandMark className="hidden size-11 sm:block" /><p className="max-w-[370px] text-[13px] font-medium leading-[1.8] text-[#486580]">Acompanhamos sua contabilidade de perto, com atenção ao que faz diferença na sua rotina.</p></div>
        </Reveal>
        <div className="mt-9 grid gap-6 border-t border-[#dce6f0] pt-8 md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, text }, i) => <Reveal key={title} delay={i * .1} className="flex gap-4"><Icon size={23} strokeWidth={1.6} className="mt-0.5 shrink-0 text-[var(--cyan)]" /><div><h3 className="text-[12px] font-bold text-[var(--ink)]">{title}</h3><p className="mt-1.5 text-[11px] leading-[1.7] text-[#6a839b]">{text}</p></div></Reveal>)}
        </div>
      </div>
    </section>
  );
}
