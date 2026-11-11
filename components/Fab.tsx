"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import WhatsIcon from "./WhatsIcon";
import { CONTATOS, waLink } from "@/lib/config";

export default function Fab() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);

  return (
    <>
      {open && <div className="fab-scrim" onClick={() => setOpen(false)} />}
      <div className="fab-wrap">
        <AnimatePresence>
          {open && (
            <motion.div className="fab-menu" initial={{ opacity: 0, y: 12, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.18 }}>
              {CONTATOS.map((c) => (
                <a key={c.nome} className="fab-item" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}
                  href={waLink(`Olá, ${c.nome}! Vim pelo catálogo da Fernando Blocos.`, c.whats)}>
                  <WhatsIcon size={24} />
                  <span><b>{c.nome}</b><small>{c.fone}</small></span>
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <button className="fab" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label="Falar no WhatsApp">
          <WhatsIcon size={30} />
        </button>
      </div>
    </>
  );
}
