"use client";
import { useState } from "react";
import { blocos, num } from "@/data/blocos";
import { waLink } from "@/lib/config";

const PERDA = 0.05; // 5% de quebra
const JUNTA = 1;    // cm de argamassa

const n = (s: string) => {
  const v = parseFloat(s.replace(",", "."));
  return Number.isFinite(v) && v > 0 ? v : 0;
};
const br = (v: number, d = 0) => v.toLocaleString("pt-BR", { minimumFractionDigits: d, maximumFractionDigits: d });

export default function Calculadora() {
  const [slug, setSlug] = useState("14x19x39");
  const [lar, setLar] = useState("5");
  const [alt, setAlt] = useState("2,8");
  const [aber, setAber] = useState("0");

  const b = blocos.find((x) => x.slug === slug)!;
  const nome = `${b.largura}×${b.altura}×${b.comprimento}`;
  const porM2 = 10000 / ((num(b.comprimento) + JUNTA) * (num(b.altura) + JUNTA));
  const liq = Math.max(n(lar) * n(alt) - n(aber), 0);
  const total = Math.ceil(liq * porM2 * (1 + PERDA));

  const msg =
    `Olá, Fernando! Fiz um cálculo no catálogo.\n\n` +
    `*BLOCO*\n${nome} cm\n\n` +
    `*PAREDE*\n${br(n(lar), 2)} m × ${br(n(alt), 2)} m, descontando ${br(n(aber), 2)} m² de aberturas (${br(liq, 1)} m² de parede)\n\n` +
    `*ESTIMATIVA*\nEm torno de ${br(total)} blocos, já com 5% de perda.\n\nPode me passar o orçamento?`;

  return (
    <section id="calculadora" className="calc">
      <div className="calc-in">
        <header>
          <span className="eyebrow">Calculadora</span>
          <h2>Quantos blocos <em>eu preciso?</em></h2>
          <p>Informe a parede e a gente faz a conta, já com a sobra para quebra.</p>
        </header>

        <div className="calc-grid">
          <form className="calc-form" onSubmit={(e) => e.preventDefault()}>
            <label>Bloco
              <select value={slug} onChange={(e) => setSlug(e.target.value)}>
                {blocos.map((x) => (
                  <option key={x.slug} value={x.slug}>{x.largura}×{x.altura}×{x.comprimento} cm · {x.furos} furos</option>
                ))}
              </select>
            </label>
            <div className="duo">
              <label>Largura da parede (m)
                <input inputMode="decimal" value={lar} onChange={(e) => setLar(e.target.value)} />
              </label>
              <label>Altura da parede (m)
                <input inputMode="decimal" value={alt} onChange={(e) => setAlt(e.target.value)} />
              </label>
            </div>
            <label>Portas e janelas a descontar (m²)
              <input inputMode="decimal" value={aber} onChange={(e) => setAber(e.target.value)} />
            </label>
          </form>

          <div className="resultado" aria-live="polite">
            {total > 0 ? (
              <>
                <span>Você vai precisar de cerca de</span>
                <strong>{br(total)}</strong>
                <span>blocos {nome} cm</span>
                <small>{br(liq, 1)} m² de parede · {br(porM2, 1)} blocos por m² · 5% de perda incluída</small>
                <a className="btn" href={waLink(msg)} target="_blank" rel="noopener noreferrer">Pedir esse orçamento</a>
              </>
            ) : (
              <span>Informe a largura e a altura da parede para ver a conta.</span>
            )}
          </div>
        </div>
        <p className="nota">Estimativa com junta de 1 cm, bloco assentado com o comprimento na horizontal. O Fernando confirma a quantidade no orçamento.</p>
      </div>
    </section>
  );
}
