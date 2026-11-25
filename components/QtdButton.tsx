"use client";
// "Adicionar ao orçamento" que se abre num contador − n + no mesmo lugar (Cart Button do Kokonut UI),
// com explosão de lascas de tijolo ao adicionar (Particle Button do Kokonut UI).
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { adicionar, mudarQtd, qtdDe, somar, useOrcamento, PADRAO } from "@/lib/orcamento";
import { Burst, Check, EASE_OUT, Rolling, useHold } from "./anim/kokonut";

const TIJOLO = ["#a4442a", "#c45a36", "#e0784f", "#2a1a12"];
const troca = { duration: 0.22, ease: EASE_OUT };

export default function QtdButton({ id, nome, medida }: { id: string; nome: string; medida: string }) {
  const itens = useOrcamento();
  const qtd = itens.find((x) => x.id === id)?.qtd ?? 0;
  const [burst, setBurst] = useState<{ k: number; x: number } | null>(null);
  const [acabou, setAcabou] = useState(false); // ✓ rápido logo depois de adicionar
  const reduz = useReducedMotion();

  const hold = useHold((d, repetindo) => {
    if (d < 0 && qtdDe(id) <= PADRAO) {
      if (repetindo) return false; // segurando o − para no mínimo; tirar do orçamento é um toque só
      mudarQtd(id, 0);
      return false;
    }
    return somar(id, d * PADRAO, PADRAO);
  });

  function add(e: React.MouseEvent<HTMLButtonElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    adicionar({ id, nome, medida });
    if (!reduz) setBurst({ k: Date.now(), x: e.clientX ? e.clientX - r.left : r.width / 2 });
    setAcabou(true);
    window.setTimeout(() => setAcabou(false), 700);
  }

  const aberto = qtd > 0;
  return (
    <div className="qtd-wrap">
      {burst && <Burst key={burst.k} originX={burst.x} cores={TIJOLO} onDone={() => setBurst(null)} />}
      <AnimatePresence mode="popLayout" initial={false}>
        {!aberto ? (
          <motion.button key="add" type="button" className="quote" onClick={add}
            initial={{ opacity: 0, y: 8, filter: "blur(3px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(3px)" }} transition={troca}>
            + Adicionar ao orçamento
          </motion.button>
        ) : (
          <motion.div key="passo" className="passo" role="group" aria-label={`Quantidade do bloco ${nome} no orçamento`}
            initial={{ opacity: 0, scale: 0.96, filter: "blur(3px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.96, filter: "blur(3px)" }} transition={troca}>
            <motion.button type="button" className="passo-b" {...hold(-1)} initial={{ x: 16, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={troca}
              aria-label={qtd <= PADRAO ? `Tirar ${nome} do orçamento` : `Menos ${PADRAO}`}>
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span key={qtd <= PADRAO ? "lixo" : "menos"} className="passo-ic"
                  initial={{ opacity: 0, scale: 0.6, filter: "blur(2px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.6, filter: "blur(2px)" }} transition={{ duration: 0.16 }}>
                  {qtd <= PADRAO ? <Lixo /> : "−"}
                </motion.span>
              </AnimatePresence>
            </motion.button>
            <output className="passo-n" aria-live="polite">
              <span className="sr">{`${qtd} unidades no orçamento`}</span>
              <strong><Rolling value={qtd} /></strong>
              <small>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span key={acabou ? "ok" : "un"} className="passo-cap"
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}>
                    {acabou ? <><Check size={13} /> adicionado</> : "un. no orçamento"}
                  </motion.span>
                </AnimatePresence>
              </small>
            </output>
            <button type="button" className="passo-b" {...hold(1)} aria-label={`Mais ${PADRAO}`}><span className="passo-ic">+</span></button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Lixo() {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6" />
    </svg>
  );
}
