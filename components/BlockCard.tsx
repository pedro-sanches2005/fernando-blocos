
"use client";
import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { Bloco } from "@/data/blocos";
import Cotas from "./Cotas";
import { adicionar, useOrcamento, PADRAO } from "@/lib/orcamento";

export default function BlockCard({ b, i }: { b: Bloco; i: number }) {
  const itens = useOrcamento();
  const noOrcamento = itens.find((i) => i.id === b.slug)?.qtd ?? 0;
  const [medidas, setMedidas] = useState(false);
  const estrut = b.categoria === "estrutural";
  const nome = `${b.largura}×${b.altura}×${b.comprimento}`;

  return (
    <motion.article
      layout
      className="card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={`card-top${medidas ? " planta" : ""}`}>
        {!medidas && <span className="furos">{b.furos ? `${b.furos} furos` : "Estrutural"}</span>}
        <AnimatePresence mode="wait" initial={false}>
          {medidas ? (
            <motion.div key="m" className="stage planta-wrap" style={{ transformPerspective: 700 }}
              initial={{ rotateY: 90, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} exit={{ rotateY: -90, opacity: 0 }} transition={{ duration: 0.22 }}>
              <Cotas b={b} />
            </motion.div>
          ) : (
            <motion.div key="f" className="stage" style={{ transformPerspective: 700 }}
              initial={{ rotateY: -90, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} exit={{ rotateY: 90, opacity: 0 }}
              whileHover={{ rotate: -2.5, y: -8 }} whileTap={{ rotate: -2.5, y: -8 }} transition={{ duration: 0.22 }}>
              <Image src={`/blocos/${b.slug}.webp`} alt={`Bloco cerâmico ${estrut ? "estrutural " : ""}${nome} cm`} width={600} height={600}
                className={`card-img${b.categoria ? " recorte" : ""}`} sizes="(max-width:640px) 80vw, (max-width:1024px) 40vw, 22vw" />
            </motion.div>
          )}
        </AnimatePresence>
        <button className="ver" onClick={() => setMedidas((v) => !v)} aria-pressed={medidas}>
          {medidas ? "Ver foto" : "Ver medidas"}
        </button>
      </div>

      <div className="card-body">
        <h3>{nome}<small> cm</small></h3>
        <dl className="dims">
          <div><dt>Largura</dt><dd>{b.largura}</dd></div>
          <div><dt>Altura</dt><dd>{b.altura}</dd></div>
          <div><dt>Comprim.</dt><dd>{b.comprimento}</dd></div>
        </dl>
        <p className="uso">{b.uso}</p>
        <button className={`quote${noOrcamento ? " added" : ""}`}
          onClick={() => adicionar({ id: b.slug, nome: estrut ? `Estrutural ${nome}` : nome, medida: b.furos ? `${b.furos} furos` : "estrutural" })}>
          {noOrcamento ? `✓ No orçamento (${noOrcamento.toLocaleString("pt-BR")}) · +${PADRAO}` : "+ Adicionar ao orçamento"}
        </button>
      </div>

    </motion.article>
  );
}