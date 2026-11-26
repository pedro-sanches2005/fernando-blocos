"use client";
// Vídeo do pátio dentro de um celular, no estilo Reels. Sem números falsos de curtidas/seguidores:
// cada botão faz algo de verdade (curtir é só visual; comentar abre o WhatsApp; enviar compartilha o site).
// O vídeo só baixa/toca quando aparece na tela e pausa fora dela.
// Um toque abre o vídeo grande (tela cheia); dois toques curtem; o botão de pausa fica na lateral.
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CONTATOS, waLink } from "@/lib/config";
import { abrirOrcamento } from "@/lib/orcamento";

export default function VideoPlaca() {
  const ref = useRef<HTMLVideoElement>(null);
  const [tocando, setTocando] = useState(false);
  const [curtido, setCurtido] = useState(false);
  const [coracao, setCoracao] = useState(0); // coração grande do duplo toque
  const [aviso, setAviso] = useState<"" | "pausa" | "play">("");
  const [prog, setProg] = useState(0);
  const [grande, setGrande] = useState(false); // vídeo ampliado
  const [jaViu, setJaViu] = useState(false);   // some o "toque para assistir" depois do 1º clique
  const pausadoPeloUsuario = useRef(false);
  const toque = useRef<number | undefined>(undefined);
  const reduz = useReducedMotion();

  useEffect(() => {
    const v = ref.current;
    if (!v || reduz) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !pausadoPeloUsuario.current) v.play().catch(() => {});
      else if (!e.isIntersecting) v.pause();
    }, { threshold: 0.3 });
    io.observe(v);
    return () => { io.disconnect(); clearTimeout(toque.current); };
  }, [reduz]);

  function alternar() {
    const v = ref.current;
    if (!v) return;
    if (v.paused) { pausadoPeloUsuario.current = false; v.play().catch(() => {}); setAviso("play"); }
    else { pausadoPeloUsuario.current = true; v.pause(); setAviso("pausa"); }
    window.setTimeout(() => setAviso(""), 600);
  }
  function ampliar() { setJaViu(true); setGrande(true); ref.current?.pause(); }
  function fecharGrande() {
    setGrande(false);
    if (!pausadoPeloUsuario.current && !reduz) ref.current?.play().catch(() => {});
  }
  // um toque abre o vídeo grande; dois toques curtem (como no Instagram)
  function tocarTela() {
    if (toque.current) { clearTimeout(toque.current); toque.current = undefined; setCurtido(true); setCoracao(Date.now()); return; }
    toque.current = window.setTimeout(() => { toque.current = undefined; ampliar(); }, 260);
  }
  async function compartilhar() {
    const url = window.location.origin;
    try {
      if (navigator.share) await navigator.share({ title: "Fernando Blocos", text: "Blocos cerâmicos em Itu. Peça pelo WhatsApp:", url });
      else { await navigator.clipboard.writeText(url); alert("Link do site copiado!"); }
    } catch { /* cancelado */ }
  }

  return (
    <div className="cel-wrap">
    <motion.p className="cel-chamada" aria-hidden initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.6, duration: 0.5 }}>
      Veja como sai a sua carga!
      <svg className="cel-seta" viewBox="0 0 120 80" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
        <path d="M110 10 C 90 60, 50 70, 14 58" /><path d="M28 48 L 12 58 L 28 70" />
      </svg>
    </motion.p>
    <motion.figure className="celular" aria-label="Vídeo do pátio da Fernando Blocos"
      initial={{ opacity: 0, y: 50, rotate: -8 }} whileInView={{ opacity: 1, y: 0, rotate: -3 }} viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 130, damping: 15 }}>
      <span className="cel-ilha" aria-hidden />
      <div className="cel-tela">
        <video ref={ref} muted loop playsInline preload="none" poster="/videos/placa-v2-poster.webp"
          onPlay={() => setTocando(true)} onPause={() => setTocando(false)}
          onTimeUpdate={(e) => { const v = e.currentTarget; if (v.duration) setProg(v.currentTime / v.duration); }}
          aria-label="Placa da Fernando Blocos no pátio, com os telefones de contato, e o carregamento de blocos no caminhão">
          <source src="/videos/placa-v2.mp4" type="video/mp4" />
        </video>

        <button type="button" className="cel-toque" onClick={tocarTela} aria-label="Assistir ao vídeo em tela cheia" />

        {/* chamada para tocar: some depois que a pessoa abre o vídeo */}
        <AnimatePresence>
          {!jaViu && (
            <motion.span className="cel-cta" aria-hidden initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 1.2, duration: 0.35 }}>
              <i className="cel-onda" /><i className="cel-onda d2" />
              <b><Ic.playP /> Toque para assistir</b>
            </motion.span>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {aviso && (
            <motion.span key={aviso} className="cel-aviso" aria-hidden initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.3 }}>
              {aviso === "pausa" ? <Ic.pausa /> : <Ic.play />}
            </motion.span>
          )}
          {coracao > 0 && (
            <motion.span key={coracao} className="cel-coracao" aria-hidden
              initial={{ opacity: 0, scale: 0.3, rotate: -15 }} animate={{ opacity: [0, 1, 1, 0], scale: [0.3, 1.15, 1, 1.4], rotate: [-15, 0, 0, 0] }}
              transition={{ duration: 0.9, times: [0, 0.25, 0.7, 1] }} onAnimationComplete={() => setCoracao(0)}>
              <Ic.coracao cheio />
            </motion.span>
          )}
        </AnimatePresence>

        {/* barra de status */}
        <div className="cel-status" aria-hidden><b><Hora /></b><span><Ic.sinal /><Ic.wifi /><Ic.bateria /></span></div>
        <div className="cel-topo" aria-hidden><b>Reels</b><Ic.camera /></div>

        {/* ações na lateral */}
        <div className="cel-acoes">
          <button type="button" onClick={() => { setCurtido((c) => !c); if (!curtido) setCoracao(Date.now()); }} aria-pressed={curtido} aria-label="Curtir">
            <motion.span key={String(curtido)} initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 600, damping: 12 }}>
              <Ic.coracao cheio={curtido} />
            </motion.span>
          </button>
          <a href={waLink(`Olá, ${CONTATOS[0].nome}! Vi o vídeo no site da Fernando Blocos e quero um orçamento.`)} target="_blank" rel="noopener noreferrer" aria-label="Comentar pelo WhatsApp"><Ic.comentario /></a>
          <button type="button" onClick={compartilhar} aria-label="Compartilhar o site"><Ic.enviar /></button>
          <button type="button" onClick={alternar} aria-label={tocando ? "Pausar vídeo" : "Tocar vídeo"}>{tocando ? <Ic.pausaP /> : <Ic.playP />}</button>
        </div>

        {/* perfil, legenda e música */}
        <div className="cel-info">
          <div className="cel-perfil">
            <span className="cel-avatar"><Image src="/logo.png" alt="" width={36} height={34} /></span>
            <b>Fernando Blocos</b>
            <button type="button" className="cel-seguir" onClick={abrirOrcamento}>Orçamento</button>
          </div>
          <p>Mais uma carga saindo do pátio 🧱🚚</p>
          <div className="cel-musica" aria-hidden><Ic.nota /><span><i>Som original · Fernando Blocos · Som original · Fernando Blocos ·</i></span></div>
        </div>

        <div className="cel-prog" aria-hidden><i style={{ transform: `scaleX(${prog})` }} /></div>
      </div>
    </motion.figure>
    {grande && typeof document !== "undefined" && createPortal(<Grande onClose={fecharGrande} />, document.body)}
    </div>
  );
}

// Vídeo grande, em tela cheia, com os botões de pedido logo abaixo.
function Grande({ onClose }: { onClose: () => void }) {
  const fechar = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const volta = document.activeElement as HTMLElement | null;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", esc);
    fechar.current?.focus();
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", esc); volta?.focus?.(); };
  }, [onClose]);
  return (
    <motion.div className="vg-fundo" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <motion.div className="vg" role="dialog" aria-modal="true" aria-label="Vídeo do pátio da Fernando Blocos" onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.85, y: 30, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 24 }}>
        <button ref={fechar} type="button" className="vg-x" onClick={onClose} aria-label="Fechar vídeo">×</button>
        <video autoPlay muted loop playsInline controls poster="/videos/placa-v2-poster.webp">
          <source src="/videos/placa-v2.mp4" type="video/mp4" />
        </video>
        <div className="vg-acoes">
          <button type="button" className="btn" onClick={() => { onClose(); abrirOrcamento(); }}>Pedir orçamento</button>
          <a className="btn vg-zap" href={waLink(`Olá, ${CONTATOS[0].nome}! Vi o vídeo no site da Fernando Blocos e quero um orçamento.`)} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Hora real do aparelho de quem visita, atualizada na virada de cada minuto.
// No servidor não há "hora do visitante", então até carregar aparece vazio (evita hora errada piscando).
function Hora() {
  const [agora, setAgora] = useState<Date | null>(null);
  useEffect(() => {
    let t: number;
    const tick = () => { const d = new Date(); setAgora(d); t = window.setTimeout(tick, 60000 - (d.getSeconds() * 1000 + d.getMilliseconds())); };
    tick();
    return () => clearTimeout(t);
  }, []);
  if (!agora) return null;
  return <>{agora.getHours()}:{String(agora.getMinutes()).padStart(2, "0")}</>;
}

const sv = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
const Ic = {
  coracao: ({ cheio = false }: { cheio?: boolean }) => (
    <svg {...sv} width={28} height={28} fill={cheio ? "#ff3040" : "none"} stroke={cheio ? "#ff3040" : "currentColor"}>
      <path d="M12 20.5s-7.5-4.6-9.3-9.2C1.4 8 3.4 4.5 7 4.5c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.6 0 5.6 3.5 4.3 6.8-1.8 4.6-9.3 9.2-9.3 9.2Z" />
    </svg>
  ),
  comentario: () => <svg {...sv} width={27} height={27}><path d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3.5 20l1.2-4.2A8.5 8.5 0 1 1 20.5 11.5Z" /></svg>,
  enviar: () => <svg {...sv} width={26} height={26}><path d="M21.5 3 10 13.5M21.5 3l-7 18-4.5-7.5L2.5 9z" /></svg>,
  pausaP: () => <svg viewBox="0 0 24 24" width={24} height={24} fill="currentColor" aria-hidden><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>,
  playP: () => <svg viewBox="0 0 24 24" width={24} height={24} fill="currentColor" aria-hidden><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" /></svg>,
  mais: () => <svg {...sv} width={24} height={24} fill="currentColor" stroke="none"><circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" /></svg>,
  camera: () => <svg {...sv} width={24} height={24}><rect x="3" y="6" width="18" height="14" rx="4" /><circle cx="12" cy="13" r="3.5" /><path d="M8 6l1.5-2h5L16 6" /></svg>,
  nota: () => <svg {...sv} width={14} height={14}><path d="M9 18V5l11-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="17" cy="16" r="3" /></svg>,
  play: () => <svg viewBox="0 0 24 24" width={34} height={34} fill="currentColor" aria-hidden><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" /></svg>,
  pausa: () => <svg viewBox="0 0 24 24" width={34} height={34} fill="currentColor" aria-hidden><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>,
  sinal: () => <svg viewBox="0 0 18 12" width={17} height={11} fill="currentColor" aria-hidden><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5" width="3" height="7" rx="1" /><rect x="10" y="2.5" width="3" height="9.5" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" /></svg>,
  wifi: () => <svg viewBox="0 0 16 12" width={15} height={11} fill="currentColor" aria-hidden><path d="M8 12 5.6 9.3a3.4 3.4 0 0 1 4.8 0zM3.4 7.1a6.6 6.6 0 0 1 9.2 0l1.6-1.7a9 9 0 0 0-12.4 0zM.4 4a10.9 10.9 0 0 1 15.2 0L16 3.6V3.5A13 13 0 0 0 0 3.5V3.6z" /></svg>,
  bateria: () => <svg viewBox="0 0 26 12" width={24} height={11} aria-hidden><rect x=".5" y=".5" width="22" height="11" rx="3" fill="none" stroke="currentColor" opacity=".5" /><rect x="2" y="2" width="16" height="8" rx="1.6" fill="currentColor" /><rect x="23.5" y="4" width="2" height="4" rx="1" fill="currentColor" opacity=".5" /></svg>,
};
