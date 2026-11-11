"use client";
import { Fragment, useEffect, useRef, useState } from "react";

export default function Marquee({ frases }: { frases: string[] }) {
  const [ativo, setAtivo] = useState<number | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const lista = [...frases, ...frases, ...frases, ...frases];

  useEffect(() => () => clearTimeout(timer.current), []);

  // Toque no celular: destaca a frase e pausa; toque de novo, toque fora ou 5s soltam.
  useEffect(() => {
    if (ativo === null) return;
    const fora = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && !(e.target as HTMLElement).closest?.(".item")) setAtivo(null);
    };
    window.addEventListener("pointerdown", fora);
    return () => window.removeEventListener("pointerdown", fora);
  }, [ativo]);

  function toque(i: number) {
    clearTimeout(timer.current);
    if (ativo === i) { setAtivo(null); return; }
    setAtivo(i);
    timer.current = window.setTimeout(() => setAtivo(null), 5000);
  }

  return (
    <div className={`marquee${ativo !== null ? " foco" : ""}`}>
      <div className="track" aria-hidden>
        {lista.map((t, i) => (
          <Fragment key={i}>
            <span
              className={`item${ativo === i ? " on" : ""}`}
              onPointerEnter={(e) => { if (e.pointerType === "mouse") setAtivo(i); }}
              onPointerLeave={(e) => { if (e.pointerType === "mouse") setAtivo(null); }}
              onPointerUp={(e) => { if (e.pointerType !== "mouse") toque(i); }}
            >{t}</span>
            <b className="sep">◆</b>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
