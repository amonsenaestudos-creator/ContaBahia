"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = { children: ReactNode; className?: string; delay?: number; direction?: "up" | "left" | "right" };

export function Reveal({ children, className, delay = 0, direction = "up" }: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cn("motion-reveal", className)}
      initial={reduce ? false : { opacity: 0, y: direction === "up" ? 28 : 0, x: direction === "left" ? -28 : direction === "right" ? 28 : 0 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -25px 0px" }}
      transition={{ duration: reduce ? 0 : 0.65, delay: reduce ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
