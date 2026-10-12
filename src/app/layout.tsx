import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Conta Bahia Contabilidade | Dias d’Ávila, BA", template: "%s | Conta Bahia Contabilidade" },
  description: "Conta Bahia Contabilidade em Dias d’Ávila, BA. Serviços contábeis, fiscais, trabalhistas, legalização de empresas, automação e prestação de contas eleitoral.",
  openGraph: { title: "Conta Bahia Contabilidade", description: "Consultoria contábil, fiscal e tributária com sede em Dias d’Ávila, Bahia.", locale: "pt_BR", type: "website" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={jakarta.variable}>
      <body className="antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
