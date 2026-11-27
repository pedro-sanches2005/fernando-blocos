"use client";
import Image from "next/image";
import { motion } from "framer-motion";

// Frota: cada caminhão entra no card "dirigindo" no sentido para onde a cabine aponta.
// frente: 1 = cabine à direita (entra pela esquerda), -1 = cabine à esquerda (entra pela direita).
const frota = [
  { src: "p280xt", w: 1510, h: 1024, marca: "Scania", modelo: "P280 XT", frente: 1, destaque: true },
  { src: "p280", w: 1493, h: 1022, marca: "Scania", modelo: "P280", frente: 1, destaque: true },
  { src: "atego-direita", w: 1530, h: 785, marca: "Mercedes-Benz", modelo: "Atego 2426", frente: 1 },
  { src: "l1620", w: 1593, h: 753, marca: "Mercedes-Benz", modelo: "L 1620", frente: 1 },
  { src: "mb2013", w: 1592, h: 795, marca: "Mercedes-Benz", modelo: "2013", frente: 1 },
];

const ease = [0.16, 0.8, 0.24, 1] as const;

export default function Frota() {
  return (
    <section id="frota" className="frota">
      <div className="frota-in">
        <header>
          <motion.span className="eyebrow" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Nossa frota
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease, delay: 0.05 }}>
            Por trás de cada entrega, <em>uma equipe e uma frota comprometidas com você.</em>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease, delay: 0.15 }}>
            Conheça nossa frota de caminhões, preparada para atender você com eficiência, segurança e pontualidade.
          </motion.p>
        </header>

        <div className="frota-grid">
          {frota.map((c, i) => (
            <motion.article key={c.src} className={`caminhao${c.destaque ? " grande" : ""}`} style={{ "--dir": c.frente } as React.CSSProperties}
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease, delay: (i % 3) * 0.08 }}>
              <span className="c-num">{String(i + 1).padStart(2, "0")}</span>
              <div className="c-palco">
                <div className="c-estrada" aria-hidden="true" />
                <motion.div className="c-foto"
                  initial={{ x: `${-c.frente * 70}%`, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 1.3, ease, delay: 0.15 + (i % 3) * 0.08 }}>
                  <Image src={`/frota/${c.src}.webp`} alt={`Caminhão ${c.marca} ${c.modelo} da Fernando Blocos carregado de blocos cerâmicos`}
                    width={c.w} height={c.h} sizes={c.destaque ? "(max-width:760px) 92vw, 50vw" : "(max-width:760px) 92vw, 33vw"} />
                </motion.div>
              </div>
              <div className="c-info">
                <small>{c.marca}</small>
                <h3>{c.modelo}</h3>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.p className="frota-fecho" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease }}>
          Uma frota preparada para levar <em>qualidade, agilidade e confiança</em> até você.
        </motion.p>
      </div>
    </section>
  );
}
