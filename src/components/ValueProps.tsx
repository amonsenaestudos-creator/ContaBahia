import { FileText, MapPin, Smartphone } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const points = [
  { icon: MapPin, title: "Raiz em Dias d’Ávila", text: "Uma base local, uma relação de proximidade." },
  { icon: FileText, title: "Especialidades conectadas", text: "Contábil, fiscal e pessoal no mesmo escritório." },
  { icon: Smartphone, title: "Menos papel. Mais tempo.", text: "Ferramentas que simplificam a sua rotina." },
];

export function ValueProps() {
  return (
    <section aria-label="A Conta Bahia em resumo" className="bg-white py-10 sm:py-12">
      <div className="container-shell grid gap-6 md:grid-cols-3 md:gap-0">
        {points.map(({ icon: Icon, title, text }, index) => <Reveal key={title} delay={index * .08} className={`flex items-start gap-4 ${index > 0 ? "md:border-l md:border-[#e0e9f3] md:pl-9" : ""} ${index < 2 ? "md:pr-7" : ""}`}><span className="grid size-11 shrink-0 place-items-center rounded-[13px] bg-[#edf4ff] text-[var(--cyan)]"><Icon size={21} strokeWidth={1.65} /></span><div><h2 className="text-[12px] font-bold text-[var(--ink)]">{title}</h2><p className="mt-1.5 text-[11px] leading-relaxed text-[#6b839b]">{text}</p></div></Reveal>)}
      </div>
    </section>
  );
}
