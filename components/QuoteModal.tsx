"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { waLink } from "@/lib/config";
import WhatsIcon from "./WhatsIcon";

const maskPhone = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 3)} ${d.slice(3, 7)}-${d.slice(7)}`;
};

export default function QuoteModal({ open, onClose, bloco, detalhe }: { open: boolean; onClose: () => void; bloco: string; detalhe: string }) {
  const [tel, setTel] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", esc);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", esc); };
  }, [open, onClose]);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const texto =
      `Olá, Fernando! Vim pelo catálogo e gostaria de um orçamento.\n\n` +
      `*BLOCO PEDIDO*\n${detalhe}\n\n` +
      `*MEUS DADOS*\nNome: ${f.get("nome")}\nEmail: ${f.get("email")}\nTelefone: ${f.get("telefone")}\n\n` +
      `*MENSAGEM*\n${f.get("mensagem")}`;
    window.open(waLink(texto), "_blank", "noopener,noreferrer");
    setSent(true);
    setTimeout(() => { setSent(false); onClose(); }, 1800);
  }

  if (typeof document === "undefined") return null;
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div className="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div className="sheet" role="dialog" aria-modal aria-label={`Orçamento do bloco ${bloco}`}
            initial={{ y: 60, opacity: 0, scale: 0.97 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }} onClick={(e) => e.stopPropagation()}>
            <button className="x" onClick={onClose} aria-label="Fechar">×</button>
            {sent ? (
              <div className="ok"><WhatsIcon size={44} /><h4>Abrindo o WhatsApp…</h4><p>É só tocar em enviar.</p></div>
            ) : (
              <form onSubmit={submit}>
                <span className="eyebrow">Orçamento</span>
                <h4>Bloco {bloco} <small>cm</small></h4>
                <label>Nome *<input name="nome" required autoComplete="name" placeholder="Seu nome" /></label>
                <label>Email *<input name="email" type="email" required autoComplete="email" placeholder="voce@email.com" /></label>
                <label>Telefone *<input name="telefone" type="tel" inputMode="tel" required autoComplete="tel" value={tel}
                  onChange={(e) => setTel(maskPhone(e.target.value))} placeholder="(11) 9 0000-0000" /></label>
                <label>Mensagem *<textarea name="mensagem" required rows={4} placeholder="Quantidade, endereço de entrega, prazo…" /></label>
                <button className="send" type="submit"><WhatsIcon size={22} /> Enviar pelo WhatsApp</button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
