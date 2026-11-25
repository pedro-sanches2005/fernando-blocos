import { useSyncExternalStore } from "react";
import { blocos } from "@/data/blocos";

export type Item = { id: string; nome: string; medida: string; qtd: number };

export const PADRAO = 100; // quantidade ao tocar em "Adicionar ao orçamento"
export const PASSO = 50;   // botões − e +
const KEY = "fernando-orcamento";
const EMPTY: Item[] = [];
let itens: Item[] = EMPTY;
let carregado = false;
const ouvintes = new Set<() => void>();

function carregar() {
  if (carregado || typeof window === "undefined") return;
  carregado = true;
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || "[]");
    // descarta produtos que saíram do catálogo (ex.: medidas antigas de canaleta)
    itens = Array.isArray(v) ? v.filter((x: Item) => blocos.some((b) => b.slug === x.id)) : EMPTY;
  } catch { itens = EMPTY; }
}
function salvar(novo: Item[]) {
  itens = novo;
  try { localStorage.setItem(KEY, JSON.stringify(itens)); } catch { /* sem storage */ }
  ouvintes.forEach((f) => f());
}

export function useOrcamento() {
  return useSyncExternalStore(
    (cb) => { ouvintes.add(cb); return () => { ouvintes.delete(cb); }; },
    () => { carregar(); return itens; },
    () => EMPTY
  );
}

export function adicionar(p: Omit<Item, "qtd">, qtd = PADRAO) {
  carregar();
  const existe = itens.some((x) => x.id === p.id);
  salvar(existe ? itens.map((x) => (x.id === p.id ? { ...x, qtd: x.qtd + qtd } : x)) : [...itens, { ...p, qtd }]);
}
export function mudarQtd(id: string, qtd: number) {
  carregar();
  salvar(qtd <= 0 ? itens.filter((x) => x.id !== id) : itens.map((x) => (x.id === id ? { ...x, qtd } : x)));
}
export const remover = (id: string) => mudarQtd(id, 0);

export const MAXQ = 99999;
// Soma (ou subtrai) direto do valor atual. Devolve false quando não dá (passou do mínimo/máximo).
export function somar(id: string, delta: number, minimo = 1) {
  carregar();
  const it = itens.find((x) => x.id === id);
  if (!it) return false;
  const novo = Math.min(MAXQ, it.qtd + delta);
  if (novo < minimo || novo === it.qtd) return false;
  mudarQtd(id, novo);
  return true;
}
export const qtdDe = (id: string) => { carregar(); return itens.find((x) => x.id === id)?.qtd ?? 0; };
export function limpar() { carregar(); salvar(EMPTY); }

// Abre a gaveta "Meu orçamento" a partir de qualquer botão do site.
export function abrirOrcamento() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event("abrir-orcamento"));
}
