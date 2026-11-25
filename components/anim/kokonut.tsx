"use client";
/**
 * Peças de animação portadas do Kokonut UI (MIT, https://kokonutui.com,
 * github.com/kokonut-labs/kokonutui: cart-button.tsx e particle-button.tsx),
 * adaptadas para o CSS do site, sem Tailwind/shadcn.
 */
import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/* ---------- Números rolando (Cart Button / Smooth Drawer) ---------- */
// Cada caractere rola sozinho, identificado pela posição a partir da direita.
export function Rolling({ value, format = (n) => n.toLocaleString("pt-BR") }: { value: number; format?: (n: number) => string }) {
  const prev = useRef(value);
  const dir = value >= prev.current ? 1 : -1;
  useEffect(() => { prev.current = value; }, [value]);
  const reduz = Boolean(useReducedMotion());
  const text = format(value);
  return (
    <span className="rolling" aria-hidden>
      {text.split("").map((ch, i) => (
        <span className="rolling-casa" key={text.length - i}>
          <AnimatePresence custom={dir} initial={false} mode="popLayout">
            <motion.span key={ch} className="rolling-ch" custom={dir}
              variants={{ in: (d: number) => ({ y: d * 14, opacity: 0 }), out: (d: number) => ({ y: d * -14, opacity: 0 }) }}
              initial={reduz ? { opacity: 0 } : "in"} animate={{ y: 0, opacity: 1 }} exit={reduz ? { opacity: 0 } : "out"}
              transition={reduz ? { duration: 0 } : { duration: 0.24, ease: EASE_OUT }}>
              {ch}
            </motion.span>
          </AnimatePresence>
        </span>
      ))}
    </span>
  );
}

/* ---------- Check desenhado (Particle Button) ---------- */
export function Check({ size = 18 }: { size?: number }) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 16 16" width={size} height={size}>
      <motion.path d="M3.5 8.5 6.5 11.5 12.5 4.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2}
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3, delay: 0.08, ease: EASE_OUT }} />
    </svg>
  );
}

/* ---------- Explosão de partículas (Particle Button) ---------- */
const GRAVIDADE = 0.0016, ARRASTO = 0.0022, VIDA = 700, SOBRA = 64;

// Fica dentro de um pai com position:relative; desenha num canvas que vaza 64px em volta.
export function Burst({ originX, cores, onDone, qtd = 22 }: { originX: number; cores: string[]; onDone: () => void; qtd?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const fim = useRef(onDone);
  fim.current = onDone;

  useEffect(() => {
    const canvas = ref.current, ctx = canvas?.getContext("2d"), pai = canvas?.parentElement?.parentElement;
    if (!canvas || !ctx || !pai) return;
    const dpr = window.devicePixelRatio || 1, largura = pai.offsetWidth;
    const w = largura + SOBRA * 2, h = pai.offsetHeight + SOBRA * 2;
    canvas.width = w * dpr; canvas.height = h * dpr; ctx.scale(dpr, dpr);
    const ps = Array.from({ length: qtd }, (_, i) => {
      const x = Math.min(Math.max(originX + (Math.random() - 0.5) * Math.min(largura, 180), 4), largura - 4);
      const lado = x < largura / 2 ? -1 : 1, vel = 0.2 + Math.random() * 0.24, ang = -Math.PI / 2 + lado * Math.random() * 0.9;
      const lasca = i % 3 === 0;
      return { x, y: 0, vx: Math.cos(ang) * vel, vy: Math.sin(ang) * vel, a: Math.random() * Math.PI, giro: (Math.random() - 0.5) * 0.02,
        w: lasca ? 6 : 4, h: lasca ? 3 : 4, cor: cores[i % cores.length] };
    });
    const t0 = performance.now();
    let ult = t0, quadro = 0;
    const tick = (agora: number) => {
      const dt = Math.min(agora - ult, 32); ult = agora;
      const t = (agora - t0) / VIDA;
      ctx.clearRect(0, 0, w, h);
      if (t >= 1) { fim.current(); return; }
      ctx.globalAlpha = 1 - t * t;
      for (const p of ps) {
        p.vx *= 1 - ARRASTO * dt; p.vy = p.vy * (1 - ARRASTO * dt) + GRAVIDADE * dt;
        p.x += p.vx * dt; p.y += p.vy * dt; p.a += p.giro * dt;
        ctx.save(); ctx.translate(p.x + SOBRA, p.y + SOBRA); ctx.rotate(p.a); ctx.fillStyle = p.cor; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore();
      }
      quadro = requestAnimationFrame(tick);
    };
    quadro = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(quadro);
  }, [originX, cores, qtd]);

  return (
    <span aria-hidden="true" className="burst" style={{ top: -SOBRA, left: -SOBRA, width: `calc(100% + ${SOBRA * 2}px)`, height: `calc(100% + ${SOBRA * 2}px)` }}>
      <canvas ref={ref} />
    </span>
  );
}

/* ---------- Segurar para repetir (Cart Button) ---------- */
// Mouse: passo ao apertar; toque: passo ao soltar (assim rolar a página não conta).
// Segurando, repete cada vez mais rápido. step(d, repetindo) devolve false para parar.
export function useHold(step: (d: number, repetindo: boolean) => boolean) {
  const timer = useRef<number | undefined>(undefined);
  const toque = useRef<number | null>(null);
  const passo = useRef(step);
  passo.current = step;
  const parar = () => { clearTimeout(timer.current); toque.current = null; };
  useEffect(() => parar, []);

  return (d: number) => ({
    onPointerDown: (e: React.PointerEvent<HTMLButtonElement>) => {
      if (e.button !== 0) return;
      e.currentTarget.setPointerCapture(e.pointerId);
      parar();
      let intervalo = 150;
      const tick = () => {
        if (!passo.current(d, true)) return;
        intervalo = Math.max(55, intervalo * 0.82);
        timer.current = window.setTimeout(tick, intervalo);
      };
      if (e.pointerType === "touch") {
        toque.current = d;
        timer.current = window.setTimeout(() => { toque.current = null; if (passo.current(d, true)) timer.current = window.setTimeout(tick, 150); }, 380);
        return;
      }
      if (!passo.current(d, false)) return;
      timer.current = window.setTimeout(tick, 380);
    },
    onPointerUp: () => { const p = toque.current; parar(); if (p !== null) passo.current(p, false); },
    onPointerCancel: parar,
    onLostPointerCapture: parar,
    onClick: (e: React.MouseEvent) => { if (e.detail === 0) passo.current(d, false); }, // Enter/Espaço
    onContextMenu: (e: React.MouseEvent) => e.preventDefault(),
  });
}
