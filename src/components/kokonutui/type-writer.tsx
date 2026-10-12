"use client";

/** KokonutUI Typewriter · Dorian Baffier / Kokonut Labs · MIT.
 * Adapted with a stable text footprint, real deletion, a Motion cursor,
 * accessible static text and pause / reduced-motion support.
 */
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Sequence = { text: string; pauseAfter?: number };
type Props = { sequences: Sequence[]; className?: string; typingSpeed?: number; deleteSpeed?: number; paused?: boolean };

export default function TypewriterTitle({ sequences, className, typingSpeed = 65, deleteSpeed = 36, paused = false }: Props) {
  const reduce = useReducedMotion();
  const [state, setState] = useState({ index: 0, text: sequences[0]?.text ?? "", phase: "pause" as "typing" | "pause" | "deleting" });
  const longest = sequences.reduce((long, next) => next.text.length > long.length ? next.text : long, "");

  useEffect(() => {
    if (paused || reduce || !sequences.length) return;
    const current = sequences[state.index % sequences.length];
    const delay = state.phase === "pause" ? (current.pauseAfter ?? 2600) : state.phase === "deleting" ? deleteSpeed : typingSpeed;
    const timer = window.setTimeout(() => {
      if (state.phase === "pause") {
        setState({ ...state, phase: "deleting" });
      } else if (state.phase === "deleting") {
        setState(state.text.length > 0
          ? { ...state, text: state.text.slice(0, -1) }
          : { index: (state.index + 1) % sequences.length, text: "", phase: "typing" });
      } else {
        const text = current.text.slice(0, state.text.length + 1);
        setState({ ...state, text, phase: text === current.text ? "pause" : "typing" });
      }
    }, delay);
    return () => window.clearTimeout(timer);
  }, [state, sequences, typingSpeed, deleteSpeed, paused, reduce]);

  return (
    <span data-kokonut="type-writer" className={cn("relative inline-grid max-w-full align-bottom", className)}>
      <span className="sr-only">{sequences[0]?.text}</span>
      <span aria-hidden="true" className="invisible col-start-1 row-start-1 whitespace-nowrap pr-[.2em]">{longest}</span>
      <span aria-hidden="true" className="col-start-1 row-start-1 whitespace-nowrap">
        {paused || reduce ? (sequences[0]?.text ?? "") : state.text}
        <motion.span
          className="ml-[.04em] inline-block h-[.78em] w-[.045em] translate-y-[.055em] rounded-sm bg-current"
          animate={{ opacity: paused || reduce ? 0 : [1, 1, 0, 0] }}
          transition={{ duration: 0.95, repeat: paused || reduce ? 0 : Infinity, times: [0, 0.48, 0.5, 1], ease: "linear" }}
        />
      </span>
    </span>
  );
}
