import Link from "next/link";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { Brand, HorizonMotif } from "@/components/Brand";
import { Reveal } from "@/components/motion/Reveal";
import SlideTextButton from "@/components/kokonutui/slide-text-button";
import { accountantName, contactEmail, contactPhone, officeLocation, phoneLink } from "@/lib/site";

const links = [
  { label: "Serviços", href: "#servicos" },
  { label: "Planos", href: "#sistemas" },
  { label: "Sistemas", href: "#sistemas" },
  { label: "Conta Box", href: "#ferramentas" },
  { label: "Clientes", href: "#clientes" },
  { label: "Prestação eleitoral", href: "#eleitoral" },
  { label: "Sobre nós", href: "#sobre" },
  { label: "Conteúdos", href: "#blog" },
];

export function Footer({ home = true }: { home?: boolean }) {
  const hrefFor = (hash: string) => home ? hash : `/${hash}`;
  return (
    <footer className="relative overflow-hidden bg-[var(--navy)] text-white">
      <HorizonMotif className="pointer-events-none absolute -right-44 -top-40 size-[640px] text-[#9bcaff]/10" />
      <div className="container-shell relative">
        <Reveal className="flex flex-col gap-6 border-b border-white/15 py-14 sm:flex-row sm:items-center sm:justify-between">
          <div><span className="eyebrow eyebrow--light">Perto para cuidar. Pronta para evoluir.</span><h2 className="mt-4 text-[clamp(1.75rem,3vw,2.8rem)] font-semibold leading-[1.15] tracking-[-.05em]">O futuro da sua empresa<br />começa com uma conversa.</h2></div>
          <SlideTextButton href={hrefFor("#contato")} text="Falar com a Conta Bahia" hoverText="Vamos dar o próximo passo" variant="light" />
        </Reveal>
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.35fr_.75fr_1fr] lg:gap-16">
          <div><Link href={hrefFor("#inicio")} aria-label="Conta Bahia, início"><Brand light /></Link><p className="mt-5 max-w-[310px] text-[12px] leading-[1.85] text-[#a3bdd7]">Consultoria contábil, fiscal e tributária com sede em Dias d’Ávila, Bahia. Atendimento direto com João Márcio Santos Sena, contador responsável.</p></div>
          <div><h3 className="text-[9px] font-bold uppercase tracking-[.22em] text-[#91c5ff]">Explore</h3><ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 lg:grid-cols-1">{links.map((link) => <li key={link.href}><Link href={hrefFor(link.href)} className="text-[11px] text-[#b1c9e1] transition hover:text-white">{link.label}</Link></li>)}</ul></div>
          <div><h3 className="text-[9px] font-bold uppercase tracking-[.22em] text-[#91c5ff]">Canais de atendimento</h3><div className="mt-5 space-y-4 text-[11px] text-[#b1c9e1]"><a href={`mailto:${contactEmail}`} className="block break-all hover:text-white">{contactEmail}</a><a href={phoneLink()} className="flex items-center gap-2 hover:text-white"><Phone size={13} />{contactPhone}</a><p className="text-[10px] text-[#9bb7d3]">{accountantName}</p><p className="flex items-start gap-2 leading-relaxed"><MapPin size={13} className="mt-0.5 shrink-0" />{officeLocation}</p></div><Link href={hrefFor("#contato")} className="mt-6 inline-flex items-center gap-1.5 text-[11px] font-bold text-[#91c5ff] hover:text-white">Enviar uma mensagem <ArrowUpRight size={13} /></Link></div>
        </div>
        <div className="flex flex-col gap-3 border-t border-white/15 py-5 text-[9px] text-[#8ca8c3] sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} Conta Bahia Contabilidade. Todos os direitos reservados.</p><div className="flex gap-5"><Link href="/privacidade" className="hover:text-white">Privacidade e LGPD</Link><a href={`mailto:${contactEmail}`} className="hover:text-white">Fale conosco</a></div></div>
      </div>
    </footer>
  );
}
