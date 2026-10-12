"use client";

/** KokonutUI Slide Text Button · Kokonut Labs · MIT.
 * Motion-powered vertical text/arrow transition. Both labels occupy the same
 * grid cell, so longer hover labels never clip or resize the button.
 */
import { useState, type AnchorHTMLAttributes } from "react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  text: string;
  hoverText?: string;
  href: string;
  variant?: "default" | "ghost" | "light" | "navy";
  containerClassName?: string;
};

export default function SlideTextButton({ text, hoverText, href, variant = "default", className, containerClassName, onFocus, onBlur, ...props }: Props) {
  const [focused, setFocused] = useState(false);
  const reduce = useReducedMotion();
  const colors = {
    default: "bg-[var(--cyan)] text-white hover:bg-[#34a8d6]",
    ghost: "border border-current/25 bg-transparent text-current hover:bg-current/5",
    light: "bg-white text-[var(--ink)] hover:bg-[#E8F6FE]",
    navy: "bg-[var(--ink)] text-white hover:bg-[#163961]",
  };
  const transition = { duration: reduce ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <motion.span
      data-kokonut="slide-text-button"
      className={cn("inline-flex max-w-full align-middle", containerClassName)}
      initial="rest"
      animate={focused ? "hover" : "rest"}
      whileHover="hover"
      whileTap={reduce ? undefined : { scale: 0.975 }}
    >
      <Link
        href={href}
        className={cn("group inline-flex min-h-12 w-full items-center justify-center gap-4 rounded-full py-2 pl-6 pr-2.5 text-[12px] font-bold transition-colors", colors[variant], className)}
        onFocus={(event) => { setFocused(true); onFocus?.(event); }}
        onBlur={(event) => { setFocused(false); onBlur?.(event); }}
        {...props}
      >
        <span className="sr-only">{text}</span>
        <span aria-hidden="true" className="relative inline-grid overflow-hidden leading-[1.5]">
          <motion.span className="col-start-1 row-start-1 whitespace-nowrap" variants={{ rest: { y: "0%", opacity: 1 }, hover: { y: "-110%", opacity: 0 } }} transition={transition}>{text}</motion.span>
          <motion.span className="col-start-1 row-start-1 whitespace-nowrap" variants={{ rest: { y: "110%", opacity: 0 }, hover: { y: "0%", opacity: 1 } }} transition={transition}>{hoverText ?? text}</motion.span>
        </span>
        <span aria-hidden="true" className="relative grid size-8 shrink-0 place-items-center overflow-hidden rounded-full border border-current/20">
          <motion.span className="absolute" variants={{ rest: { x: 0, y: 0, opacity: 1 }, hover: { x: 20, y: -20, opacity: 0 } }} transition={transition}><ArrowUpRight size={15} /></motion.span>
          <motion.span className="absolute" variants={{ rest: { x: -20, y: 20, opacity: 0 }, hover: { x: 0, y: 0, opacity: 1 } }} transition={transition}><ArrowUpRight size={15} /></motion.span>
        </span>
      </Link>
    </motion.span>
  );
}
