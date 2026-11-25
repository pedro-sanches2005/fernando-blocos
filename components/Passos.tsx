"use client";
// Passo a passo animado: cards sobem em sequência, o número vira como placa de aeroporto
// (Split Flap Text do Kokonut UI) e uma linha tracejada liga um passo ao outro.
import { motion, MotionConfig, type Variants } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;
const lista: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } } };
const card: Variants = {
  hidden: { opacity: 0, y: 46, rotate: -2.5 },
  show: { opacity: 1, y: 0, rotate: 0, transition: { type: "spring", stiffness: 210, damping: 20 } },
};
const numero: Variants = {
  hidden: { rotateX: -100, opacity: 0 },
  show: { rotateX: 0, opacity: 1, transition: { duration: 0.6, ease, delay: 0.15 } },
};
const traco: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.55, ease, delay: 0.35 } },
};

export default function Passos({ passos }: { passos: string[][] }) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.ol className="passos" variants={lista} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
        <motion.span className="passos-linha" aria-hidden
          variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.1, ease, delay: 0.2 } } }} />
        {passos.map(([n, t, d]) => (
          <motion.li key={n} variants={card}>
            <span className="passo-num"><motion.b variants={numero}>{n}</motion.b></span>
            <h3>{t}</h3>
            <motion.i className="passo-traco" aria-hidden variants={traco} />
            <p>{d}</p>
          </motion.li>
        ))}
      </motion.ol>
    </MotionConfig>
  );
}
