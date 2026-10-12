"use client";

import Image from "next/image";
import { Building2, ImagePlus, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { clients, clientSectors } from "@/lib/commercial";
import { withBasePath } from "@/lib/paths";
import { Reveal } from "@/components/motion/Reveal";

export function Clients() {
  return (
    <section id="clientes" className="section-space bg-white">
      <div className="container-shell">
        <Reveal className="grid gap-6 md:grid-cols-[1fr_.8fr] md:items-end">
          <div><span className="eyebrow">Empresas atendidas</span><h2 className="display-heading mt-5">Parcerias que merecem<br />ser bem cuidadas.</h2></div>
          <p className="max-w-[390px] text-[13px] leading-[1.8] text-[#627a92]">A Conta Bahia atende negócios de diferentes segmentos. Logos e nomes de clientes são exibidos apenas quando existe autorização.</p>
        </Reveal>

        {clients.length > 0 ? (
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {clients.map((client, index) => <motion.article key={client.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .4, delay: index * .05 }} className="flex min-h-[140px] flex-col items-center justify-center gap-2.5 rounded-[15px] border border-[#e4edf5] bg-[#f8fbfd] px-4 py-6 text-center">{client.logo ? <Image src={withBasePath(client.logo)} alt={client.name} width={120} height={36} className="h-9 max-w-full object-contain" /> : <span className="grid size-11 place-items-center rounded-full bg-white text-[var(--cyan)]"><Building2 size={18} /></span>}<p className="text-[11px] font-bold leading-tight text-[var(--ink)]">{client.name}</p><p className="text-[9px] uppercase tracking-[.09em] text-[#8ba1b6]">{client.sector}</p></motion.article>)}
          </div>
        ) : (
          <Reveal className="mt-10 rounded-[20px] border border-dashed border-[#c8ddec] bg-[#f4f9fd] p-6 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center"><span className="grid size-12 shrink-0 place-items-center rounded-[14px] bg-white text-[var(--cyan)]"><ImagePlus size={21} strokeWidth={1.7} /></span><div><h3 className="text-[15px] font-bold text-[var(--ink)]">Vitrine de clientes pronta para receber os parceiros da Conta Bahia.</h3><p className="mt-1.5 max-w-[650px] text-[12px] leading-relaxed text-[#6c8399]">Adicione logos e nomes autorizados em <code className="rounded bg-white px-1.5 py-0.5 text-[10px] text-[var(--cyan)]">src/lib/commercial.ts</code>. Enquanto isso, apresentamos os segmentos que fazem parte da rotina do escritório.</p></div></div>
          </Reveal>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-2.5">{clientSectors.map((sector) => <span key={sector} className="rounded-full border border-[#dce9f3] bg-white px-4 py-2 text-[11px] font-semibold text-[#55708c]">{sector}</span>)}</div>
        <Reveal className="mt-10 flex flex-col items-center gap-4 rounded-[18px] bg-[var(--ink)] px-6 py-7 text-center text-white sm:flex-row sm:justify-between sm:text-left"><div className="flex items-start gap-3.5"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 text-[#9bcaff]"><ShieldCheck size={19} strokeWidth={1.8} /></span><div><p className="text-[13px] font-bold">Sua empresa também pode contar com a Conta Bahia.</p><p className="mt-1 text-[11px] leading-relaxed text-[#b4cae0]">Conheça uma proposta de atendimento adequada à rotina do seu negócio.</p></div></div><a href="#contato" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--cyan)] px-5 py-3 text-[12px] font-bold text-white transition hover:bg-[#34a8d6]">Pedir proposta</a></Reveal>
      </div>
    </section>
  );
}
