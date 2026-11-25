"use client";
// Gaveta "Meu orçamento". Animações portadas do Kokonut UI (MIT): Smooth Drawer (mola, arrastar para fechar,
// total rolando), Cart Button (segurar − / + repete) e Particle Button (✓ desenhado + partículas ao enviar).
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useDragControls, useReducedMotion } from "framer-motion";
import { CONTATOS, waLink } from "@/lib/config";
import { limpar, mudarQtd, qtdDe, remover, somar, useOrcamento, MAXQ, PASSO } from "@/lib/orcamento";
import WhatsIcon from "./WhatsIcon";
import { blocos, rotulo } from "@/data/blocos";
import { Burst, Check, EASE_OUT, Rolling, useHold } from "./anim/kokonut";

// Usa o nome atual do catálogo (itens salvos antes de uma mudança de nome também se atualizam).
const info = (i: { id: string; nome: string; medida: string }) => {
  const b = blocos.find((x) => x.slug === i.id);
  return b ? rotulo(b) : { nome: i.nome, medida: i.medida, bloco: true };
};

const maskPhone = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 3)} ${d.slice(3, 7)}-${d.slice(7)}`;
};
const qtdValida = (v: string) => Math.min(MAXQ, Math.max(1, parseInt(v, 10) || 1));
const fmt = (n: number) => n.toLocaleString("pt-BR");
const VERDE = ["#1f9d55", "#2fbf6c", "#8fe3b0", "#2a1a12"];
const mola = { type: "spring", stiffness: 380, damping: 36 } as const;

// ref repassada ao <li>: o AnimatePresence "popLayout" precisa dela para a lista se reacomodar
function Linha({ i, ref }: { i: { id: string; nome: string; medida: string; qtd: number }; ref?: React.Ref<HTMLLIElement> }) {
  const r = info(i);
  // toque: de 1 em 1 · segurando: de 50 em 50 (cada vez mais rápido)
  const hold = useHold((d, repetindo) => {
    const atual = qtdDe(i.id);
    if (d < 0 && !repetindo && atual <= 1) { remover(i.id); return false; }
    const novo = Math.min(MAXQ, Math.max(1, atual + d * (repetindo ? PASSO : 1)));
    if (novo === atual) return false;
    mudarQtd(i.id, novo);
    return true;
  });
  return (
    <motion.li ref={ref} layout className="oc-item"
      initial={{ opacity: 0, y: 14, filter: "blur(3px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, x: -40, filter: "blur(3px)", transition: { duration: 0.2 } }} transition={{ duration: 0.28, ease: EASE_OUT }}>
      <div><strong>{r.nome} <span>cm</span></strong><small>{r.medida}</small></div>
      <button type="button" className="oc-rm" onClick={() => remover(i.id)} aria-label={`Remover ${r.nome}`}>×</button>
      <div className="oc-qty">
        <button type="button" {...hold(-1)} aria-label="Menos 1 (segure para 50 em 50)" title="Toque: −1 · Segure: −50">−</button>
        <input type="number" min={1} max={MAXQ} inputMode="numeric" value={i.qtd}
          onChange={(e) => mudarQtd(i.id, qtdValida(e.target.value))} aria-label={`Quantidade de ${r.nome}`} />
        <button type="button" {...hold(1)} aria-label="Mais 1 (segure para 50 em 50)" title="Toque: +1 · Segure: +50">+</button>
        <button type="button" className="mais" onClick={() => somar(i.id, 100)}>+100</button>
        <button type="button" className="mais" onClick={() => somar(i.id, 1000)}>+1000</button>
      </div>
    </motion.li>
  );
}

export default function OrcamentoDrawer() {
  const itens = useOrcamento();
  const total = itens.reduce((n, i) => n + i.qtd, 0);
  const [aberto, setAberto] = useState(false);
  const [desk, setDesk] = useState(false);
  const [tel, setTel] = useState("");
  const [status, setStatus] = useState<"idle" | "ok">("idle");
  const [enviado, setEnviado] = useState(false);
  const [burst, setBurst] = useState<{ k: number; x: number } | null>(null);
  const timers = useRef<number[]>([]);
  const arrastar = useDragControls();
  const folha = useRef<HTMLElement>(null);
  const fechar = useRef<HTMLButtonElement>(null);
  const voltarFoco = useRef<HTMLElement | null>(null);
  const reduz = useReducedMotion();

  useEffect(() => {
    if (!aberto) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    voltarFoco.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", esc);
    const t = window.setTimeout(() => fechar.current?.focus(), 50);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", esc);
      voltarFoco.current?.focus?.();
    };
  }, [aberto]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  useEffect(() => {
    const abrir = () => abrirGaveta();
    window.addEventListener("abrir-orcamento", abrir);
    return () => window.removeEventListener("abrir-orcamento", abrir);
  }, []);

  // decide antes de abrir de que lado a gaveta entra (lateral no PC, de baixo no celular)
  function abrirGaveta() { setDesk(window.matchMedia("(min-width:760px)").matches); setAberto(true); }
  // Tab e Shift+Tab ficam dentro da gaveta enquanto ela está aberta
  function prenderTab(e: React.KeyboardEvent) {
    if (e.key !== "Tab" || !folha.current) return;
    const el = [...folha.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input,textarea,select,[tabindex]:not([tabindex="-1"])')]
      .filter((x) => x.offsetParent !== null);
    if (!el.length) return;
    const [primeiro, ultimo] = [el[0], el[el.length - 1]];
    if (e.shiftKey && document.activeElement === primeiro) { e.preventDefault(); ultimo.focus(); }
    else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primeiro.focus(); }
  }
  const depois = (ms: number, f: () => void) => { timers.current.push(window.setTimeout(f, ms)); };

  function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status !== "idle") return;
    const f = new FormData(e.currentTarget);
    const dest = CONTATOS[Number(f.get("dest"))] ?? CONTATOS[0];
    const linhas = itens.map((i) => { const r = info(i); return `• ${fmt(i.qtd)}x ${r.bloco ? "Bloco " : ""}${r.nome} cm (${r.medida})`; }).join("\n");
    const texto =
      `Olá, ${dest.nome}! Vim pelo catálogo da Fernando Blocos e gostaria de um orçamento.\n\n` +
      `*BLOCOS (${fmt(total)} un.)*\n${linhas}\n\n` +
      `*ENTREGA*\nEndereço: ${f.get("endereco")}\n\n` +
      `*MEUS DADOS*\nNome: ${f.get("nome")}\nTelefone: ${f.get("telefone")}` +
      `${f.get("email") ? `\nEmail: ${f.get("email")}` : ""}` +
      `${f.get("mensagem") ? `\n\n*OBSERVAÇÕES*\n${f.get("mensagem")}` : ""}`;
    // abre já no clique (se esperar a animação, o navegador bloqueia a janela)
    window.open(waLink(texto, dest.whats), "_blank", "noopener,noreferrer");
    setStatus("ok");
    const btn = (e.nativeEvent as SubmitEvent).submitter;
    if (!reduz) setBurst({ k: Date.now(), x: btn ? btn.offsetWidth / 2 : 160 });
    depois(900, () => setEnviado(true));
    depois(2600, () => { limpar(); setEnviado(false); setStatus("idle"); setTel(""); setAberto(false); });
  }

  return (
    <>
      <button type="button" className={`oc-fab${total ? " on" : ""}`} onClick={abrirGaveta}
        aria-label={`Abrir meu orçamento: ${fmt(total)} blocos`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width={20} height={20}>
          <path d="M9 4h6l1 2h3v15H5V6h3z" /><path d="M9 12h6M9 16h4" />
        </svg>
        Meu orçamento <motion.b key={itens.length} initial={{ scale: 1.4 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 15 }}>
          <Rolling value={itens.length} />
        </motion.b>
      </button>

      <AnimatePresence>
        {aberto && (
          <motion.div key="ov" className="oc-overlay" onClick={() => setAberto(false)}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <motion.aside ref={folha} onKeyDown={prenderTab} className="oc-sheet" role="dialog" aria-modal="true" aria-label="Meu orçamento" onClick={(e) => e.stopPropagation()}
              initial={desk ? { x: "100%" } : { y: "100%" }} animate={desk ? { x: 0 } : { y: 0 }} exit={desk ? { x: "100%" } : { y: "100%" }}
              transition={reduz ? { duration: 0 } : mola}
              drag={desk ? false : "y"} dragListener={false} dragControls={arrastar}
              dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0, bottom: 0.7 }}
              onDragEnd={(_, d) => { if (d.offset.y > 110 || d.velocity.y > 600) setAberto(false); }}>
              <div className="oc-head" onPointerDown={(e) => { if (!desk) arrastar.start(e); }}>
                {!desk && <span className="oc-alca" aria-hidden />}
                <h3>Meu orçamento <small><Rolling value={total} /> un.</small></h3>
                <button ref={fechar} type="button" className="oc-x" onPointerDown={(e) => e.stopPropagation()} onClick={() => setAberto(false)} aria-label="Fechar">×</button>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                {enviado ? (
                  <motion.div key="ok" className="oc-vazio oc-ok" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: EASE_OUT }}>
                    <span className="oc-selo"><Check size={40} /></span>
                    <h3>Abrindo o WhatsApp…</h3><p>É só tocar em enviar.</p>
                  </motion.div>
                ) : itens.length === 0 ? (
                  <motion.div key="vazio" className="oc-vazio" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: EASE_OUT }}>
                    <h3>Nenhum bloco ainda</h3>
                    <p>Escolha as medidas e toque em “Adicionar ao orçamento”.</p>
                    <a className="btn" href="#catalogo" onClick={() => setAberto(false)}>Ver catálogo</a>
                  </motion.div>
                ) : (
                  <motion.form key="form" className="oc-form" onSubmit={enviar} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="oc-body">
                      <ul className="oc-list">
                        <AnimatePresence mode="popLayout" initial={false}>
                          {itens.map((i) => <Linha key={i.id} i={i} />)}
                        </AnimatePresence>
                      </ul>

                      <label>Nome *<input name="nome" required autoComplete="name" placeholder="Seu nome" /></label>
                      <label>Telefone *<input name="telefone" type="tel" inputMode="tel" required autoComplete="tel" value={tel}
                        onChange={(e) => setTel(maskPhone(e.target.value))} placeholder="(11) 9 0000-0000" /></label>
                      <label>Endereço de entrega *<input name="endereco" required autoComplete="street-address" placeholder="Rua, número, bairro, cidade" /></label>
                      <label>Email (opcional)<input name="email" type="email" autoComplete="email" placeholder="voce@email.com" /></label>
                      <label>Observações (opcional)<textarea name="mensagem" rows={3} placeholder="Prazo, tipo de obra, dúvidas…" /></label>

                      <fieldset className="dest">
                        <legend>Enviar orçamento para *</legend>
                        {CONTATOS.map((c, i) => (
                          <label key={c.nome} className="dest-opt">
                            <input type="radio" name="dest" value={i} required />
                            <span><b>{c.nome}</b><small>{c.fone}</small></span>
                          </label>
                        ))}
                      </fieldset>

                      <p className="oc-lgpd">
                        <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
                        <span>Seus dados vão direto para o WhatsApp da Fernando Blocos e são usados só para responder este orçamento e fazer a entrega. Nada fica guardado neste site. <a href="/privacidade" target="_blank" rel="noopener">Política de privacidade</a></span>
                      </p>
                    </div>
                    <div className="oc-foot">
                      <div className="qtd-wrap">
                        {burst && <Burst key={burst.k} originX={burst.x} cores={VERDE} qtd={28} onDone={() => setBurst(null)} />}
                        <button type="submit" className="send" data-status={status}>
                          <AnimatePresence mode="popLayout" initial={false}>
                            <motion.span key={status} className="send-in"
                              initial={{ opacity: 0, y: 10, filter: "blur(2px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                              exit={{ opacity: 0, y: -10, filter: "blur(2px)" }} transition={{ duration: 0.2, ease: EASE_OUT }}>
                              {status === "ok" ? <><Check size={22} /> Pedido pronto!</> : <><WhatsIcon size={22} /> Enviar pelo WhatsApp</>}
                            </motion.span>
                          </AnimatePresence>
                        </button>
                      </div>
                      <button type="button" className="oc-limpar" onClick={() => limpar()}>Esvaziar orçamento</button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
