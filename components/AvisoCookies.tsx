"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const KEY = "fernando-aviso-privacidade";

// Aviso de privacidade/cookies. O site não usa cookies de rastreamento, então não há o que aceitar ou recusar:
// é só um aviso transparente, que some depois do "Entendi" (guardado no próprio navegador).
export default function AvisoCookies() {
  const [ver, setVer] = useState(false);
  useEffect(() => {
    try { if (!localStorage.getItem(KEY)) setVer(true); } catch { /* sem storage: não mostra */ }
  }, []);
  const ok = () => { try { localStorage.setItem(KEY, "ok"); } catch { /* ignora */ } setVer(false); };

  return (
    <AnimatePresence>
      {ver && (
        <motion.aside className="aviso" role="region" aria-label="Aviso de privacidade"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3, delay: 0.6 }}>
          <p>
            <b>Sem cookies de rastreamento.</b> Este site só guarda o seu orçamento no seu próprio navegador.{" "}
            <Link href="/privacidade">Política de privacidade</Link>
          </p>
          <button type="button" className="btn" onClick={ok}>Entendi</button>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
