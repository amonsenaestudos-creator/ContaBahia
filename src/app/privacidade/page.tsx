import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { contactEmail } from "@/lib/site";

export const metadata: Metadata = { title: "Aviso de privacidade", description: "Como a Conta Bahia Contabilidade trata as informações enviadas por este site." };

const sections = [
  { title: "Quais dados coletamos", body: "Quando você preenche o formulário, recebemos seu nome, e-mail, telefone, tipo de empresa e a mensagem enviada. Esses dados são usados para responder à solicitação e dar continuidade ao atendimento." },
  { title: "Como protegemos e compartilhamos os dados", body: "Os dados são armazenados em ambiente controlado e acessados apenas para a finalidade de atendimento. Não comercializamos informações pessoais. O site utiliza infraestrutura de armazenamento configurada pela empresa, que deve aplicar controles de acesso, retenção e segurança adequados." },
  { title: "Atualizações deste aviso", body: "Este conteúdo pode ser atualizado para refletir mudanças nos serviços ou nos requisitos legais. Recomendamos que a versão final seja validada com a pessoa responsável pela privacidade e proteção de dados da empresa." },
];

export default function PrivacyPage() {
  return (
    <>
      <Header home={false} />
      <main id="page-content" className="min-h-[70vh] bg-[#f4f7fb] py-12 sm:py-16">
        <article className="container-shell max-w-[760px]">
          <Link href="/#inicio" className="inline-flex items-center gap-2 text-xs font-bold text-[#617588] transition hover:text-[#2367c8]"><ArrowLeft size={14} /> Voltar ao início</Link>
          <div className="mt-8 rounded-[18px] border border-[#e0e7ed] bg-white p-6 sm:p-12">
            <span className="eyebrow">Privacidade e proteção de dados</span>
            <h1 className="mt-5 text-[clamp(2rem,4.8vw,3.2rem)] font-semibold tracking-[-.05em] text-[#173a60]">Aviso de privacidade</h1>
            <p className="mt-5 text-[14px] leading-[1.85] text-[#5d7083]">Este aviso explica como as informações enviadas pelo formulário de contato da Conta Bahia Contabilidade são utilizadas. O conteúdo deve ser revisado e complementado pela empresa conforme seus processos e obrigações aplicáveis.</p>
            <div className="mt-8 space-y-7">{sections.map((section) => <section key={section.title} className="border-t border-[#e4eaf0] pt-6"><h2 className="text-[16px] font-bold text-[#173a60]">{section.title}</h2><p className="mt-2 text-[13px] leading-[1.85] text-[#5d7083]">{section.body}</p></section>)}<section className="border-t border-[#e4eaf0] pt-6"><h2 className="text-[16px] font-bold text-[#173a60]">Seus direitos</h2><p className="mt-2 text-[13px] leading-[1.85] text-[#5d7083]">Você pode solicitar informações sobre o tratamento, correção ou exclusão dos dados pessoais enviados, observadas as obrigações legais de guarda. Para isso, escreva para <a href={`mailto:${contactEmail}`} className="font-bold text-[#2367c8] underline underline-offset-2">{contactEmail}</a>.</p></section></div>
          </div>
        </article>
      </main>
      <Footer home={false} />
    </>
  );
}
