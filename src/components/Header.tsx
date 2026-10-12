"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { Menu, X } from "lucide-react";
import { Brand } from "@/components/Brand";
import SlideTextButton from "@/components/kokonutui/slide-text-button";

const navItems = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Planos", href: "#sistemas" },
  { label: "Clientes", href: "#clientes" },
  { label: "Conta Box", href: "#ferramentas" },
  { label: "Sobre", href: "#sobre" },
  { label: "Conteúdos", href: "#blog" },
];

export function Header({ home = true }: { home?: boolean }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(home ? "#inicio" : "#blog");
  const menuButton = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 150, damping: 30 });
  const hrefFor = (hash: string) => (home ? hash : `/${hash}`);

  useEffect(() => {
    if (!home) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(`#${entry.target.id}`);
      },
      { rootMargin: "-15% 0px -65% 0px", threshold: 0 }
    );
    navItems.forEach((item) => {
      const element = document.getElementById(item.href.slice(1));
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [home]);

  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-white/95 backdrop-blur-xl">
      <a
        href={home ? "#conteudo" : "#page-content"}
        className="sr-only z-[60] rounded-lg bg-[var(--cyan)] px-5 py-3 text-sm text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
      >
        Pular para o conteúdo
      </a>

      <div className="container-shell flex h-[82px] items-center justify-between gap-5">
        <Link href={hrefFor("#inicio")} aria-label="Conta Bahia Contabilidade, início">
          <Brand />
        </Link>

        <nav aria-label="Navegação principal" className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={hrefFor(item.href)}
              className="relative rounded-full px-3 py-2.5 text-[11px] font-semibold text-[#5A7190] transition-colors hover:text-[var(--cyan)] xl:px-3.5 xl:text-[12px]"
              aria-current={home && active === item.href ? "location" : undefined}
            >
              {home && active === item.href && (
                <motion.span
                  layoutId="active-main-nav"
                  className="absolute inset-0 rounded-full bg-[#E8F6FE]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className={`relative whitespace-nowrap ${home && active === item.href ? "text-[var(--cyan)]" : ""}`}>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <SlideTextButton
            href={hrefFor("#contato")}
            text="Vamos conversar"
            hoverText="Fale com João Márcio"
            variant="navy"
            className="min-h-11 text-[11px]"
          />
        </div>

        <motion.button
          ref={menuButton}
          type="button"
          onClick={() => setOpen(!open)}
          whileTap={{ scale: 0.93 }}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="grid size-11 place-items-center rounded-xl border border-[var(--line)] text-[var(--ink)] lg:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </motion.button>
      </div>

      <motion.div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-[var(--cyan)]"
        style={{ scaleX: reduce ? scrollYProgress : progress }}
      />

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-navigation"
            aria-label="Navegação móvel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: reduce ? 0 : 0.25 }}
            className="absolute inset-x-0 top-full max-h-[calc(100dvh-82px)] overflow-auto border-b border-[var(--line)] bg-white shadow-xl lg:hidden"
          >
            <div className="container-shell flex flex-col gap-1 py-5">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03, duration: reduce ? 0 : 0.2 }}
                >
                  <Link
                    href={hrefFor(item.href)}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-3 text-[13px] font-semibold text-[var(--ink)] hover:bg-[#E8F6FE]"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-3">
                <SlideTextButton
                  href={hrefFor("#contato")}
                  text="Vamos conversar"
                  hoverText="Fale com João Márcio"
                  onClick={() => setOpen(false)}
                  containerClassName="w-full"
                />
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
