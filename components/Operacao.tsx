"use client";
import Image from "next/image";
import { motion } from "framer-motion";

// Da carga ao canteiro: a ordem das fotos é a ordem real do caminho do bloco.
const cenas = [
  { src: "carregamento", w: 591, h: 422, span: 5, de: 1, t: "Blocos  prontos para sair.", alt: "Pallets de blocos cerâmicos empilhados" },
  { src: "empilhadeira", w: 612, h: 408, span: 7, de: -1, t: "Carregamento com empilhadeira.", alt: "Empilhadeira carregando blocos no caminhão" },
  { src: "caminhao-fundo", w: 707, h: 353, span: 5, de: -1, t: "Carga amarrada e a caminho.", alt: "Caminhão carregado de blocos com a placa da Fernando Blocos" },
  { src: "caminhao-obra", w: 717, h: 348, span: 7, de: 1, t: "Entrega na porta da obra.", alt: "Caminhão descarregando blocos em frente a uma obra" },
  { src: "obra", w: 592, h: 421, span: 12, de: 0, t: "E a parede sobe.", alt: "Edifício em construção com paredes de bloco cerâmico" },
];

export default function Operacao() {
  return (
    <section id="entrega" className="oper">
      <header>
        <span className="eyebrow">Da carga à obra</span>
        <h2>Do pátio <em>até a sua obra.</em></h2>
        <p>Cada etapa do caminho do bloco, do pallet ao canteiro.</p>
      </header>
      <div className="oper-grid">
        {cenas.map((c, i) => (
          <motion.figure key={c.src} className={`cena s${c.span}${i % 2 ? " alt" : ""}${i === cenas.length - 1 ? " fim" : ""}`}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.4 }}>
            <b className="n">{i + 1}</b>
            <motion.div className="foto" initial={{ x: c.de * 90 }} whileInView={{ x: 0 }} viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
              <Image src={`/fotos/${c.src}.webp`} alt={c.alt} width={c.w} height={c.h} sizes="(max-width:760px) 90vw, 50vw" />
            </motion.div>
            <figcaption>{c.t}</figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
