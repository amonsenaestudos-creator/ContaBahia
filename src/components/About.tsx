import Image from "next/image";
import { BadgeCheck, MapPin, UserRound } from "lucide-react";
import { BrandMark } from "@/components/Brand";
import { Reveal } from "@/components/motion/Reveal";
import SlideTextButton from "@/components/kokonutui/slide-text-button";
import { accountantName } from "@/lib/site";

const principles = [
  { title: "Atendimento direto", text: "Você fala com o contador responsável pelo seu atendimento." },
  { title: "Rotina organizada", text: "Documentos, obrigações e prazos tratados com atenção contínua." },
  { title: "Soluções conectadas", text: "Contabilidade, sistemas e automação na mesma conversa." },
];

export function About() {
  return (
    <section id="sobre" className="section-space overflow-hidden bg-white">
      <div className="container-shell grid items-center gap-12 lg:grid-cols-[.96fr_1.04fr] lg:gap-20">
        <Reveal direction="left" className="relative pb-9">
          <div className="relative aspect-[1.06/1] overflow-hidden rounded-[24px] rounded-bl-[80px] bg-[#e1eaf3]"><Image src="/images/rotina-contabil.jpg" alt="Análise de documentos e cálculo contábil; fotografia ilustrativa" fill sizes="(max-width: 1024px) 90vw, 43vw" className="object-cover object-center" /><div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/35 to-transparent" /><div className="absolute left-5 top-5 rounded-full border border-white/80 bg-white/90 px-3.5 py-2 text-[9px] font-bold uppercase tracking-[.1em] text-[#31587f]">Cuidado em cada detalhe</div></div>
          <div className="absolute bottom-0 right-0 flex items-center gap-4 rounded-[18px] border border-[#e1eaf3] bg-white p-5 shadow-[0_15px_40px_rgba(16,45,80,.1)] sm:-right-5"><BrandMark className="size-11" /><div><span className="flex items-center gap-1 text-[10px] font-bold text-[var(--cyan)]"><MapPin size={11} />Dias d’Ávila · Bahia</span><p className="mt-1.5 text-[13px] font-semibold tracking-[-.025em] text-[var(--ink)]">Atendimento com responsável definido.</p></div></div>
        </Reveal>
        <Reveal direction="right" delay={.1}>
          <span className="eyebrow">04 / Quem cuida da Conta Bahia</span>
          <h2 className="display-heading mt-5">Contabilidade conduzida por quem acompanha a sua empresa.</h2>
          <div className="mt-5 flex items-center gap-3 rounded-[14px] border border-[#dce9f3] bg-[#f4f9fd] p-4"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-[var(--cyan)]"><UserRound size={19} /></span><div><p className="text-[12px] font-bold text-[var(--ink)]">{accountantName}</p><p className="mt-0.5 text-[10px] text-[#6e8499]">Contador responsável pela Conta Bahia Contabilidade</p></div><BadgeCheck size={17} className="ml-auto text-[var(--cyan)]" /></div>
          <p className="mt-5 text-[14px] leading-[1.85] text-[#5e748b]">A Conta Bahia é um escritório de atendimento pessoal, sediado em Dias d’Ávila. João Márcio Santos Sena concentra o relacionamento com cada cliente, unindo serviços contábeis, fiscais, trabalhistas e de legalização.</p>
          <p className="mt-3 text-[13px] leading-[1.85] text-[#71879d]">Além da rotina contábil, o escritório trabalha com sincronização de dados pelo Conta Box, sistemas de gestão comercial, automação e prestação de contas eleitoral.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">{principles.map((principle, i) => <Reveal key={principle.title} delay={i * .1} className="border-t-2 border-[#c4dafa] pt-4"><span className="text-[9px] font-bold tracking-[.12em] text-[var(--cyan)]">0{i + 1}</span><h3 className="mt-2 text-[12px] font-bold text-[var(--ink)]">{principle.title}</h3><p className="mt-1.5 text-[11px] leading-[1.65] text-[#748ba1]">{principle.text}</p></Reveal>)}</div>
          <div className="mt-8"><SlideTextButton href="#contato" text="Falar com João Márcio" hoverText="Vamos conversar" variant="navy" /></div>
        </Reveal>
      </div>
    </section>
  );
}
