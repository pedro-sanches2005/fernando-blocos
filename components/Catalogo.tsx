"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BlockCard from "./BlockCard";
import { blocos, CATEGORIAS, num, type CategoriaId } from "@/data/blocos";

export default function Catalogo() {
  const [cat, setCat] = useState<CategoriaId>("vedacao");
  const [f, setF] = useState("Todos");
  const atual = CATEGORIAS.find((c) => c.id === cat)!;
  const base = blocos.filter((b) => (b.categoria ?? "vedacao") === cat);
  const larguras = [...new Set(base.map((b) => b.largura))].sort((a, b) => num(a) - num(b));
  const lista = f === "Todos" ? base : base.filter((b) => b.largura === f);
  const trocar = (id: CategoriaId) => { setCat(id); setF("Todos"); };

  return (
    <>
      <div id="linha" className="tabs" role="tablist" aria-label="Categorias de produtos">
        {CATEGORIAS.map((c) => (
          <button key={c.id} role="tab" className="tab" aria-selected={cat === c.id} onClick={() => trocar(c.id)}>{c.nome}</button>
        ))}
      </div>
      <div className="chips" role="group" aria-label="Filtrar por espessura da parede">
        {["Todos", ...larguras].map((x) => (
          <button key={x} className={`chip${f === x ? " on" : ""}`} aria-pressed={f === x} onClick={() => setF(x)}>
            {x === "Todos" ? "Todos" : `${x} cm`}
          </button>
        ))}
      </div>
      <p className="conta">
        {lista.length} {lista.length === 1 ? "medida" : "medidas"} · {atual.nota}
      </p>
      <motion.div layout className="grid">
        <AnimatePresence mode="popLayout">
          {lista.map((b, i) => <BlockCard key={b.slug} b={b} i={i} />)}
        </AnimatePresence>
      </motion.div>
    </>
  );
}