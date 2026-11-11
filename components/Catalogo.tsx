"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BlockCard from "./BlockCard";
import { blocos } from "@/data/blocos";

const FILTROS = ["Todos", "9", "11,5", "14", "19"];

export default function Catalogo() {
  const [f, setF] = useState("Todos");
  const lista = f === "Todos" ? blocos : blocos.filter((b) => b.largura === f);

  return (
    <>
      <div id="linha" className="chips" role="group" aria-label="Filtrar por espessura da parede">
        {FILTROS.map((x) => (
          <button key={x} className={`chip${f === x ? " on" : ""}`} aria-pressed={f === x} onClick={() => setF(x)}>
            {x === "Todos" ? "Todos" : `${x} cm`}
          </button>
        ))}
      </div>
      <p className="conta">
        {lista.length} {lista.length === 1 ? "medida" : "medidas"} · a espessura da parede é a largura do bloco
      </p>
      <motion.div layout className="grid">
        <AnimatePresence mode="popLayout">
          {lista.map((b, i) => <BlockCard key={b.slug} b={b} i={i} />)}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
